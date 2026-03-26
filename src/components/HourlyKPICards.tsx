'use client'

import { useState, useMemo } from 'react'
import { hourlyKPIData, hourlyKPIDataAll } from '@/data/dashboardData'

function formatValue(value: number, suffix?: string): string {
  if (suffix === '%') return `${value}%`
  if (suffix === '#') return value.toLocaleString()
  return `$${value.toLocaleString()}`
}

interface KPICardProps {
  label: string
  value: number
  suffix?: string
}

function KPICard({ label, value, suffix }: KPICardProps) {
  return (
    <div className="bg-white rounded-lg p-3 border border-cream-dark">
      <div className="text-[10px] text-gray-500 font-medium mb-0.5">{label}</div>
      <div className="flex items-center justify-between">
        <span className="text-base font-bold text-gray-900">{formatValue(value, suffix)}</span>
        <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-green-100 text-green-700">
          ↑0%
        </span>
      </div>
    </div>
  )
}

type HourlyKPIKey = 'spend' | 'newRevenue' | 'cac' | 'roas' | 'newAov' | 'repeatRevenue' | 'repeatAov' | 'totalRevenue' | 'totalAov' | 'broas'

interface CardDef {
  key: HourlyKPIKey
  show: (aov: boolean) => boolean
}

const cardOrder: CardDef[] = [
  { key: 'spend', show: () => true },
  { key: 'newRevenue', show: () => true },
  { key: 'cac', show: () => true },
  { key: 'roas', show: () => true },
  { key: 'newAov', show: (a) => a },
  { key: 'repeatRevenue', show: () => true },
  { key: 'repeatAov', show: (a) => a },
  { key: 'totalRevenue', show: () => true },
  { key: 'totalAov', show: (a) => a },
  { key: 'broas', show: () => true },
]

export default function HourlyKPICards({ allCustomers }: { allCustomers: boolean }) {
  const [showAov, setShowAov] = useState(false)

  const baseData = allCustomers ? hourlyKPIDataAll : hourlyKPIData

  const visibleCards = useMemo(
    () => cardOrder.filter(c => c.show(showAov)),
    [showAov]
  )

  return (
    <div className="flex flex-col gap-2 w-44">
      {/* AOV checkbox */}
      <div className="flex items-center gap-1 text-xs mb-1">
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
        const item = baseData[key]
        return (
          <KPICard
            key={key}
            label={item.label}
            value={item.value}
            suffix={item.suffix}
          />
        )
      })}
    </div>
  )
}
