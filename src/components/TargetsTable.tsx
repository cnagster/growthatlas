'use client'

import { useState, useMemo } from 'react'
import { weeklyTargetsData, weeklyActualsData } from '@/data/dashboardData'
import type { WeeklyTarget } from '@/data/dashboardData'

interface RowDef {
  key: keyof WeeklyTarget
  label: string
  group: string
  format: (v: number) => string
}

const rows: RowDef[] = [
  { key: 'newSpend', label: 'Spend', group: 'New', format: v => `$${v.toLocaleString()}` },
  { key: 'newCount', label: 'Count', group: 'New', format: v => v.toLocaleString() },
  { key: 'newRevenue', label: 'Revenue', group: 'New', format: v => `$${v.toLocaleString()}` },
  { key: 'newCac', label: 'CAC', group: 'New', format: v => `$${v}` },
  { key: 'newRoas', label: 'ROAS', group: 'New', format: v => `${v}%` },
  { key: 'newAov', label: 'AOV', group: 'New', format: v => `$${v}` },
  { key: 'newAcos', label: 'ACOS', group: 'New', format: v => `${v}%` },
  { key: 'returnCount', label: 'Count', group: 'Return', format: v => v.toLocaleString() },
  { key: 'returnRevenue', label: 'Revenue', group: 'Return', format: v => `$${v.toLocaleString()}` },
  { key: 'totalCount', label: 'Count', group: 'Total', format: v => v.toLocaleString() },
  { key: 'totalRevenue', label: 'Revenue', group: 'Total', format: v => `$${v.toLocaleString()}` },
  { key: 'bRoas', label: 'bROAS', group: 'Total', format: v => `${v}%` },
]

function getTargetHeatmapColor(pctFromTarget: number): string {
  // Green if at/above target, yellow if close, red if far below
  if (pctFromTarget >= 0) {
    const t = Math.min(pctFromTarget / 20, 1)
    return `rgba(92, 201, 196, ${0.15 + t * 0.2})`
  } else {
    const t = Math.min(Math.abs(pctFromTarget) / 30, 1)
    if (t < 0.5) {
      // Yellow zone
      return `rgba(250, 200, 100, ${0.2 + t * 0.3})`
    }
    // Red zone
    return `rgba(224, 122, 95, ${0.15 + (t - 0.5) * 0.3})`
  }
}

interface TargetsTableProps {
  dateRange: [string, string]
}

export default function TargetsTable({ dateRange }: TargetsTableProps) {
  const [mode, setMode] = useState<'values' | 'pctFromTarget'>('values')
  const allTargets = weeklyTargetsData
  const actuals = weeklyActualsData

  // Filter targets by date range
  const targets = useMemo(() => {
    const startIdx = allTargets.findIndex(t => t.weekStart === dateRange[0])
    const endIdx = allTargets.findIndex(t => t.weekStart === dateRange[1])
    if (startIdx === -1 || endIdx === -1) return allTargets
    return allTargets.slice(startIdx, endIdx + 1)
  }, [allTargets, dateRange])

  // Build actuals lookup by weekStart
  const actualsMap = useMemo(() => {
    const m: Record<string, typeof actuals[number]> = {}
    actuals.forEach(a => { m[a.weekStart] = a })
    return m
  }, [actuals])

  // Map target keys to actual keys
  const targetToActualKey: Record<string, string> = {
    newSpend: 'newSpend',
    newCount: 'newCount',
    newRevenue: 'newRevenue',
    newCac: 'newCac',
    newRoas: 'newRoas',
    newAov: 'newAov',
    newAcos: 'newSpend', // ACOS = spend/revenue, handled separately
    returnCount: 'returnCount',
    returnRevenue: 'returnRevenue',
    totalCount: 'totalCount',
    totalRevenue: 'totalRevenue',
    bRoas: 'bRoas',
  }

  const groups = ['New', 'Return', 'Total']
  const groupedRows = groups.map(g => ({
    group: g,
    rows: rows.filter(r => r.group === g),
  }))

  // Keys that get conditional formatting in Values mode
  const conditionalKeys = new Set(['newSpend', 'newCac', 'newRevenue', 'returnRevenue', 'totalRevenue'])

  const getPctFromTarget = (targetKey: string, targetVal: number, weekStart: string): number | null => {
    const actual = actualsMap[weekStart]
    if (!actual || targetVal === 0) return null
    const actualKey = targetToActualKey[targetKey]
    if (!actualKey) return null
    let actualVal: number
    if (targetKey === 'newAcos') {
      // ACOS = spend / newRevenue * 100
      actualVal = actual.newRevenue > 0 ? Math.round((actual.newSpend / actual.newRevenue) * 100) : 0
    } else {
      actualVal = actual[actualKey as keyof typeof actual] as number
    }
    return parseFloat(((actualVal - targetVal) / Math.abs(targetVal) * 100).toFixed(1))
  }

  return (
    <div className="bg-white rounded-lg border border-cream-dark p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-800">Targets</h3>
          <div className="flex text-xs">
            <button
              onClick={() => setMode('values')}
              className={`px-3 py-1 rounded-l border ${mode === 'values' ? 'bg-sidebar text-white border-sidebar' : 'bg-white text-gray-600 border-cream-dark'}`}
            >
              Values
            </button>
            <button
              onClick={() => setMode('pctFromTarget')}
              className={`px-3 py-1 rounded-r border-t border-r border-b ${mode === 'pctFromTarget' ? 'bg-sidebar text-white border-sidebar' : 'bg-white text-gray-600 border-cream-dark'}`}
            >
              % From Target
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-cream-dark">
              <th className="text-left py-2 px-2 font-semibold text-gray-600 w-16"></th>
              <th className="text-left py-2 px-2 font-semibold text-gray-600 w-20"></th>
              {targets.map(t => (
                <th key={t.weekStart} className="text-center py-2 px-2 font-semibold text-gray-600 whitespace-nowrap">
                  {t.weekStart}
                </th>
              ))}
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
                  {targets.map(t => {
                    const targetVal = t[row.key] as number

                    if (mode === 'values') {
                      let valueBg = 'transparent'
                      if (conditionalKeys.has(row.key)) {
                        const pctVal = getPctFromTarget(row.key, targetVal, t.weekStart)
                        if (pctVal !== null) {
                          // For spend/CAC, being below target is good (green); for revenue, above is good
                          const isLowerBetter = row.key === 'newSpend' || row.key === 'newCac'
                          const adjustedPct = isLowerBetter ? -pctVal : pctVal
                          valueBg = getTargetHeatmapColor(adjustedPct)
                        }
                      }
                      return (
                        <td key={t.weekStart} className="py-1.5 px-2 text-center whitespace-nowrap" style={{ backgroundColor: valueBg }}>
                          {row.format(targetVal)}
                        </td>
                      )
                    }

                    // % From Target mode
                    const pct = getPctFromTarget(row.key, targetVal, t.weekStart)
                    const bg = pct !== null ? getTargetHeatmapColor(pct) : 'transparent'
                    return (
                      <td
                        key={t.weekStart}
                        className="py-1.5 px-2 text-center whitespace-nowrap"
                        style={{ backgroundColor: bg }}
                      >
                        {pct !== null ? `${pct >= 0 ? '+' : ''}${pct}%` : '–'}
                      </td>
                    )
                  })}
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-2">
        <button className="text-xs text-gray-500 hover:text-gray-700">Export to CSV</button>
      </div>
    </div>
  )
}
