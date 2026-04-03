'use client'

import { useState, useMemo } from 'react'
import { kpiData, getFilteredKPIs } from '@/data/dashboardData'
import type { DateRange } from '@/data/dashboardData'

function formatValue(value: number, suffix?: string): string {
  if (suffix === '%') return `${value}%`
  if (suffix === '#') return value.toLocaleString()
  return `$${value.toLocaleString()}`
}

interface KPICardProps {
  label: string
  value: number
  change: number
  suffix?: string
}

function KPICard({ label, value, change, suffix }: KPICardProps) {
  const isPositive = change >= 0

  return (
    <div className="bg-white rounded-lg p-3 border border-cream-dark">
      <div className="text-[10px] text-gray-500 font-medium mb-0.5">{label}</div>
      <div className="flex items-center justify-between">
        <span className="text-base font-bold text-gray-900">{formatValue(value, suffix)}</span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
          isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
        }`}>
          {isPositive ? '↑' : '↓'}{Math.abs(change)}%
        </span>
      </div>
    </div>
  )
}

type KPIKey = 'spend' | 'newOrders' | 'newRevenue' | 'cac' | 'roas' | 'newAov' | 'returnOrders' | 'returnRevenue' | 'repeatAov' | 'totalOrders' | 'totalRevenue' | 'totalAov' | 'broas' | 'contributionDollars'

interface CardDef {
  key: KPIKey
  show: (orders: boolean, aov: boolean) => boolean
}

const cardOrder: CardDef[] = [
  { key: 'spend', show: () => true },
  { key: 'newOrders', show: (o) => o },
  { key: 'newRevenue', show: () => true },
  { key: 'cac', show: () => true },
  { key: 'roas', show: () => true },
  { key: 'newAov', show: (_, a) => a },
  { key: 'returnOrders', show: (o) => o },
  { key: 'returnRevenue', show: () => true },
  { key: 'repeatAov', show: (_, a) => a },
  { key: 'totalOrders', show: (o) => o },
  { key: 'totalRevenue', show: () => true },
  { key: 'totalAov', show: (_, a) => a },
  { key: 'broas', show: () => true },
  { key: 'contributionDollars', show: () => true },
]

export default function KPICards({ dateRange }: { dateRange: DateRange }) {
  const [showOrders, setShowOrders] = useState(false)
  const [showAov, setShowAov] = useState(false)

  const isFullMonth = dateRange[0] === 1 && dateRange[1] === 31
  const data = isFullMonth ? kpiData : getFilteredKPIs(dateRange)

  const visibleCards = useMemo(
    () => cardOrder.filter(c => c.show(showOrders, showAov)),
    [showOrders, showAov]
  )

  return (
    <div className="flex flex-col gap-2 w-44">
      {/* Orders / AOV toggles */}
      <div className="flex items-center gap-3 text-xs mb-1">
        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="checkbox"
            checked={showOrders}
            onChange={() => setShowOrders(prev => !prev)}
            className="w-3 h-3 accent-sidebar"
          />
          <span className="text-gray-700">Orders</span>
        </label>
        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="checkbox"
            checked={showAov}
            onChange={() => setShowAov(prev => !prev)}
            className="w-3 h-3 accent-sidebar"
          />
          <span className="text-gray-700">AOV</span>
        </label>
      </div>

      {visibleCards.map(({ key }) => {
        const item = data[key]
        return (
          <KPICard
            key={key}
            label={item.label}
            value={item.value}
            change={item.change}
            suffix={'suffix' in item ? item.suffix : undefined}
          />
        )
      })}
    </div>
  )
}
