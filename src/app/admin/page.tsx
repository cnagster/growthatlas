'use client'

import { useState } from 'react'
import { readMetadata, countDailyRecords, writeDailyRecords, writeMetadata } from '@/lib/firestore'
import type { DailyRecord, MetadataDoc } from '@/lib/firestore'

interface PlatformResult {
  source: string
  ok: boolean
  error?: string
}

export default function AdminPage() {
  const [status, setStatus] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [meta, setMeta] = useState<MetadataDoc | null>(null)
  const [count, setCount] = useState<number | null>(null)
  const [csvText, setCsvText] = useState('')
  const [platformStatus, setPlatformStatus] = useState<Record<string, boolean> | null>(null)
  const [refreshResults, setRefreshResults] = useState<PlatformResult[] | null>(null)

  async function checkStatus() {
    setLoading(true)
    setStatus('Checking Firestore...')
    try {
      const [m, c] = await Promise.all([readMetadata(), countDailyRecords()])
      setMeta(m)
      setCount(c)
      setStatus(m ? `Found ${c} records` : 'No data in Firestore yet')
    } catch (err: unknown) {
      setStatus(`Error: ${err instanceof Error ? err.message : 'Unknown'}`)
    }
    setLoading(false)
  }

  async function checkPlatforms() {
    setLoading(true)
    setStatus('Checking platform credentials...')
    try {
      const res = await fetch('/api/refresh')
      const data = await res.json()
      setPlatformStatus(data.platforms || {})
      const configured = Object.entries(data.platforms || {}).filter(([, v]) => v).length
      setStatus(`${configured}/4 platforms configured`)
    } catch (err: unknown) {
      setStatus(`Error: ${err instanceof Error ? err.message : 'Unknown'}`)
    }
    setLoading(false)
  }

  async function refreshToday() {
    setLoading(true)
    setRefreshResults(null)
    const today = new Date().toISOString().split('T')[0]
    setStatus(`Fetching data for ${today}...`)
    try {
      const res = await fetch('/api/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: today }),
      })
      const data = await res.json()
      if (data.status === 'no_credentials') {
        setStatus('No platform credentials configured — see setup instructions below')
        setRefreshResults(data.platforms || [])
        setPlatformStatus(null)
      } else if (data.error) {
        setStatus(`Refresh error: ${data.error}`)
      } else {
        const ok = (data.platforms as PlatformResult[])?.filter(p => p.ok).length || 0
        setStatus(`Refreshed ${today}: ${ok}/4 platforms succeeded, ${data.written} record written`)
        setRefreshResults(data.platforms || [])
        await checkStatus()
      }
    } catch (err: unknown) {
      setStatus(`Error: ${err instanceof Error ? err.message : 'Unknown'}`)
    }
    setLoading(false)
  }

  async function seedData() {
    setLoading(true)
    setStatus('Seeding Firestore with static data... This takes ~30 seconds.')
    try {
      const res = await fetch('/api/seed', { method: 'POST' })
      const data = await res.json()
      if (data.error) {
        setStatus(`Seed error: ${data.error}`)
      } else {
        setStatus(`Seeded ${data.written} records (${data.range.from} to ${data.range.to})`)
        await checkStatus()
      }
    } catch (err: unknown) {
      setStatus(`Error: ${err instanceof Error ? err.message : 'Unknown'}`)
    }
    setLoading(false)
  }

  async function uploadCSV() {
    if (!csvText.trim()) return
    setLoading(true)
    setStatus('Uploading...')
    try {
      const records: DailyRecord[] = []
      for (const line of csvText.trim().split('\n')) {
        const parts = line.split(',').map(s => s.trim())
        if (parts.length < 6) continue
        const [date, shopNet, shopOrd, metaS, googleS, redditS] = parts
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue
        records.push({
          date,
          shopifyNetSales: parseFloat(shopNet) || 0,
          shopifyOrders: parseFloat(shopOrd) || 0,
          metaSpend: parseFloat(metaS) || 0,
          googleSpend: parseFloat(googleS) || 0,
          redditSpend: parseFloat(redditS) || 0,
        })
      }
      if (records.length === 0) {
        setStatus('No valid records found in CSV')
        setLoading(false)
        return
      }
      const written = await writeDailyRecords(records)

      const dates = records.map(r => r.date).sort()
      const existingMeta = await readMetadata()
      const from = existingMeta?.dataRange.from && existingMeta.dataRange.from < dates[0]
        ? existingMeta.dataRange.from : dates[0]
      const to = existingMeta?.dataRange.to && existingMeta.dataRange.to > dates[dates.length - 1]
        ? existingMeta.dataRange.to : dates[dates.length - 1]

      await writeMetadata({
        lastUpdated: new Date().toISOString(),
        dataRange: { from, to },
        totalDays: (existingMeta?.totalDays || 0) + written,
      })

      setStatus(`Uploaded ${written} records`)
      setCsvText('')
      await checkStatus()
    } catch (err: unknown) {
      setStatus(`Error: ${err instanceof Error ? err.message : 'Unknown'}`)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Growth Atlas — Data Admin</h1>

      {/* Status Section */}
      <section className="mb-8 p-4 bg-gray-900 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">Firestore Status</h2>
        {meta ? (
          <div className="space-y-1 text-sm text-gray-300">
            <p>Records: <span className="text-white font-mono">{count}</span></p>
            <p>Range: <span className="text-white font-mono">{meta.dataRange.from}</span> to <span className="text-white font-mono">{meta.dataRange.to}</span></p>
            <p>Last updated: <span className="text-white font-mono">{new Date(meta.lastUpdated).toLocaleString()}</span></p>
          </div>
        ) : (
          <p className="text-sm text-gray-400">{count === null ? 'Click "Check Status" to connect' : 'No data yet — seed first'}</p>
        )}
        <button
          onClick={checkStatus}
          disabled={loading}
          className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 rounded text-sm font-medium"
        >
          {loading ? 'Checking...' : 'Check Status'}
        </button>
      </section>

      {/* Refresh Section */}
      <section className="mb-8 p-4 bg-gray-900 rounded-lg border border-orange-600/30">
        <h2 className="text-lg font-semibold mb-2">Refresh Today&apos;s Data</h2>
        <p className="text-sm text-gray-400 mb-4">
          Pull today&apos;s metrics from Shopify, Meta Ads, Google Ads, and Reddit Ads into Firestore.
        </p>

        <div className="flex gap-3 items-center mb-4">
          <button
            onClick={refreshToday}
            disabled={loading}
            className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-700 rounded text-sm font-semibold transition-colors"
          >
            {loading ? 'Refreshing...' : 'Refresh Today'}
          </button>
          <button
            onClick={checkPlatforms}
            disabled={loading}
            className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 rounded text-sm font-medium transition-colors"
          >
            Check Credentials
          </button>
        </div>

        {/* Platform credential status */}
        {platformStatus && (
          <div className="mb-3 text-sm space-y-1">
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Platform Status</p>
            {Object.entries(platformStatus).map(([platform, configured]) => (
              <p key={platform} className="flex items-center gap-2">
                <span className={`inline-block w-2 h-2 rounded-full ${configured ? 'bg-green-400' : 'bg-yellow-500'}`} />
                <span className="capitalize">{platform}</span>
                {!configured && <span className="text-gray-500">— credentials not set</span>}
              </p>
            ))}
          </div>
        )}

        {/* Refresh results */}
        {refreshResults && (
          <div className="text-sm space-y-1 border-t border-gray-800 pt-3">
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Refresh Results</p>
            {refreshResults.map((r: PlatformResult) => (
              <p key={r.source} className="flex items-center gap-2">
                <span className={`inline-block w-2 h-2 rounded-full ${r.ok ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className="capitalize">{r.source}</span>
                {r.error && <span className="text-gray-500 text-xs">— {r.error}</span>}
              </p>
            ))}
          </div>
        )}

        {/* Setup instructions (collapsed) */}
        <details className="mt-4 text-sm">
          <summary className="text-gray-400 cursor-pointer hover:text-gray-300">
            Setup: How to configure API credentials
          </summary>
          <div className="mt-2 p-3 bg-gray-800 rounded text-xs font-mono text-gray-300 space-y-2">
            <p className="text-gray-400 font-sans text-sm mb-2">
              Create <code className="bg-gray-700 px-1 rounded">.env.local</code> in the project root with:
            </p>
            <pre className="whitespace-pre-wrap">{`# Shopify Admin API
SHOPIFY_SHOP_DOMAIN=your-store.myshopify.com
SHOPIFY_ACCESS_TOKEN=shpat_...

# Meta (Facebook) Marketing API
META_ACCESS_TOKEN=EAAxxxxxxx
META_AD_ACCOUNT_ID=123456789

# Google Ads API
GOOGLE_ADS_DEVELOPER_TOKEN=xxx
GOOGLE_ADS_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_ADS_CLIENT_SECRET=xxx
GOOGLE_ADS_REFRESH_TOKEN=xxx
GOOGLE_ADS_CUSTOMER_ID=7854753325

# Reddit Ads API
REDDIT_ADS_CLIENT_ID=xxx
REDDIT_ADS_CLIENT_SECRET=xxx
REDDIT_ADS_REFRESH_TOKEN=xxx
REDDIT_ADS_ACCOUNT_ID=xxx`}</pre>
            <p className="text-gray-400 font-sans text-sm mt-2">
              Restart the dev server after adding credentials. Platforms without credentials will be skipped.
            </p>
          </div>
        </details>
      </section>

      {/* Seed Section */}
      <section className="mb-8 p-4 bg-gray-900 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Seed from Static Data</h2>
        <p className="text-sm text-gray-400 mb-3">
          Push all existing dashboard data (Jan 2022 — Dec 2025) to Firestore. Safe to run multiple times — it overwrites existing records.
        </p>
        <button
          onClick={seedData}
          disabled={loading}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 rounded text-sm font-medium"
        >
          {loading ? 'Seeding...' : 'Seed Firestore'}
        </button>
      </section>

      {/* Upload Section */}
      <section className="mb-8 p-4 bg-gray-900 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Upload New Data (CSV)</h2>
        <p className="text-sm text-gray-400 mb-3">
          Paste CSV rows. Format: <code className="text-xs bg-gray-800 px-1 py-0.5 rounded">date,shopifyNetSales,shopifyOrders,metaSpend,googleSpend,redditSpend</code>
        </p>
        <textarea
          value={csvText}
          onChange={e => setCsvText(e.target.value)}
          placeholder={`2026-04-01,85000.50,380,22000,7500,500\n2026-04-02,72000.30,310,21000,7200,480`}
          className="w-full h-32 bg-gray-800 border border-gray-700 rounded p-3 text-sm font-mono text-gray-200 placeholder:text-gray-600 mb-3"
        />
        <button
          onClick={uploadCSV}
          disabled={loading || !csvText.trim()}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 rounded text-sm font-medium"
        >
          {loading ? 'Uploading...' : 'Upload to Firestore'}
        </button>
      </section>

      {/* Status Message */}
      {status && (
        <div className="p-3 bg-gray-800 rounded text-sm font-mono text-gray-300">
          {status}
        </div>
      )}
    </div>
  )
}
