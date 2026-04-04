import { NextResponse } from 'next/server'

/**
 * Data Refresh Endpoint
 *
 * This is a placeholder endpoint for the data refresh mechanism.
 * Since the data sources (Shopify, Meta Ads, Google Ads, Reddit Ads) are
 * accessed through Claude's MCP servers, real-time fetching from the app
 * itself is not possible.
 *
 * To refresh data:
 * 1. Ask Claude to fetch the latest data from MCP tools
 * 2. Claude will update src/data/dashboardData.ts with fresh data
 * 3. The DATA_LAST_UPDATED timestamp will be updated accordingly
 *
 * Data sources and their MCP tool names:
 * - Shopify: mcp__ebb89891__shopify_sales_over_time
 * - Google Ads: mcp__6dfe1482__search (GAQL query, customer 7854753325)
 * - Meta Ads: mcp__05f3ca96__meta_ads_over_time
 * - Reddit Ads: mcp__b29290f9__reddit_ads_over_time
 */
export async function POST() {
  return NextResponse.json({
    status: 'acknowledged',
    message: 'Data refresh is handled by Claude via MCP tools. Ask Claude to update the dashboard data.',
    lastUpdated: '2026-04-04T08:00:00Z',
    sources: {
      shopify: { tool: 'shopify_sales_over_time', metrics: 'total_sales,orders', interval: 'day' },
      googleAds: { tool: 'search', customerId: '7854753325', resource: 'customer', fields: ['segments.date', 'metrics.costMicros'] },
      metaAds: { tool: 'meta_ads_over_time', timeIncrement: '1' },
      redditAds: { tool: 'reddit_ads_over_time' },
    },
  })
}

export async function GET() {
  return NextResponse.json({
    lastUpdated: '2026-04-04T08:00:00Z',
    coverage: {
      daily: { from: '2022-01-01', to: '2026-03-31' },
      months: 51,
    },
    howToRefresh: 'Ask Claude to fetch latest data from Shopify, Google Ads, Meta Ads, and Reddit Ads MCP tools and update dashboardData.ts',
  })
}
