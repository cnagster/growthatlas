'use client'

import { useState, useMemo } from 'react'
import { monthlyTargetsData, monthlyActualsData } from '@/data/dashboardData'
import type { MonthlyTarget } from '@/data/dashboardData'

interface RowDef {
  key: keyof MonthlyTarget
  label: string
  group: string
  format: (v: number) => string
}

const rows: RowDef[] = [
  { key: 'spend', label: 'Spend', group: 'New', format: v => `$${v.toLocaleString()}` },
  { key: 'newCount', label: 'Count', group: 'New', format: v => v.toLocaleString() },
  { key: 'newRevenue', label: 'Revenue', group: 'New', format: v => `$${v.toLocaleString()}` },
  { key: 'newCac', label: 'CAC', group: 'New', format: v => `$${v}` },
  { key: 'newRoas', label: 'ROAS', group: 'New', format: v => `${v}%` },
  { key: 'newAov', label: 'AOV', group: 'New', format: v => `$${v}` },
  { key: 'acos', label: 'ACOS', group: 'New', format: v => `${v}%` },
  { key: 'returnCount', label: 'Count', group: 'Return', format: v => v.toLocaleString() },
  { key: 'returnRevenue', label: 'Revenue', group: 'Return', format: v => `$${v.toLocaleString()}` },
  { key: 'totalCount', label: 'Count', group: 'Total', format: v => v.toLocaleString() },
  { key: 'totalRevenue', label: 'Revenue', group: 'Total', format: v => `$${v.toLocaleString()}` },
  { key: 'bRoas', label: 'bROAS', group: 'Total', format: v => `${v}%` },
]

function getTargetHeatmapColor(pctFromTarget: number): string {
  if (pctFromTarget >= 0) {
    const t = Math.min(pctFromTarget / 20, 1)
    return `rgba(92, 201, 196, ${0.15 + t * 0.2})`
  } else {
    const t = Math.min(Math.abs(pctFromTarget) / 30, 1)
    if (t < 0.5) {
      return `rgba(250, 200, 100, ${0.2 + t * 0.3})`
    }
    return `rgba(224, 122, 95, ${0.15 + (t - 0.5) * 0.3})`
  }
}

interface MonthlyTargetsTableProps {
  dateRange: [string, string]
}

export default function MonthlyTargetsTable({ dateRange }: MonthlyTargetsTableProps) {
  const [mode, setMode] = useState<'values' | 'pctFromTarget'>('values')
  const allTargets = monthlyTargetsData
  const actuals = monthlyActualsData

  // Filter targets by date range
  const targets = useMemo(() => {
    const startIdx = allTargets.findIndex(t => t.month === dateRange[0])
    const endIdx = allTargets.findIndex(t => t.month === dateRange[1])
    if (startIdx === -1 || endIdx === -1) return allTargets
    return allTargets.slice(startIdx, endIdx + 1)
  }, [allTargets, dateRange])

  const actualsMap = useMemo(() => {
    const m: Record<string, typeof actuals[number]> = {}
    actuals.forEach(a => { m[a.month] = a })
    return m
  }, [actuals])

  const targetToActualKey: Record<string, string> = {
    spend: 'spend',
    newCount: 'newCount',
    newRevenue: 'newRevenue',
    newCac: 'newCac',
    newRoas: 'newRoas',
    newAov: 'newAov',
    acos: 'acos',
    returnCount: 'returnCount',
    returnRevenue: 'returnRevenue',
    totalCount: 'totalCount',
    totalRevenue: 'totalRevenue',
    bRoas: 'bRoas',
  }

  const conditionalKeys = new Set(['spend', 'newCac', 'newRevenue', 'returnRevenue', 'totalRevenue'])

  const groups = ['New', 'Return', 'Total']
  const groupedRows = groups.map(g => ({
    group: g,
    rows: rows.filter(r => r.group === g),
  }))

  const getPctFromTarget = (targetKey: string, targetVal: number, month: string): number | null => {
    const actual = actualsMap[month]
    if (!actual || targetVal === 0) return null
    const actualKey = targetToActualKey[targetKey]
    if (!actualKey) return null
    const actualVal = actual[actualKey as keyof typeof actual] as number
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
                <th key={t.month} className="text-center py-2 px-2 font-semibold text-gray-600 whitespace-nowrap">
                  {t.month}
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
                        const pctVal = getPctFromTarget(row.key, targetVal, t.month)
                        if (pctVal !== null) {
                          const isLowerBetter = row.key === 'spend' || row.key === 'newCac'
                          const adjustedPct = isLowerBetter ? -pctVal : pctVal
                          valueBg = getTargetHeatmapColor(adjustedPct)
                        }
                      }
                      return (
                        <td key={t.month} className="py-1.5 px-2 text-center whitespace-nowrap" style={{ backgroundColor: valueBg }}>
                          {row.format(targetVal)}
                        </td>
                      )
                    }

                    const pct = getPctFromTarget(row.key, targetVal, t.month)
                    const bg = pct !== null ? getTargetHeatmapColor(pct) : 'transparent'
                    return (
                      <td
                        key={t.month}
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
