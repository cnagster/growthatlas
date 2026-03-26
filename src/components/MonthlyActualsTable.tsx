'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { monthlyActualsData } from '@/data/dashboardData'
import type { MonthlyData } from '@/data/dashboardData'
import TableDatePicker from './TableDatePicker'
import type { DateOption, DatePreset } from './TableDatePicker'

interface RowDef {
  key: keyof MonthlyData
  label: string
  group: string
  format: (v: number) => string
  higherIsBetter: boolean
}

const rows: RowDef[] = [
  // New
  { key: 'spend', label: 'Spend', group: 'New', format: v => `$${v.toLocaleString()}`, higherIsBetter: false },
  { key: 'newCount', label: 'Count', group: 'New', format: v => v.toLocaleString(), higherIsBetter: true },
  { key: 'newRevenue', label: 'Revenue', group: 'New', format: v => `$${v.toLocaleString()}`, higherIsBetter: true },
  { key: 'newCac', label: 'CAC', group: 'New', format: v => `$${v}`, higherIsBetter: false },
  { key: 'newRoas', label: 'ROAS', group: 'New', format: v => `${v}%`, higherIsBetter: true },
  { key: 'newAov', label: 'AOV', group: 'New', format: v => `$${v}`, higherIsBetter: true },
  { key: 'acos', label: 'ACOS', group: 'New', format: v => `${v}%`, higherIsBetter: false },
  // Return
  { key: 'returnCount', label: 'Count', group: 'Return', format: v => v.toLocaleString(), higherIsBetter: true },
  { key: 'returnRevenue', label: 'Revenue', group: 'Return', format: v => `$${v.toLocaleString()}`, higherIsBetter: true },
  { key: 'returnAov', label: 'AOV', group: 'Return', format: v => `$${v}`, higherIsBetter: true },
  // Total
  { key: 'totalCount', label: 'Count', group: 'Total', format: v => v.toLocaleString(), higherIsBetter: true },
  { key: 'totalRevenue', label: 'Revenue', group: 'Total', format: v => `$${v.toLocaleString()}`, higherIsBetter: true },
  { key: 'totalAov', label: 'AOV', group: 'Total', format: v => `$${v}`, higherIsBetter: true },
  { key: 'cpp', label: 'CPO', group: 'Total', format: v => `$${v}`, higherIsBetter: false },
  { key: 'bRoas', label: 'bROAS', group: 'Total', format: v => `${v}%`, higherIsBetter: true },
  { key: 'newCvr', label: 'New CVR', group: 'Total', format: v => `${v.toFixed(2)}%`, higherIsBetter: true },
  { key: 'totalCvr', label: 'CVR', group: 'Total', format: v => `${v.toFixed(2)}%`, higherIsBetter: true },
  { key: 'sessions', label: 'Sessions', group: 'Total', format: v => v.toLocaleString(), higherIsBetter: true },
  { key: 'cmDollars', label: 'CM $', group: 'Total', format: v => `$${v.toLocaleString()}`, higherIsBetter: true },
  { key: 'cmPct', label: 'CM %', group: 'Total', format: v => `${v}%`, higherIsBetter: true },
  // Percent
  { key: 'pctNew', label: '% New', group: 'Percent', format: v => `${v}%`, higherIsBetter: true },
  { key: 'pctReturn', label: '% Return', group: 'Percent', format: v => `${v}%`, higherIsBetter: false },
]

