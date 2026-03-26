'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { quarterlyActualsData } from '@/data/dashboardData'
import type { QuarterlyData } from '@/data/dashboardData'
import TableDatePicker from './TableDatePicker'
import type { DateOption, DatePreset } from './TableDatePicker'

interface RowDef {
  key: keyof QuarterlyData
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

const allQuarterOptions: DateOption[] = quarterlyActualsData.map(q => ({
  value: q.quarter,
  label: q.quarter,
}))

const quarterlyPresets: DatePreset[] = [
  { label: 'Last 2 Quarters', range: [quarterlyActualsData[Math.max(0, quarterlyActualsData.length - 2)].quarter, quarterlyActualsData[quarterlyActualsData.length - 1].quarter] },
  { label: 'Last 4 Quarters', range: [quarterlyActualsData[Math.max(0, quarterlyActualsData.length - 4)].quarter, quarterlyActualsData[quarterlyActualsData.length - 1].quarter] },
  { label: 'All Quarters', range: [quarterlyActualsData[0].quarter, quarterlyActualsData[quarterlyActualsData.length - 1].quarter] },
]

interface QuarterlyActualsTableProps {
  dateRange: [string, string]
  onDateRangeChange: (range: [string, string]) => void
}

export default function QuarterlyActualsTable({ dateRange, onDateRangeChange }: QuarterlyActualsTableProps) {
  const allData = quarterlyActualsData

  // Filter data by date range
  const data = useMemo(() => {
    const startIdx = allData.findIndex(d => d.quarter === dateRange[0])
    const endIdx = allData.findIndex(d => d.quarter === dateRange[1])
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

  const handleCheckbox = useCallback((quarter: string) => {
    setSelected(prev => {
      if (prev.includes(quarter)) return prev.filter(q => q !== quarter)
      if (prev.length >= 2) return [prev[1], quarter]
      return [...prev, quarter]
    })
  }, [])

  // Compute yearly aggregates
  const yearlyAggregates = useMemo(() => {
    const years: Record<string, QuarterlyData[]> = {}
    data.forEach(q => {
      const yr = q.quarter.substring(0, 4)
      if (!years[yr]) years[yr] = []
      years[yr].push(q)
    })
    const result: Record<string, Record<string, number>> = {}
    for (const [yr, quarters] of Object.entries(years)) {
      const totalSpend = quarters.reduce((s, q) => s + q.spend, 0)
      const totalNewRev = quarters.reduce((s, q) => s + q.newRevenue, 0)
      const totalNewCount = quarters.reduce((s, q) => s + q.newCount, 0)
      const totalRetCount = quarters.reduce((s, q) => s + q.returnCount, 0)
      const totalRetRev = quarters.reduce((s, q) => s + q.returnRevenue, 0)
      const totalRev = totalNewRev + totalRetRev
      const totalCount = totalNewCount + totalRetCount
      const totalSessions = quarters.reduce((s, q) => s + q.sessions, 0)
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

  // Build column order: Q1-Q4, Annual, next year Q1..., Annual
  type ColItem = { type: 'quarter'; data: QuarterlyData } | { type: 'year'; year: string }
  const columnOrder = useMemo<ColItem[]>(() => {
    const cols: ColItem[] = []
    for (const yr of yearKeys) {
      const yrQuarters = data.filter(q => q.quarter.startsWith(yr))
      yrQuarters.forEach(q => cols.push({ type: 'quarter', data: q }))
      cols.push({ type: 'year', year: yr })
    }
    return cols
  }, [data, yearKeys])

  // Comparison
  const [compareNew, compareOld] = useMemo(() => {
    if (selected.length === 2) {
      const idxA = data.findIndex(d => d.quarter === selected[0])
      const idxB = data.findIndex(d => d.quarter === selected[1])
      return idxA < idxB ? [data[idxB], data[idxA]] : [data[idxA], data[idxB]]
    }
    if (data.length >= 2) {
      return [data[data.length - 1], data[data.length - 2]]
    }
    return [null, null]
  }, [selected, data])

  const compareLabel = compareNew && compareOld
    ? `${compareNew.quarter.replace(/^\d{4}-/, '')} vs ${compareOld.quarter.replace(/^\d{4}-/, '')}`
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
      const values = data.map(q => q[row.key] as number)
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
            options={allQuarterOptions}
            selectedRange={dateRange}
            onRangeChange={onDateRangeChange}
            presets={quarterlyPresets}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-cream-dark">
              <th className="text-left py-2 px-2 font-semibold text-gray-600 w-16"></th>
              <th className="text-left py-2 px-2 font-semibold text-gray-600 w-20"></th>
              {columnOrder.map((col) => {
                if (col.type === 'year') {
                  return (
                    <th key={`yr-${col.year}`} className="text-center py-2 px-3 font-semibold text-gray-600 whitespace-nowrap border-l border-cream-dark">
                      {col.year} Annual
                    </th>
                  )
                }
                const q = col.data
                const isChecked = selected.includes(q.quarter)
                const isCompared = compareNew?.quarter === q.quarter || compareOld?.quarter === q.quarter
                return (
                  <th key={q.quarter} className="text-center py-2 px-3 font-semibold text-gray-600 whitespace-nowrap">
                    <div className="flex flex-col items-center gap-1">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckbox(q.quarter)}
                        className="w-3 h-3 accent-sidebar"
                      />
                      <span className={isCompared && selected.length === 0 ? '' : isChecked ? 'text-coral font-bold' : ''}>
                        {q.quarter}
                      </span>
                      {isChecked && <span className="text-coral text-[9px]">✓</span>}
                    </div>
                  </th>
                )
              })}
              <th className="text-center py-2 px-3 font-semibold text-gray-600 whitespace-nowrap border-l border-cream-dark">
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
                    const q = col.data
                    const value = q[row.key] as number
                    const bg = getHeatmapColor(value, ranges[row.key].min, ranges[row.key].max, row.higherIsBetter)
                    return (
                      <td
                        key={q.quarter}
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
