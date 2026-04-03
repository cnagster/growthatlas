'use client'

import { useState, useCallback } from 'react'
import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts'
import { getFilteredDailyRevenue } from '@/data/dashboardData'
import type { DateRange } from '@/data/dashboardData'

interface DailyRevenueChartProps {
  running: boolean
  dateRange: DateRange
}

// Series config for running mode
const runningSeries = [
  { key: 'actualRevenueRunning', name: 'Actual Revenue (Running)', type: 'area', fill: '#5cc9c4', fillOpacity: 0.3, stroke: '#5cc9c4', strokeWidth: 2, axis: 'left' },
  { key: 'newRevenueRunning', name: 'New Revenue (Running)', type: 'area', fill: '#3aada8', fillOpacity: 0.5, stroke: '#3aada8', strokeWidth: 1.5, axis: 'left' },
  { key: 'targetRevenueRunning', name: 'Target Revenue (Running)', type: 'line', stroke: '#e07a5f', strokeWidth: 1.5, dash: '4 4', axis: 'left' },
  { key: 'targetNewRevenueRunning', name: 'Target New Revenue (Running)', type: 'line', stroke: '#d4a373', strokeWidth: 1, dash: '2 2', axis: 'left' },
  { key: 'spendRunning', name: 'Spend (Running)', type: 'line', stroke: '#c9a0b0', strokeWidth: 2, dot: true, axis: 'left' },
  { key: 'targetSpendRunning', name: 'Target Spend (Running)', type: 'line', stroke: '#8a7d5a', strokeWidth: 1, dash: '6 3', axis: 'left' },
  { key: 'deltaRunningTotalRevenue', name: 'Delta Running Total Revenue', type: 'line', stroke: '#7b68ee', strokeWidth: 1.5, dot: true, axis: 'right' },
] as const

// Series config for daily (non-running) mode
const dailySeries = [
  { key: 'actualRevenue', name: 'Actual Revenue', type: 'area', fill: '#5cc9c4', fillOpacity: 0.3, stroke: '#5cc9c4', strokeWidth: 2, axis: 'left' },
  { key: 'newRevenue', name: 'New Revenue', type: 'area', fill: '#3aada8', fillOpacity: 0.5, stroke: '#3aada8', strokeWidth: 1.5, axis: 'left' },
  { key: 'targetRevenue', name: 'Target Revenue', type: 'line', stroke: '#e07a5f', strokeWidth: 1.5, dash: '4 4', axis: 'left' },
  { key: 'targetNewRevenue', name: 'Target New Revenue', type: 'line', stroke: '#d4a373', strokeWidth: 1, dash: '2 2', axis: 'left' },
  { key: 'spend', name: 'Spend', type: 'line', stroke: '#c9a0b0', strokeWidth: 2, dot: true, axis: 'left' },
  { key: 'targetSpend', name: 'Target Spend', type: 'line', stroke: '#8a7d5a', strokeWidth: 1, dash: '6 3', axis: 'left' },
  { key: 'deltaRevenue', name: 'Delta Revenue', type: 'line', stroke: '#7b68ee', strokeWidth: 1.5, dot: true, axis: 'right' },
] as const

export default function DailyRevenueChart({ running, dateRange }: DailyRevenueChartProps) {
  const [hidden, setHidden] = useState<Record<string, boolean>>({})

  const handleLegendClick = useCallback((e: { dataKey?: string }) => {
    if (e.dataKey) {
      setHidden(prev => ({ ...prev, [e.dataKey!]: !prev[e.dataKey!] }))
    }
  }, [])

  const isVisible = (key: string) => !hidden[key]

  const formatRevenue = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}M`
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`
    return `$${val}`
  }

  const formatPacing = (val: number) => `${val}%`

  const data = getFilteredDailyRevenue(running, dateRange)
  const series = running ? runningSeries : dailySeries
  const title = running ? 'Daily Revenue' : 'Daily Revenue'

  return (
    <div className="bg-white rounded-lg border border-cream-dark p-4 flex-1">
      <h3 className="text-sm font-semibold text-gray-800 text-center mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={550}>
        <ComposedChart data={data} margin={{ top: 5, right: 50, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d8" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#999" />
          <YAxis yAxisId="left" tickFormatter={formatRevenue} tick={{ fontSize: 10 }} stroke="#999" />
          <YAxis yAxisId="right" orientation="right" tickFormatter={formatPacing} tick={{ fontSize: 10 }} stroke="#999" label={{ value: '% Pacing to Target', angle: 90, position: 'insideRight', style: { fontSize: 9, fill: '#999' }, offset: 15 }} />
          <Tooltip
            formatter={(value: number, name: string) => [
              name.includes('Delta') ? `${value}%` : `$${value.toLocaleString()}`,
              name
            ]}
            contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e0d8' }}
          />
          <Legend
            wrapperStyle={{ fontSize: 10, paddingTop: 4, cursor: 'pointer' }}
            iconType="circle"
            iconSize={6}
            onClick={handleLegendClick as any}
            formatter={(value, entry) => (
              <span style={{ color: hidden[entry.dataKey as string] ? '#ccc' : '#666', textDecoration: hidden[entry.dataKey as string] ? 'line-through' : 'none' }}>
                {value}
              </span>
            )}
          />

          {series.map((s) =>
            s.type === 'area' ? (
              <Area
                key={s.key}
                yAxisId={s.axis}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                fill={s.fill}
                fillOpacity={isVisible(s.key) ? s.fillOpacity : 0}
                stroke={s.stroke}
                strokeWidth={s.strokeWidth}
                hide={!isVisible(s.key)}
              />
            ) : (
              <Line
                key={s.key}
                yAxisId={s.axis}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={s.stroke}
                strokeWidth={s.strokeWidth}
                strokeDasharray={'dash' in s ? s.dash : undefined}
                dot={'dot' in s && s.dot ? { r: s.axis === 'right' ? 3 : 2, fill: s.stroke, strokeWidth: 0 } : false}
                hide={!isVisible(s.key)}
              />
            )
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