function getHeatmapColor(value: number, min: number, max: number, higherIsBetter: boolean): string {
  if (min === max) return 'transparent'
  const normalized = (value - min) / (max - min)
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

const monthLabelMap: Record<string, string> = {
  '2025-01': 'Jan 2025', '2025-02': 'Feb 2025', '2025-03': 'Mar 2025',
  '2025-04': 'Apr 2025', '2025-05': 'May 2025', '2025-06': 'Jun 2025',
  '2025-07': 'Jul 2025', '2025-08': 'Aug 2025', '2025-09': 'Sep 2025',
  '2025-10': 'Oct 2025', '2025-11': 'Nov 2025', '2025-12': 'Dec 2025',
  '2026-01': 'Jan 2026', '2026-02': 'Feb 2026', '2026-03': 'Mar 2026',
}

const allMonthOptions: DateOption[] = monthlyActualsData.map(m => ({
  value: m.month,
  label: monthLabelMap[m.month] || m.month,
}))

const monthlyPresets: DatePreset[] = [
  { label: 'Last 3 Months', range: [monthlyActualsData[Math.max(0, monthlyActualsData.length - 3)].month, monthlyActualsData[monthlyActualsData.length - 1].month] },
  { label: 'Last 6 Months', range: [monthlyActualsData[Math.max(0, monthlyActualsData.length - 6)].month, monthlyActualsData[monthlyActualsData.length - 1].month] },
  { label: 'Last 12 Months', range: [monthlyActualsData[Math.max(0, monthlyActualsData.length - 12)].month, monthlyActualsData[monthlyActualsData.length - 1].month] },
  { label: 'YTD (2026)', range: ['2026-01', '2026-03'] },
  { label: 'All Months', range: [monthlyActualsData[0].month, monthlyActualsData[monthlyActualsData.length - 1].month] },
]

interface MonthlyActualsTableProps {
  dateRange: [string, string]
  onDateRangeChange: (range: [string, string]) => void
}

export default function MonthlyActualsTable({ dateRange, onDateRangeChange }: MonthlyActualsTableProps) {
  const allData = monthlyActualsData

  // Filter data by date range
  const data = useMemo(() => {
    const startIdx = allData.findIndex(d => d.month === dateRange[0])
    const endIdx = allData.findIndex(d => d.month === dateRange[1])
    if (startIdx === -1 || endIdx === -1) return allData
    return allData.slice(startIdx, endIdx + 1)
  }, [allData, dateRange])

  const [selected, setSelected] = useState<string[]>([])
  const [visibleRows, setVisibleRows] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(rows.map(r => [r.key, true]))
  )
  const [showRowsDropdown, setShowRowsDropdown] = useState(false)
  const rowsDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rowsDropdownRef.current && !rowsDropdownRef.current.contains(e.target as Node)) {
        setShowRowsDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleCheckbox = useCallback((month: string) => {
    setSelected(prev => {
      if (prev.includes(month)) return prev.filter(w => w !== month)
      if (prev.length >= 2) return [prev[1], month]
      return [...prev, month]
    })
  }, [])

  // Compute yearly aggregates
  const yearlyAggregates = useMemo(() => {
    const years: Record<string, MonthlyData[]> = {}
    data.forEach(m => {
      const yr = m.month.substring(0, 4)
      if (!years[yr]) years[yr] = []
      years[yr].push(m)
    })
    const result: Record<string, Record<string, number>> = {}
    for (const [yr, months] of Object.entries(years)) {
      const totalSpend = months.reduce((s, m) => s + m.spend, 0)
      const totalNewRev = months.reduce((s, m) => s + m.newRevenue, 0)
      const totalNewCount = months.reduce((s, m) => s + m.newCount, 0)
      const totalRetCount = months.reduce((s, m) => s + m.returnCount, 0)
      const totalRetRev = months.reduce((s, m) => s + m.returnRevenue, 0)
      const totalRev = totalNewRev + totalRetRev
      const totalCount = totalNewCount + totalRetCount
      const totalSessions = months.reduce((s, m) => s + m.sessions, 0)
      result[yr] = {
        spend: totalSpend,
        newCount: totalNewCount,
        newRevenue: totalNewRev,
        newCac: totalNewCount > 0 ? Math.round(totalSpend / totalNewCount) : 0,
        newRoas: totalSpend > 0 ? Math.round((totalNewRev / totalSpend) * 100) : 0,
        newAov: totalNewCount > 0 ? Math.round(totalNewRev / totalNewCount) : 0,
        acos: totalNewRev > 0 ? Math.round((totalSpend / totalNewRev) * 100) : 0,
        returnCount: totalRetCount,
        returnRevenue: totalRetRev,
        returnAov: totalRetCount > 0 ? Math.round(totalRetRev / totalRetCount) : 0,
        totalCount,
        totalRevenue: totalRev,
        totalAov: totalCount > 0 ? Math.round(totalRev / totalCount) : 0,
        cpp: totalCount > 0 ? Math.round(totalSpend / totalCount) : 0,
        bRoas: totalSpend > 0 ? Math.round((totalRev / totalSpend) * 100) : 0,
        newCvr: totalSessions > 0 ? parseFloat(((totalNewCount / totalSessions) * 100).toFixed(2)) : 0,
        totalCvr: totalSessions > 0 ? parseFloat(((totalCount / totalSessions) * 100).toFixed(2)) : 0,
        sessions: totalSessions,
        cmDollars: Math.round(totalRev - totalSpend),
        cmPct: totalRev > 0 ? Math.round(((totalRev - totalSpend) / totalRev) * 100) : 0,
        pctNew: totalRev > 0 ? Math.round((totalNewRev / totalRev) * 100) : 0,
        pctReturn: totalRev > 0 ? Math.round((totalRetRev / totalRev) * 100) : 0,
      }
    }
    return result
  }, [data])

  const yearKeys = useMemo(() => Object.keys(yearlyAggregates).sort(), [yearlyAggregates])

  // Build column order: 2025 months, 2025 total, 2026 months, 2026 total
  type ColItem = { type: 'month'; data: MonthlyData } | { type: 'year'; year: string }
  const columnOrder = useMemo<ColItem[]>(() => {
    const cols: ColItem[] = []
    for (const yr of yearKeys) {
      const yrMonths = data.filter(m => m.month.startsWith(yr))
      yrMonths.forEach(m => cols.push({ type: 'month', data: m }))
      cols.push({ type: 'year', year: yr })
    }
    return cols
  }, [data, yearKeys])

  // Two selected months for comparison
  const [compareNew, compareOld] = useMemo(() => {
    if (selected.length === 2) {
      const idxA = data.findIndex(d => d.month === selected[0])
      const idxB = data.findIndex(d => d.month === selected[1])
      return idxA < idxB ? [data[idxB], data[idxA]] : [data[idxA], data[idxB]]
    }
    // Default: last 2 full months
    if (data.length >= 3) {
      return [data[data.length - 2], data[data.length - 3]]
    }
    return [null, null]
  }, [selected, data])

  const compareLabel = compareNew && compareOld
    ? `${compareNew.month.substring(5)} vs ${compareOld.month.substring(5)}`
    : ''

  const compareData = useMemo(() => {
    if (!compareNew || !compareOld) return null
    const result: Record<string, number> = {}
    for (const row of rows) {
      const newVal = compareNew[row.key] as number
      const oldVal = compareOld[row.key] as number
      result[row.key] = oldVal !== 0 ? parseFloat(((newVal - oldVal) / Math.abs(oldVal) * 100).toFixed(1)) : 0
    }
    return result
  }, [compareNew, compareOld])

  const ranges = useMemo(() => {
    const r: Record<string, { min: number; max: number }> = {}
    for (const row of rows) {
      const values = data.map(w => w[row.key] as number)
      r[row.key] = { min: Math.min(...values), max: Math.max(...values) }
    }
    return r
  }, [data])

  const groups = ['New', 'Return', 'Total', 'Percent']
  const groupedRows = groups
    .map(g => ({
      group: g,
      rows: rows.filter(r => r.group === g && visibleRows[r.key]),
    }))
    .filter(g => g.rows.length > 0)

  return (
    <div className="bg-white rounded-lg border border-cream-dark p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Actuals</h3>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="relative" ref={rowsDropdownRef}>
            <button
              onClick={() => setShowRowsDropdown(!showRowsDropdown)}
              className="flex items-center gap-1 bg-white border border-cream-dark rounded px-3 py-1.5 text-gray-700 font-medium"
            >
              <SlidersHorizontal size={13} className="text-gray-500" />
              Rows
            </button>
            {showRowsDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-cream-dark rounded-lg shadow-lg z-20 p-2 w-56 max-h-80 overflow-y-auto">
                {groups.map(group => (
                  <div key={group}>
                    <div className="px-2 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{group}</div>
                    {rows.filter(r => r.group === group).map(row => (
                      <label key={row.key} className="flex items-center gap-2 px-2 py-1 text-xs text-gray-700 hover:bg-cream rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={visibleRows[row.key]}
                          onChange={() => setVisibleRows(prev => ({ ...prev, [row.key]: !prev[row.key] }))}
                          className="w-3 h-3 accent-sidebar"
                        />
                        {row.label}
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          <TableDatePicker
            options={allMonthOptions}
            selectedRange={dateRange}
            onRangeChange={onDateRangeChange}
            presets={monthlyPresets}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-cream-dark">
              <th className="text-left py-2 px-2 font-semibold text-gray-600 w-16"></th>
              <th className="text-left py-2 px-2 font-semibold text-gray-600 w-20"></th>
              {columnOrder.map((col, i) => {
                if (col.type === 'year') {
                  return (
                    <th key={`yr-${col.year}`} className="text-center py-2 px-2 font-semibold text-gray-600 whitespace-nowrap border-l border-cream-dark">
                      {col.year}
                    </th>
                  )
                }
                const m = col.data
                const isChecked = selected.includes(m.month)
                const isCompared = compareNew?.month === m.month || compareOld?.month === m.month
                return (
                  <th key={m.month} className="text-center py-2 px-2 font-semibold text-gray-600 whitespace-nowrap">
                    <div className="flex flex-col items-center gap-1">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckbox(m.month)}
                        className="w-3 h-3 accent-sidebar"
                      />
                      <span className={isCompared && selected.length === 0 ? '' : isChecked ? 'text-coral font-bold' : ''}>
                        {m.month}
                      </span>
                      {isChecked && <span className="text-coral text-[9px]">✓</span>}
                    </div>
                  </th>
                )
              })}
              <th className="text-center py-2 px-2 font-semibold text-gray-600 whitespace-nowrap border-l border-cream-dark">
                {compareLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {groupedRows.map(({ group, rows: groupRows }) => (
              groupRows.map((row, rowIdx) => (
                <tr key={`${group}-${row.key}`} className="border-b border-cream-dark/50">
                  {rowIdx === 0 && (
                    <td
                      rowSpan={groupRows.length}
                      className="py-1.5 px-2 font-semibold text-gray-700 align-top border-r border-cream-dark"
                    >
                      {group}
                    </td>
                  )}
                  <td className="py-1.5 px-2 font-medium text-gray-600 whitespace-nowrap">
                    {row.label}
                  </td>
                  {columnOrder.map((col) => {
                    if (col.type === 'year') {
                      return (
                        <td key={`yr-${col.year}`} className="py-1.5 px-2 text-center whitespace-nowrap border-l border-cream-dark font-medium">
                          {row.format(yearlyAggregates[col.year][row.key] ?? 0)}
                        </td>
                      )
                    }
                    const m = col.data
                    const value = m[row.key] as number
                    const bg = getHeatmapColor(value, ranges[row.key].min, ranges[row.key].max, row.higherIsBetter)
                    return (
                      <td
                        key={m.month}
                        className="py-1.5 px-2 text-center whitespace-nowrap"
                        style={{ backgroundColor: bg }}
                      >
                        {row.format(value)}
                      </td>
                    )
                  })}
                  <td className="py-1.5 px-2 text-center whitespace-nowrap font-medium border-l border-cream-dark">
                    {compareData && (
                      <span className={compareData[row.key] >= 0
                        ? (row.higherIsBetter ? 'text-green-600' : 'text-red-600')
                        : (row.higherIsBetter ? 'text-red-600' : 'text-green-600')
                      }>
                        {compareData[row.key] >= 0 ? '+' : ''}{compareData[row.key]}%
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
