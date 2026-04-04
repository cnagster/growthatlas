'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { paidVsOrganicData, getFilteredPaidVsOrganic } from '@/data/dashboardData'
import type { DateRange } from '@/data/dashboardData'

export default function PaidVsOrganicChart({ dateRange, selectedMonth = '2026-03' }: { dateRange: DateRange; selectedMonth?: string }) {
  const isFullMonth = dateRange[0] === 1 && dateRange[1] === 31
  const data = isFullMonth ? paidVsOrganicData : getFilteredPaidVsOrganic(dateRange, selectedMonth)

  return (
    <div className="bg-white rounded-lg border border-cream-dark p-4 w-56">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">Paid vs Organic</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            formatter={(value) => {
              const item = data.find(d => d.name === value)
              return <span style={{ fontSize: 11, color: '#666' }}>{value}: {item?.value}%</span>
            }}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 11 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
