'use client'

import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { acquisitionData, getFilteredAcquisition } from '@/data/dashboardData'
import type { DateRange } from '@/data/dashboardData'

export default function AcquisitionMetricsChart({ dateRange, selectedMonth = '2026-03' }: { dateRange: DateRange; selectedMonth?: string }) {
  const isFullMonth = dateRange[0] === 1 && dateRange[1] === 31
  const data = isFullMonth ? acquisitionData : getFilteredAcquisition(dateRange, selectedMonth)

  return (
    <div className="bg-white rounded-lg border border-cream-dark p-4">
      <h3 className="text-sm font-semibold text-gray-800 text-center mb-3">Acquisition Metrics</h3>
      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={data} margin={{ top: 5, right: 50, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d8" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#999" />
          <YAxis
            yAxisId="left"
            tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
            tick={{ fontSize: 10 }}
            stroke="#999"
            label={{ value: 'Spend', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#999' } }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 10 }}
            stroke="#999"
          />
          <YAxis
            yAxisId="right2"
            orientation="right"
            tickFormatter={(val) => `$${val}`}
            tick={{ fontSize: 10 }}
            stroke="#999"
            hide
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === 'Spend') return [`$${value.toLocaleString()}`, name]
              if (name === 'CAC') return [`$${value}`, name]
              return [value, name]
            }}
            contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e0d8' }}
          />
          <Legend wrapperStyle={{ fontSize: 10 }} iconType="circle" iconSize={6} />

          <Bar
            yAxisId="left"
            dataKey="spend"
            name="Spend"
            fill="#c9a0b0"
            fillOpacity={0.7}
            radius={[2, 2, 0, 0]}
            barSize={30}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="newCustomers"
            name="New Customers"
            stroke="#e07a5f"
            strokeWidth={2}
            dot={{ r: 3, fill: '#e07a5f' }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="cac"
            name="CAC"
            stroke="#e07a5f"
            strokeWidth={1}
            strokeDasharray="4 4"
            dot={{ r: 2, fill: '#e07a5f', stroke: '#e07a5f' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
