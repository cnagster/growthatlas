'use client'

import { useState } from 'react'
import DailyHeatmap from './DailyHeatmap'
import DailyKPIsChart from './DailyKPIsChart'
import DayOfWeekChart from './DayOfWeekChart'
import type { DateRange } from '@/data/dashboardData'

export default function DailyPacingPage() {
  const [heatmapRange, setHeatmapRange] = useState<DateRange>([1, 31])
  const [dowRange, setDowRange] = useState<DateRange>([1, 31])

  return (
    <div className="p-4 space-y-4">
      <DailyHeatmap dateRange={heatmapRange} onDateRangeChange={setHeatmapRange} />
      <DailyKPIsChart dateRange={heatmapRange} />
      <DayOfWeekChart dateRange={dowRange} onDateRangeChange={setDowRange} />
    </div>
  )
}
