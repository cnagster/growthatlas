/**
 * Direct API integrations for fetching today's data from ad platforms.
 * Each function checks for required env vars and returns a result.
 * Configure credentials in .env.local to enable auto-refresh.
 */

export interface FetchResult {
  source: string
  ok: boolean
  error?: string
  shopifyNetSales?: number
  shopifyOrders?: number
  metaSpend?: number
  googleSpend?: number
  redditSpend?: number
}

// ---- Shopify (GraphQL Admin API + ShopifyQL) ----
async function fetchShopify(date: string): Promise<FetchResult> {
  const shop = process.env.SHOPIFY_SHOP_DOMAIN
  const token = process.env.SHOPIFY_ACCESS_TOKEN
  if (!shop || !token) {
    return { source: 'shopify', ok: false, error: 'Missing SHOPIFY_SHOP_DOMAIN / SHOPIFY_ACCESS_TOKEN' }
  }

  const gql = `{
    shopifyqlQuery(query: "FROM orders SHOW sum(net_sales) AS net_sales, count() AS order_count SINCE ${date} UNTIL ${date} BY day") {
      tableData { rowData columns { name } }
    }
  }`
  const res = await fetch(`https://${shop}/admin/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': token },
    body: JSON.stringify({ query: gql }),
  })
  const json = await res.json()
  const table = json?.data?.shopifyqlQuery?.tableData
  if (!table?.rowData?.length) {
    return { source: 'shopify', ok: false, error: json?.errors?.[0]?.message || 'No data' }
  }
  const cols: string[] = table.columns.map((c: { name: string }) => c.name)
  const row = table.rowData[0]
  return {
    source: 'shopify',
    ok: true,
    shopifyNetSales: parseFloat(row[cols.indexOf('net_sales')]) || 0,
    shopifyOrders: parseInt(row[cols.indexOf('order_count')]) || 0,
  }
}

// ---- Meta / Facebook Ads (Marketing API) ----
async function fetchMeta(date: string): Promise<FetchResult> {
  const token = process.env.META_ACCESS_TOKEN
  const acct = process.env.META_AD_ACCOUNT_ID
  if (!token || !acct) {
    return { source: 'meta', ok: false, error: 'Missing META_ACCESS_TOKEN / META_AD_ACCOUNT_ID' }
  }

  const params = new URLSearchParams({
    time_range: JSON.stringify({ since: date, until: date }),
    fields: 'spend',
    access_token: token,
  })
  const res = await fetch(`https://graph.facebook.com/v19.0/act_${acct}/insights?${params}`)
  const json = await res.json()
  if (json.error) return { source: 'meta', ok: false, error: json.error.message }
  if (!json.data?.length) return { source: 'meta', ok: false, error: 'No data for this date' }
  return { source: 'meta', ok: true, metaSpend: parseFloat(json.data[0].spend) || 0 }
}

// ---- Google Ads (REST API v16 + OAuth refresh) ----
async function fetchGoogleAds(date: string): Promise<FetchResult> {
  const devToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET
  const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID || '7854753325'

  if (!devToken || !clientId || !clientSecret || !refreshToken) {
    return { source: 'google', ok: false, error: 'Missing GOOGLE_ADS_DEVELOPER_TOKEN / CLIENT_ID / CLIENT_SECRET / REFRESH_TOKEN' }
  }

  // Refresh OAuth access token
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    }),
  })
  const tokenJson = await tokenRes.json()
  if (!tokenJson.access_token) {
    return { source: 'google', ok: false, error: 'OAuth token refresh failed' }
  }

  const gaql = `SELECT segments.date, metrics.cost_micros FROM customer WHERE segments.date = '${date}'`
  const res = await fetch(
    `https://googleads.googleapis.com/v16/customers/${customerId}/googleAds:searchStream`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenJson.access_token}`,
        'developer-token': devToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: gaql }),
    },
  )
  const json = await res.json()
  const micros = json?.[0]?.results?.[0]?.metrics?.costMicros
  if (!micros) return { source: 'google', ok: false, error: 'No data for this date' }
  return { source: 'google', ok: true, googleSpend: parseInt(micros) / 1_000_000 }
}

// ---- Reddit Ads (OAuth + Reporting API) ----
async function fetchReddit(date: string): Promise<FetchResult> {
  const clientId = process.env.REDDIT_ADS_CLIENT_ID
  const clientSecret = process.env.REDDIT_ADS_CLIENT_SECRET
  const refreshToken = process.env.REDDIT_ADS_REFRESH_TOKEN
  const accountId = process.env.REDDIT_ADS_ACCOUNT_ID

  if (!clientId || !clientSecret || !refreshToken || !accountId) {
    return { source: 'reddit', ok: false, error: 'Missing REDDIT_ADS_CLIENT_ID / CLIENT_SECRET / REFRESH_TOKEN / ACCOUNT_ID' }
  }

  const tokenRes = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }),
  })
  const tokenJson = await tokenRes.json()
  if (!tokenJson.access_token) {
    return { source: 'reddit', ok: false, error: 'OAuth token refresh failed' }
  }

  const params = new URLSearchParams({ start_date: date, end_date: date })
  const res = await fetch(`https://ads-api.reddit.com/api/v3/accounts/${accountId}/reports?${params}`, {
    headers: { Authorization: `Bearer ${tokenJson.access_token}` },
  })
  const json = await res.json()
  const spend = json?.data?.[0]?.spend
  return { source: 'reddit', ok: true, redditSpend: parseFloat(spend) || 0 }
}

// ---- Fetch all platforms in parallel ----
export async function fetchAllPlatforms(date: string): Promise<FetchResult[]> {
  const results = await Promise.allSettled([
    fetchShopify(date),
    fetchMeta(date),
    fetchGoogleAds(date),
    fetchReddit(date),
  ])
  return results.map((r, i) =>
    r.status === 'fulfilled'
      ? r.value
      : { source: ['shopify', 'meta', 'google', 'reddit'][i], ok: false, error: 'Unexpected failure' },
  )
}

// ---- Check which platforms have credentials configured ----
export function getPlatformStatus(): Record<string, boolean> {
  return {
    shopify: !!(process.env.SHOPIFY_SHOP_DOMAIN && process.env.SHOPIFY_ACCESS_TOKEN),
    meta: !!(process.env.META_ACCESS_TOKEN && process.env.META_AD_ACCOUNT_ID),
    google: !!(process.env.GOOGLE_ADS_DEVELOPER_TOKEN && process.env.GOOGLE_ADS_REFRESH_TOKEN),
    reddit: !!(process.env.REDDIT_ADS_CLIENT_ID && process.env.REDDIT_ADS_REFRESH_TOKEN),
  }
}
