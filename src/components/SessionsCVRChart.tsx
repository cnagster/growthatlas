'use client'

import {
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { sessionsCVRData, getFilteredSessionsCVR } from '@/data/dashboardData'
import type { DateRange } from '@/data/dashboardData'

export default function SessionsCVRChart({ dateRange }: { dateRange: DateRange }) {
  const isFullMonth = dateRange[0] === 1 && dateRange[1] === 31
  const data = isFullMonth ? sessionsCVRData : getFilteredSessionsCVR(dateRange)

  return (
    <div className="bg-white rounded-lg border border-cream-dark p-4 flex-1">
      <h3 className="text-sm font-semibold text-gray-800 text-center mb-3">Sessions vs CVR</h3>
      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart data={data} margin={{ top: 5, right: 40, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d8" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#999" />
          <YAxis
            yAxisId="left"
            tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
            tick={{ fontSize: 10 }}
            stroke="#999"
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(val) => `${val.toFixed(2)}%`}
            tick={{ fontSize: 10 }}
            stroke="#999"
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === 'CVR') return [`${value.toFixed(2)}%`, name]
              return [value.toLocaleString(), name]
            }}
            contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e0d8' }}
          />
          <Legend wrapperStyle={{ fontSize: 10 }} iconType="circle" iconSize={6} />

          <Area
            yAxisId="left"
            type="monotone"
            dataKey="sessions"
            name="Sessions"
            fill="#5cc9c4"
            fillOpacity={0.2}
            stroke="#5cc9c4"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="cvr"
            name="CVR"
            stroke="#e07a5f"
            strokeWidth={1.5}
            dot={{ r: 2, fill: '#e07a5f' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
