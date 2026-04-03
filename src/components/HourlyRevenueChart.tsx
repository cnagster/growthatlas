'use client'

import { useState, useCallback } from 'react'
import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts'
import { hourlyRevenueData, hourlyRevenueDataActuals, hourlyRevenueDataAll, hourlyRevenueDataAllActuals } from '@/data/dashboardData'

interface HourlyRevenueChartProps {
  runningTotal: boolean
  allCustomers: boolean
}

function getSeries(allCustomers: boolean) {
  const revLabel = allCustomers ? 'Total Revenue' : 'New Revenue'
  const avgLabel = allCustomers ? 'L7D Avg Total Revenue' : 'L7D Avg New Revenue'
  const costLabel = allCustomers ? 'CPA' : 'CAC'
  return [
    { key: 'todayNewRevenue', name: `Today's ${revLabel}`, type: 'area' as const, fill: '#d4a373', fillOpacity: 0.3, stroke: '#d4a373', strokeWidth: 2, axis: 'left' },
    { key: 'l7dAvgNewRevenue', name: avgLabel, type: 'line' as const, stroke: '#e07a5f', strokeWidth: 1.5, dash: '4 4', axis: 'left' },
    { key: 'metaSpend', name: 'Meta Spend', type: 'line' as const, stroke: '#2d6a4f', strokeWidth: 1.5, dot: true, axis: 'left' },
    { key: 'googleSpend', name: 'Google Spend', type: 'line' as const, stroke: '#e07a5f', strokeWidth: 1.5, dot: true, axis: 'left' },
    { key: 'tiktokSpend', name: 'TikTok Spend', type: 'line' as const, stroke: '#c9a0b0', strokeWidth: 1.5, dot: true, axis: 'left' },
    { key: 'cac', name: costLabel, type: 'line' as const, stroke: '#e07a5f', strokeWidth: 1, dot: false, axis: 'right' },
  ]
}

export default function HourlyRevenueChart({ runningTotal, allCustomers }: HourlyRevenueChartProps) {
  const [hidden, setHidden] = useState<Record<string, boolean>>({})

  const handleLegendClick = useCallback((e: { dataKey?: string }) => {
    if (e.dataKey) {
      setHidden(prev => ({ ...prev, [e.dataKey!]: !prev[e.dataKey!] }))
    }
  }, [])

  const isVisible = (key: string) => !hidden[key]

  const formatRevenue = (val: number) => {
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`
    return `$${val}`
  }

  const formatCAC = (val: number) => `$${val}`

  const data = allCustomers
    ? (runningTotal ? hourlyRevenueDataAll : hourlyRevenueDataAllActuals)
    : (runningTotal ? hourlyRevenueData : hourlyRevenueDataActuals)
  const series = getSeries(allCustomers)
  const title = runningTotal ? "Today's Cumulative Revenue by Hour" : "Today's Revenue by Hour"

  return (
    <div className="bg-white rounded-lg border border-cream-dark p-4 flex-1">
      <h3 className="text-sm font-semibold text-gray-800 text-center mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data} margin={{ top: 5, right: 50, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d8" />
          <XAxis dataKey="hour" tick={{ fontSize: 10 }} stroke="#999" />
          <YAxis yAxisId="left" tickFormatter={formatRevenue} tick={{ fontSize: 10 }} stroke="#999" label={{ value: 'Revenue', angle: -90, position: 'insideLeft', style: { fontSize: 9, fill: '#999' } }} />
          <YAxis yAxisId="right" orientation="right" tickFormatter={formatCAC} tick={{ fontSize: 10 }} stroke="#999" label={{ value: 'CAC', angle: 90, position: 'insideRight', style: { fontSize: 9, fill: '#999' }, offset: 15 }} />
          <Tooltip
            formatter={(value: number, name: string) => [
              name === 'CAC' ? `$${value}` : `$${value.toLocaleString()}`,
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
                dot={'dot' in s && s.dot ? { r: 2, fill: s.stroke, strokeWidth: 0 } : false}
                hide={!isVisible(s.key)}
              />
            )
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
