import { NextResponse } from 'next/server'
import { getAllDailyRecords } from '@/lib/seedData'
import { writeDailyRecords, writeMetadata } from '@/lib/firestore'

export async function POST() {
  try {
    const records = getAllDailyRecords()

    if (records.length === 0) {
      return NextResponse.json({ error: 'No records to seed' }, { status: 400 })
    }

    const written = await writeDailyRecords(records)

    const dates = records.map(r => r.date).sort()
    await writeMetadata({
      lastUpdated: new Date().toISOString(),
      dataRange: { from: dates[0], to: dates[dates.length - 1] },
      totalDays: written,
    })

    return NextResponse.json({
      status: 'ok',
      written,
      range: { from: dates[0], to: dates[dates.length - 1] },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
