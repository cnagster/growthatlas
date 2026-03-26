'use client'

import { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts'
import { getDayOfWeekData } from '@/data/dashboardData'
import type { DateRange } from '@/data/dashboardData'
import DateRangePicker from './DateRangePicker'

interface DayOfWeekChartProps {
  dateRange: DateRange
  onDateRangeChange: (range: DateRange) => void
}

export default function DayOfWeekChart({ dateRange, onDateRangeChange }: DayOfWeekChartProps) {
  const data = useMemo(() => getDayOfWeekData(dateRange), [dateRange])

  const formatDollar = (val: number) => {
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`
    return `$${val}`
  }

  return (
    <div className="bg-white rounded-lg border border-cream-dark p-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-gray-800">Day of Week Analysis</h3>
        <div className="flex items-center gap-2">
          <DateRangePicker dateRange={dateRange} onDateRangeChange={onDateRangeChange} />
          <button
            onClick={() => onDateRangeChange([1, 31])}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Reset
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-3">Metrics by Day of Week</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 50, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d8" />
          <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="#999" />
          <YAxis yAxisId="left" tickFormatter={formatDollar} tick={{ fontSize: 10 }} stroke="#999" />
          <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `$${v}`} tick={{ fontSize: 10 }} stroke="#999" />
          <Tooltip
            contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e0d8' }}
            formatter={(value: number, name: string) => {
              if (name === 'New CVR') return [`${value}%`, name]
              if (name === 'Contribution %') return [`${value}%`, name]
              if (name === 'bROAS') return [`${value}%`, name]
              return [`$${value.toLocaleString()}`, name]
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 10, paddingTop: 4 }}
            iconType="circle"
            iconSize={6}
          />
          <Bar yAxisId="left" dataKey="totalSpend" name="Total Spend" fill="#e07a5f" radius={[2, 2, 0, 0]} />
          <Bar yAxisId="left" dataKey="contributionDollars" name="Contribution $" fill="#5cc9c4" radius={[2, 2, 0, 0]} />
          <Bar yAxisId="right" dataKey="cac" name="CAC" fill="#c9a0b0" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
