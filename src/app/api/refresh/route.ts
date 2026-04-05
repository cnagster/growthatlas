import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { writeDailyRecords, writeMetadata, readMetadata } from '@/lib/firestore'
import type { DailyRecord } from '@/lib/firestore'
import { fetchAllPlatforms, getPlatformStatus } from '@/lib/platformApis'

/**
 * POST /api/refresh
 *
 * Two modes:
 * 1. Body has `records` array → write those records directly (manual / Claude push)
 * 2. Body has `date` (or empty) → auto-fetch from platform APIs using env vars
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))

    // Mode 1: Direct record push (from CSV upload, Claude, or external scripts)
    if (body?.records && Array.isArray(body.records)) {
      const records: DailyRecord[] = body.records.filter(
        (r: DailyRecord) => r.date && /^\d{4}-\d{2}-\d{2}$/.test(r.date),
      )
      if (records.length === 0) {
        return NextResponse.json({ error: 'No valid records in payload' }, { status: 400 })
      }

      const written = await writeDailyRecords(records)
      await updateMetadata(records)
      return NextResponse.json({ status: 'ok', written, source: 'manual' })
    }

    // Mode 2: Auto-fetch from platform APIs
    const date = body?.date || new Date().toISOString().split('T')[0]
    const results = await fetchAllPlatforms(date)

    const succeeded = results.filter(r => r.ok)
    if (succeeded.length === 0) {
      return NextResponse.json(
        {
          status: 'no_credentials',
          message: 'No platform API credentials configured. Set environment variables in .env.local to enable auto-refresh, or ask Claude to push data via MCP tools.',
          platforms: results,
        },
        { status: 422 },
      )
    }

    // Merge platform results into a single DailyRecord
    const record: DailyRecord = {
      date,
      shopifyNetSales: 0,
      shopifyOrders: 0,
      metaSpend: 0,
      googleSpend: 0,
      redditSpend: 0,
    }
    for (const r of succeeded) {
      if (r.shopifyNetSales !== undefined) record.shopifyNetSales = r.shopifyNetSales
      if (r.shopifyOrders !== undefined) record.shopifyOrders = r.shopifyOrders
      if (r.metaSpend !== undefined) record.metaSpend = r.metaSpend
      if (r.googleSpend !== undefined) record.googleSpend = r.googleSpend
      if (r.redditSpend !== undefined) record.redditSpend = r.redditSpend
    }

    const written = await writeDailyRecords([record])
    await updateMetadata([record])

    return NextResponse.json({
      status: 'ok',
      written,
      date,
      record,
      platforms: results,
    })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    )
  }
}

/** GET /api/refresh — Check platform status and data coverage */
export async function GET() {
  try {
    const meta = await readMetadata().catch(() => null)
    return NextResponse.json({
      lastUpdated: meta?.lastUpdated || null,
      coverage: meta
        ? { from: meta.dataRange.from, to: meta.dataRange.to, totalDays: meta.totalDays }
        : null,
      platforms: getPlatformStatus(),
    })
  } catch {
    return NextResponse.json({ platforms: getPlatformStatus() })
  }
}

// ---- Helper ----
async function updateMetadata(records: DailyRecord[]) {
  const dates = records.map(r => r.date).sort()
  const existing = await readMetadata().catch(() => null)
  const from =
    existing?.dataRange.from && existing.dataRange.from < dates[0]
      ? existing.dataRange.from
      : dates[0]
  const to =
    existing?.dataRange.to && existing.dataRange.to > dates[dates.length - 1]
      ? existing.dataRange.to
      : dates[dates.length - 1]

  await writeMetadata({
    lastUpdated: new Date().toISOString(),
    dataRange: { from, to },
    totalDays: (existing?.totalDays || 0) + records.length,
  })
}
