'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { SlidersHorizontal, ChevronUp, ChevronDown } from 'lucide-react'
import type { HeatmapRow, DateRange } from '@/data/dashboardData'
import { getDailyPacingData } from '@/data/dashboardData'
import DateRangePicker from './DateRangePicker'

interface ColumnDef {
  key: keyof HeatmapRow
  label: string
  format: (v: number) => string
  higherIsBetter: boolean
}

const columns: ColumnDef[] = [
  { key: 'date', label: 'Date', format: (v) => String(v), higherIsBetter: true },
  { key: 'spend', label: 'Spend', format: (v) => `$${v.toLocaleString()}`, higherIsBetter: false },
  { key: 'sessions', label: 'Sessions', format: (v) => v.toLocaleString(), higherIsBetter: true },
  { key: 'costPerSession', label: 'Cost Per Session', format: (v) => `$${v.toFixed(2)}`, higherIsBetter: false },
  { key: 'newCvr', label: 'New CVR', format: (v) => `${v.toFixed(2)}%`, higherIsBetter: true },
  { key: 'newRevenue', label: 'New Revenue', format: (v) => `$${v.toLocaleString()}`, higherIsBetter: true },
  { key: 'newAov', label: 'New AOV', format: (v) => `$${v}`, higherIsBetter: true },
  { key: 'newOrders', label: 'New Orders', format: (v) => v.toLocaleString(), higherIsBetter: true },
  { key: 'totalOrders', label: 'Total Orders', format: (v) => v.toLocaleString(), higherIsBetter: true },
  { key: 'totalCvr', label: 'Total CVR', format: (v) => `${v.toFixed(2)}%`, higherIsBetter: true },
  { key: 'cpp', label: 'CPP', format: (v) => `$${v}`, higherIsBetter: false },
  { key: 'cac', label: 'CAC', format: (v) => `$${v}`, higherIsBetter: false },
  { key: 'roas', label: 'ROAS', format: (v) => `${v}%`, higherIsBetter: true },
  { key: 'totalRevenue', label: 'Total Revenue', format: (v) => `$${v.toLocaleString()}`, higherIsBetter: true },
  { key: 'totalAov', label: 'Total AOV', format: (v) => `$${v}`, higherIsBetter: true },
  { key: 'bRoas', label: 'bROAS', format: (v) => `${v}%`, higherIsBetter: true },
  { key: 'contributionDollars', label: 'Contribution Dollars', format: (v) => `$${v.toLocaleString()}`, higherIsBetter: true },
  { key: 'contributionMargin', label: 'Contribution Margin', format: (v) => `${v}%`, higherIsBetter: true },
]

function getHeatmapColor(value: number, min: number, max: number, higherIsBetter: boolean): string {
  if (min === max) return 'transparent'
  let normalized = (value - min) / (max - min)
  const t = higherIsBetter ? normalized : 1 - normalized
  if (t <= 0.5) {
    const r = 224 + (250 - 224) * (t / 0.5)
    const g = 122 + (200 - 122) * (t / 0.5)
    const b = 95 + (100 - 95) * (t / 0.5)
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 0.3)`
  } else {
    const r = 250 + (92 - 250) * ((t - 0.5) / 0.5)
    const g = 200 + (201 - 200) * ((t - 0.5) / 0.5)
    const b = 100 + (196 - 100) * ((t - 0.5) / 0.5)
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 0.3)`
  }
}

interface DailyHeatmapProps {
  dateRange: DateRange
  onDateRangeChange: (range: DateRange) => void
}

export default function DailyHeatmap({ dateRange, onDateRangeChange }: DailyHeatmapProps) {
  const [visibleCols, setVisibleCols] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(columns.map(c => [c.key, true]))
  )
  const [showColDropdown, setShowColDropdown] = useState(false)
  const [dateAsc, setDateAsc] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowColDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const rawData = useMemo(() => getDailyPacingData(dateRange), [dateRange])
  const data = useMemo(() => dateAsc ? [...rawData].reverse() : rawData, [rawData, dateAsc])

  const visibleColumns = columns.filter(c => c.key === 'date' || visibleCols[c.key])

  // Compute min/max for each numeric column
  const ranges = useMemo(() => {
    const r: Record<string, { min: number; max: number }> = {}
    for (const col of columns) {
      if (col.key === 'date') continue
      const values = data.map(row => row[col.key] as number)
      r[col.key] = { min: Math.min(...values), max: Math.max(...values) }
    }
    return r
  }, [data])

  return (
    <div className="bg-white rounded-lg border border-cream-dark p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Business Daily Heatmap</h3>
        <div className="flex items-center gap-2">
          {/* Columns toggle */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowColDropdown(!showColDropdown)}
              className="flex items-center gap-1 text-xs bg-white border border-cream-dark rounded px-3 py-1.5 text-gray-700 font-medium"
            >
              <SlidersHorizontal size={13} className="text-gray-500" />
              Columns
            </button>
            {showColDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-cream-dark rounded-lg shadow-lg z-20 p-2 w-52">
                {columns.filter(c => c.key !== 'date').map(col => (
                  <label key={col.key} className="flex items-center gap-2 px-2 py-1 text-xs text-gray-700 hover:bg-cream rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleCols[col.key]}
                      onChange={() => setVisibleCols(prev => ({ ...prev, [col.key]: !prev[col.key] }))}
                      className="w-3 h-3 accent-sidebar"
                    />
                    {col.label}
                  </label>
                ))}
              </div>
            )}
          </div>

          <DateRangePicker dateRange={dateRange} onDateRangeChange={onDateRangeChange} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-cream-dark">
              {visibleColumns.map(col => (
                <th key={col.key} className="text-left py-2 px-2 font-semibold text-gray-600 whitespace-nowrap">
                  {col.key === 'date' ? (
                    <button
                      onClick={() => setDateAsc(prev => !prev)}
                      className="flex items-center gap-1 hover:text-gray-900 transition-colors"
                    >
                      {col.label}
                      {dateAsc ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                  ) : col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-cream-dark/50">
                {visibleColumns.map(col => {
                  const value = row[col.key]
                  const bg = col.key === 'date' ? 'transparent' : getHeatmapColor(
                    value as number,
                    ranges[col.key].min,
                    ranges[col.key].max,
                    col.higherIsBetter
                  )
                  return (
                    <td
                      key={col.key}
                      className="py-1.5 px-2 whitespace-nowrap"
                      style={{ backgroundColor: bg }}
                    >
                      {col.key === 'date' ? String(value) : col.format(value as number)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
