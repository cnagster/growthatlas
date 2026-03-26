'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { weeklyActualsData } from '@/data/dashboardData'
import type { WeeklyData } from '@/data/dashboardData'
import TableDatePicker from './TableDatePicker'
import type { DateOption, DatePreset } from './TableDatePicker'

interface RowDef {
  key: keyof WeeklyData
  label: string
  group: string
  format: (v: number) => string
  higherIsBetter: boolean
}

const rows: RowDef[] = [
  // Acquisition
  { key: 'newCount', label: 'New Count', group: 'Acquisition', format: v => v.toLocaleString(), higherIsBetter: true },
  { key: 'newRevenue', label: 'New Revenue', group: 'Acquisition', format: v => `$${v.toLocaleString()}`, higherIsBetter: true },
  { key: 'newCac', label: 'CAC', group: 'Acquisition', format: v => `$${v}`, higherIsBetter: false },
  { key: 'newRoas', label: 'ROAS', group: 'Acquisition', format: v => `${v}%`, higherIsBetter: true },
  { key: 'newAov', label: 'New AOV', group: 'Acquisition', format: v => `$${v}`, higherIsBetter: true },
  { key: 'acos', label: 'ACOS', group: 'Acquisition', format: v => `${v}%`, higherIsBetter: false },
  // Retention
  { key: 'returnCount', label: 'Return Count', group: 'Retention', format: v => v.toLocaleString(), higherIsBetter: true },
  { key: 'returnRevenue', label: 'Return Revenue', group: 'Retention', format: v => `$${v.toLocaleString()}`, higherIsBetter: true },
  { key: 'returnAov', label: 'Return AOV', group: 'Retention', format: v => `$${v}`, higherIsBetter: true },
  // Total
  { key: 'totalCount', label: 'Total Count', group: 'Total', format: v => v.toLocaleString(), higherIsBetter: true },
  { key: 'totalRevenue', label: 'Total Revenue', group: 'Total', format: v => `$${v.toLocaleString()}`, higherIsBetter: true },
  { key: 'totalAov', label: 'Total AOV', group: 'Total', format: v => `$${v}`, higherIsBetter: true },
  { key: 'cpp', label: 'CPP', group: 'Total', format: v => `$${v}`, higherIsBetter: false },
  { key: 'bRoas', label: 'bROAS/MER', group: 'Total', format: v => `${v}%`, higherIsBetter: true },
  { key: 'newCvr', label: 'New CVR', group: 'Total', format: v => `${v}%`, higherIsBetter: true },
  { key: 'totalCvr', label: 'Total CVR', group: 'Total', format: v => `${v}%`, higherIsBetter: true },
  { key: 'sessions', label: 'Sessions', group: 'Total', format: v => v.toLocaleString(), higherIsBetter: true },
  { key: 'cmDollars', label: 'Contribution Dollars', group: 'Total', format: v => `$${v.toLocaleString()}`, higherIsBetter: true },
  { key: 'cmPct', label: 'Contribution Margin', group: 'Total', format: v => `${v}%`, higherIsBetter: true },
  { key: 'pctNew', label: '% New', group: 'Total', format: v => `${v}%`, higherIsBetter: true },
  { key: 'pctReturn', label: '% Return', group: 'Total', format: v => `${v}%`, higherIsBetter: false },
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

const weekLabelMap: Record<string, string> = {
  '12/15': 'Dec 15', '12/22': 'Dec 22', '12/29': 'Dec 29',
  '01/05': 'Jan 05', '01/12': 'Jan 12', '01/19': 'Jan 19', '01/26': 'Jan 26',
  '02/02': 'Feb 02', '02/09': 'Feb 09', '02/16': 'Feb 16', '02/23': 'Feb 23',
  '03/02': 'Mar 02', '03/09': 'Mar 09', '03/16': 'Mar 16',
}

const allWeekOptions: DateOption[] = weeklyActualsData.map(w => ({
  value: w.weekStart,
  label: weekLabelMap[w.weekStart] || w.weekStart,
}))

const weeklyPresets: DatePreset[] = [
  { label: 'Last 4 Weeks', range: [weeklyActualsData[weeklyActualsData.length - 4].weekStart, weeklyActualsData[weeklyActualsData.length - 1].weekStart] },
  { label: 'Last 8 Weeks', range: [weeklyActualsData[Math.max(0, weeklyActualsData.length - 8)].weekStart, weeklyActualsData[weeklyActualsData.length - 1].weekStart] },
  { label: 'Last 12 Weeks', range: [weeklyActualsData[Math.max(0, weeklyActualsData.length - 12)].weekStart, weeklyActualsData[weeklyActualsData.length - 1].weekStart] },
  { label: 'All Weeks', range: [weeklyActualsData[0].weekStart, weeklyActualsData[weeklyActualsData.length - 1].weekStart] },
  { label: 'YTD (2026)', range: ['01/05', '03/16'] },
]

interface ActualsTableProps {
  dateRange: [string, string]
  onDateRangeChange: (range: [string, string]) => void
}

export default function ActualsTable({ dateRange, onDateRangeChange }: ActualsTableProps) {
  const allData = weeklyActualsData

  // Filter data by date range
  const data = useMemo(() => {
    const startIdx = allData.findIndex(d => d.weekStart === dateRange[0])
    const endIdx = allData.findIndex(d => d.weekStart === dateRange[1])
    if (startIdx === -1 || endIdx === -1) return allData
    return allData.slice(startIdx, endIdx + 1)
  }, [allData, dateRange])

  // Selected weeks for comparison (max 2). Empty = default to last 2 full weeks.
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

  const handleCheckbox = useCallback((weekStart: string) => {
    setSelected(prev => {
      if (prev.includes(weekStart)) {
        // Uncheck
        return prev.filter(w => w !== weekStart)
      }
      if (prev.length >= 2) {
        // Replace oldest selection
        return [prev[1], weekStart]
      }
      return [...prev, weekStart]
    })
  }, [])

  // Determine the two weeks being compared
  const [compareNew, compareOld] = useMemo(() => {
    if (selected.length === 2) {
      // Order by position in data array (earlier index = older)
      const idxA = data.findIndex(d => d.weekStart === selected[0])
      const idxB = data.findIndex(d => d.weekStart === selected[1])
      return idxA < idxB ? [data[idxB], data[idxA]] : [data[idxA], data[idxB]]
    }
    // Default: last 2 full weeks (skip the partial last week 03/16)
    if (data.length >= 3) {
      return [data[data.length - 2], data[data.length - 3]]
    }
    return [null, null]
  }, [selected, data])

  const compareLabel = compareNew && compareOld
    ? `${compareNew.weekStart} vs ${compareOld.weekStart}`
    : ''

  // Compute comparison percentages
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

  // Compute min/max per row across all weeks
  const ranges = useMemo(() => {
    const r: Record<string, { min: number; max: number }> = {}
    for (const row of rows) {
      const values = data.map(w => w[row.key] as number)
      r[row.key] = { min: Math.min(...values), max: Math.max(...values) }
    }
    return r
  }, [data])

  // Group rows (filtered by visibility)
  const groups = ['Acquisition', 'Retention', 'Total']
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
          {/* Rows toggle */}
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
            options={allWeekOptions}
            selectedRange={dateRange}
            onRangeChange={onDateRangeChange}
            presets={weeklyPresets}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-cream-dark">
              <th className="text-left py-2 px-2 font-semibold text-gray-600 w-16"></th>
              <th className="text-left py-2 px-2 font-semibold text-gray-600 w-20"></th>
              {data.map(w => {
                const isChecked = selected.includes(w.weekStart)
                const isCompared = compareNew?.weekStart === w.weekStart || compareOld?.weekStart === w.weekStart
                return (
                  <th key={w.weekStart} className="text-center py-2 px-2 font-semibold text-gray-600 whitespace-nowrap">
                    <div className="flex flex-col items-center gap-1">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckbox(w.weekStart)}
                        className="w-3 h-3 accent-sidebar"
                      />
                      <span className={isCompared && selected.length === 0 ? '' : isChecked ? 'text-coral font-bold' : ''}>
                        {w.weekStart}
                      </span>
                    </div>
                  </th>
                )
              })}
              <th className="text-center py-2 px-2 font-semibold text-gray-600 whitespace-nowrap">
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
                  {data.map(w => {
                    const value = w[row.key] as number
                    const bg = getHeatmapColor(value, ranges[row.key].min, ranges[row.key].max, row.higherIsBetter)
                    return (
                      <td
                        key={w.weekStart}
                        className="py-1.5 px-2 text-center whitespace-nowrap"
                        style={{ backgroundColor: bg }}
                      >
                        {row.format(value)}
                      </td>
                    )
                  })}
                  <td className="py-1.5 px-2 text-center whitespace-nowrap font-medium">
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
