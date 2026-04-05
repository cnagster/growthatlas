'use client'

import { useState } from 'react'
import { readMetadata, countDailyRecords, writeDailyRecords, writeMetadata } from '@/lib/firestore'
import type { DailyRecord, MetadataDoc } from '@/lib/firestore'

export default function AdminPage() {
  const [status, setStatus] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [meta, setMeta] = useState<MetadataDoc | null>(null)
  const [count, setCount] = useState<number | null>(null)
  const [csvText, setCsvText] = useState('')

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
