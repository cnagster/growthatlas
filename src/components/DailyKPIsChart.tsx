'use client'

import { useState, useCallback, useMemo } from 'react'
import {
  ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts'
import { getDailyKPIsChartData } from '@/data/dashboardData'
import type { DateRange } from '@/data/dashboardData'

const series = [
  { key: 'spend', name: 'Spend', stroke: '#e07a5f', strokeWidth: 2, axis: 'left' },
  { key: 'cac', name: 'CAC', stroke: '#c9a0b0', strokeWidth: 1.5, axis: 'right1' },
  { key: 'newOrders', name: 'New Orders', stroke: '#5cc9c4', strokeWidth: 1.5, axis: 'right2' },
  { key: 'newRevenue', name: 'New Revenue', stroke: '#3aada8', strokeWidth: 2, axis: 'left' },
  { key: 'totalOrders', name: 'Total Orders', stroke: '#8a7d5a', strokeWidth: 1.5, axis: 'right2' },
  { key: 'totalRevenue', name: 'Total Revenue', stroke: '#2d6a4f', strokeWidth: 2, axis: 'left' },
  { key: 'cpo', name: 'CPO', stroke: '#d4a373', strokeWidth: 1.5, axis: 'right1' },
  { key: 'cvr', name: 'CVR', stroke: '#7b68ee', strokeWidth: 1.5, axis: 'right3' },
] as const

interface DailyKPIsChartProps {
  dateRange: DateRange
}

export default function DailyKPIsChart({ dateRange }: DailyKPIsChartProps) {
  const [hidden, setHidden] = useState<Record<string, boolean>>({})

  const handleLegendClick = useCallback((e: { dataKey?: string }) => {
    if (e.dataKey) {
      setHidden(prev => ({ ...prev, [e.dataKey!]: !prev[e.dataKey!] }))
    }
  }, [])

  const data = useMemo(() => getDailyKPIsChartData(dateRange), [dateRange])

  const formatDollar = (val: number) => {
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`
    return `$${val}`
  }

  const formatCount = (val: number) => val.toString()
  const formatPct = (val: number) => `${val}%`

  return (
    <div className="bg-white rounded-lg border border-cream-dark p-4">
      <h3 className="text-sm font-semibold text-gray-800 text-center mb-3">Business Daily KPIs</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ top: 5, right: 80, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d8" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#999" />
          <YAxis yAxisId="left" tickFormatter={formatDollar} tick={{ fontSize: 10 }} stroke="#999" />
          <YAxis yAxisId="right1" orientation="right" tickFormatter={formatDollar} tick={{ fontSize: 10 }} stroke="#999" />
          <YAxis yAxisId="right2" orientation="right" tickFormatter={formatCount} tick={{ fontSize: 10 }} stroke="#999" hide />
          <YAxis yAxisId="right3" orientation="right" tickFormatter={formatPct} tick={{ fontSize: 10 }} stroke="#999" hide />
          <Tooltip
            formatter={(value: number, name: string) => [
              name === 'CVR' ? `${value}%` : name.includes('Orders') ? value : `$${value.toLocaleString()}`,
              name
            ]}
            contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e0d8' }}
          />
          <Legend
            wrapperStyle={{ fontSize: 10, paddingTop: 4, cursor: 'pointer' }}
            iconType="circle"
            iconSize={6}
            onClick={handleLegendClick}
            formatter={(value, entry) => (
              <span style={{ color: hidden[entry.dataKey as string] ? '#ccc' : '#666', textDecoration: hidden[entry.dataKey as string] ? 'line-through' : 'none' }}>
                {value}
              </span>
            )}
          />
          {series.map(s => (
            <Line
              key={s.key}
              yAxisId={s.axis === 'left' ? 'left' : s.axis === 'right1' ? 'right1' : s.axis === 'right2' ? 'right2' : 'right3'}
              type="monotone"
              dataKey={s.key}
              name={s.name}
              stroke={s.stroke}
              strokeWidth={s.strokeWidth}
              dot={false}
              hide={!!hidden[s.key]}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
