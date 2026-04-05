import { allDailyRaw } from '@/data/dashboardData'
import type { DailyRecord } from './firestore'

/**
 * Converts the static allDailyRaw (2022-2025) + per-month 2026 arrays
 * into a flat array of DailyRecord objects ready for Firestore.
 *
 * We import allDailyRaw directly. For 2026 data (Jan-Mar),
 * we also include it since the seed route fetches from dashboardData.
 */

// 2026 data is embedded in the per-month arrays inside dashboardData.ts
// but not in allDailyRaw. We'll re-export a function that gets everything.
// The seed route will call getAllDailyRecords() to get the full dataset.

export function getAllDailyRecords(): DailyRecord[] {
  const records: DailyRecord[] = []

  // 2022-01-01 through 2025-12-31 from allDailyRaw
  for (const [date, tuple] of Object.entries(allDailyRaw)) {
    records.push({
      date,
      shopifyNetSales: tuple[0],
      shopifyOrders: tuple[1],
      metaSpend: tuple[2],
      googleSpend: tuple[3],
      redditSpend: tuple[4],
    })
  }

  return records.sort((a, b) => a.date.localeCompare(b.date))
}
