'use client'

import { useState, useMemo, useCallback } from 'react'
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Treemap
} from 'recharts'
import { attributionMonthlyData, paidOrganicReturnData, revenueByChannelData } from '@/data/dashboardData'
import type { AttributionMonthRow } from '@/data/dashboardData'
import TableDatePicker from './TableDatePicker'
import type { DateOption, DatePreset } from './TableDatePicker'

// Row definitions
interface RowDef {
  key: keyof AttributionMonthRow
  label: string
  group: string
  format: (v: number) => string
  higherIsBetter: boolean
}

const rowDefs: RowDef[] = [
  // Biz Metrics
  { key: 'spend', label: 'Spend', group: 'Biz Metrics', format: v => `$${v.toLocaleString()}`, higherIsBetter: false },
  { key: 'newOrders', label: 'New Orders', group: 'Biz Metrics', format: v => v.toLocaleString(), higherIsBetter: true },
  { key: 'newRevenue', label: 'New Revenue', group: 'Biz Metrics', format: v => `$${v.toLocaleString()}`, higherIsBetter: true },
  { key: 'cac', label: 'CAC', group: 'Biz Metrics', format: v => `$${v}`, higherIsBetter: false },
  { key: 'roas', label: 'ROAS', group: 'Biz Metrics', format: v => `${v}%`, higherIsBetter: true },
  // Channel Spend
  { key: 'metaSpend', label: 'Meta Spend', group: 'Channel Spend', format: v => `$${v.toLocaleString()}`, higherIsBetter: false },
  { key: 'applovinSpend', label: 'Applovin Spend', group: 'Channel Spend', format: v => v === 0 ? '$0' : `$${v.toLocaleString()}`, higherIsBetter: false },
  { key: 'googleSpend', label: 'Google Spend', group: 'Channel Spend', format: v => `$${v.toLocaleString()}`, higherIsBetter: false },
  { key: 'pinterestSpend', label: 'Pinterest Spend', group: 'Channel Spend', format: v => `$${v.toLocaleString()}`, higherIsBetter: false },
  { key: 'tiktokSpend', label: 'Tiktok Spend', group: 'Channel Spend', format: v => `$${v.toLocaleString()}`, higherIsBetter: false },
  { key: 'youtubeSpend', label: 'Youtube Spend', group: 'Channel Spend', format: v => `$${v.toLocaleString()}`, higherIsBetter: false },
  // Channel hCPA
  { key: 'metaHcpa', label: 'Meta hCPA', group: 'Channel hCPA', format: v => `$${v}`, higherIsBetter: false },
  { key: 'applovinHcpa', label: 'Applovin hCPA', group: 'Channel hCPA', format: v => v === 0 ? '$0' : `$${v.toLocaleString()}`, higherIsBetter: false },
  { key: 'googleHcpa', label: 'Google hCPA', group: 'Channel hCPA', format: v => `$${v}`, higherIsBetter: false },
  { key: 'pinterestHcpa', label: 'Pinterest hCPA', group: 'Channel hCPA', format: v => `$${v}`, higherIsBetter: false },
  { key: 'tiktokHcpa', label: 'Tiktok hCPA', group: 'Channel hCPA', format: v => `$${v.toLocaleString()}`, higherIsBetter: false },
  { key: 'youtubeHcpa', label: 'Youtube hCPA', group: 'Channel hCPA', format: v => `$${v.toLocaleString()}`, higherIsBetter: false },
  // Channel hROAS
  { key: 'metaHroas', label: 'Meta hROAS', group: 'Channel hROAS', format: v => `${v}%`, higherIsBetter: true },
  { key: 'applovinHroas', label: 'Applovin hROAS', group: 'Channel hROAS', format: v => `${v}%`, higherIsBetter: true },
  { key: 'googleHroas', label: 'Google hROAS', group: 'Channel hROAS', format: v => `${v}%`, higherIsBetter: true },
  { key: 'pinterestHroas', label: 'Pinterest hROAS', group: 'Channel hROAS', format: v => `${v}%`, higherIsBetter: true },
  { key: 'tiktokHroas', label: 'Tiktok hROAS', group: 'Channel hROAS', format: v => `${v}%`, higherIsBetter: true },
  { key: 'youtubeHroas', label: 'Youtube hROAS', group: 'Channel hROAS', format: v => `${v}%`, higherIsBetter: true },
]

const groups = ['Biz Metrics', 'Channel Spend', 'Channel hCPA', 'Channel hROAS']

// Heatmap color function
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

// Date options
const monthOptions: DateOption[] = attributionMonthlyData.map(d => ({ value: d.month, label: d.month }))
const datePresets: DatePreset[] = [
  { label: 'Last 6 Months', range: [attributionMonthlyData[Math.max(0, attributionMonthlyData.length - 6)].month, attributionMonthlyData[attributionMonthlyData.length - 1].month] },
  { label: 'Last 12 Months', range: [attributionMonthlyData[0].month, attributionMonthlyData[attributionMonthlyData.length - 1].month] },
  { label: 'YTD 2026', range: ['Jan 2026', 'Mar 2026'] },
]

const subTabs = ['Channel Overview', 'Paid, Organic & Return', 'HDYHAU'] as const

// ========== PAID, ORGANIC & RETURN TAB ==========
function PaidOrganicReturnTab() {
  const [hidden, setHidden] = useState<Set<string>>(new Set())
  const toggleSeries = (key: string) => {
    setHidden(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }
  const isVisible = (key: string) => !hidden.has(key)

  // Revenue breakdown for the bottom visualization
  const totalNewPaid = revenueByChannelData.reduce((s, c) => s + c.newPaidRevenue, 0)
  const totalNewOrganic = revenueByChannelData.reduce((s, c) => s + c.newOrganicRevenue, 0)
  const totalReturn = revenueByChannelData.reduce((s, c) => s + c.returnRevenue, 0)
  const totalRevenue = totalNewPaid + totalNewOrganic + totalReturn
  const newRevenue = totalNewPaid + totalNewOrganic

  return (
    <div className="space-y-4">
      {/* Stacked Bar + Line Chart */}
      <div className="bg-white rounded-lg border border-cream-dark p-4">
        <h3 className="text-sm font-bold text-gray-800 text-center mb-3">Paid, Organic, and Return Revenue (Weekly)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={paidOrganicReturnData} margin={{ top: 10, right: 40, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0ece6" />
            <XAxis dataKey="week" tick={{ fontSize: 10 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 9 }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 9 }} tickFormatter={(v: number) => `${v}%`} />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === 'Paid ROAS') return [`${value}%`, name]
                return [`$${value.toLocaleString()}`, name]
              }}
            />
            <Legend
              onClick={(e) => toggleSeries(e.dataKey as string)}
              formatter={(value: string, entry) => (
                <span style={{
                  color: hidden.has(entry.dataKey as string) ? '#ccc' : '#333',
                  fontSize: 10,
                  textDecoration: hidden.has(entry.dataKey as string) ? 'line-through' : 'none',
                }}>
                  {value}
                </span>
              )}
              wrapperStyle={{ fontSize: 10 }}
            />
            <Bar dataKey="newPaidRevenue" name="New Paid Revenue" stackId="rev" yAxisId="left" fill="#c9a0b0" hide={!isVisible('newPaidRevenue')}
              label={{ position: 'top', fontSize: 8, formatter: (v: number) => `$${(v / 1000).toFixed(0)}k` }} />
            <Bar dataKey="newOrganicRevenue" name="New Organic Revenue" stackId="rev" yAxisId="left" fill="#5cc9c4" hide={!isVisible('newOrganicRevenue')} />
            <Bar dataKey="returnRevenue" name="Return Revenue" stackId="rev" yAxisId="left" fill="#e07a5f" hide={!isVisible('returnRevenue')} />
            <Line dataKey="spend" name="Spend" yAxisId="left" stroke="#2d2a26" strokeWidth={2} dot={{ r: 3 }} hide={!isVisible('spend')} />
            <Line dataKey="paidRoas" name="Paid ROAS" yAxisId="right" stroke="#e07a5f" strokeWidth={2} dot={{ r: 3, fill: '#e07a5f' }} hide={!isVisible('paidRoas')} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue by Channel - Simplified stacked horizontal bars */}
      <div className="bg-white rounded-lg border border-cream-dark p-4">
        <h3 className="text-sm font-bold text-gray-800 text-center mb-4">Revenue by Channel (Weekly)</h3>
        <div className="space-y-3">
          {/* Left side: Channel breakdown */}
          <div className="flex gap-4">
            {/* Sources */}
            <div className="flex-1">
              <div className="text-[10px] text-gray-500 font-medium mb-2">Source Channels</div>
              {revenueByChannelData.filter(c => c.newPaidRevenue > 0 || c.newOrganicRevenue > 0).map(ch => {
                const total = ch.newPaidRevenue + ch.newOrganicRevenue + ch.returnRevenue
                const pct = ((total / totalRevenue) * 100).toFixed(1)
                return (
                  <div key={ch.channel} className="flex items-center gap-2 mb-1.5">
                    <div className="w-28 text-[10px] text-gray-600 truncate">{ch.channel}</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden flex">
                      {ch.newPaidRevenue > 0 && (
                        <div style={{ width: `${(ch.newPaidRevenue / totalRevenue) * 100}%`, backgroundColor: ch.color }} className="h-full" />
                      )}
                      {ch.newOrganicRevenue > 0 && (
                        <div style={{ width: `${(ch.newOrganicRevenue / totalRevenue) * 100}%`, backgroundColor: ch.color }} className="h-full" />
                      )}
                      {ch.returnRevenue > 0 && (
                        <div style={{ width: `${(ch.returnRevenue / totalRevenue) * 100}%`, backgroundColor: '#e07a5f', opacity: 0.6 }} className="h-full" />
                      )}
                    </div>
                    <span className="text-[10px] text-gray-500 w-12 text-right">{pct}%</span>
                  </div>
                )
              })}
            </div>

            {/* Summary */}
            <div className="w-64 space-y-2">
              <div className="text-[10px] text-gray-500 font-medium mb-2">Revenue Breakdown</div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#c9a0b0' }} />
                <span className="text-[10px] text-gray-600 flex-1">New Paid</span>
                <span className="text-xs font-medium">${(totalNewPaid / 1000).toFixed(0)}k</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#5cc9c4' }} />
                <span className="text-[10px] text-gray-600 flex-1">New Organic</span>
                <span className="text-xs font-medium">${(totalNewOrganic / 1000).toFixed(0)}k</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#e07a5f' }} />
                <span className="text-[10px] text-gray-600 flex-1">Return Revenue</span>
                <span className="text-xs font-medium">${(totalReturn / 1000).toFixed(0)}k</span>
              </div>
              <div className="border-t border-cream-dark pt-1 mt-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-sidebar" />
                  <span className="text-[10px] text-gray-600 flex-1">New Revenue</span>
                  <span className="text-xs font-bold">${(newRevenue / 1000).toFixed(0)}k</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#4267B2' }} />
                  <span className="text-[10px] text-gray-600 flex-1">Total Revenue</span>
                  <span className="text-xs font-bold">${(totalRevenue / 1000).toFixed(0)}k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal stacked summary bars */}
          <div className="space-y-1 pt-2 border-t border-cream-dark">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500 w-20">New Revenue</span>
              <div className="flex-1 h-6 rounded overflow-hidden flex">
                <div style={{ width: `${(totalNewPaid / (totalNewPaid + totalNewOrganic)) * 100}%` }} className="h-full bg-[#c9a0b0]" />
                <div style={{ width: `${(totalNewOrganic / (totalNewPaid + totalNewOrganic)) * 100}%` }} className="h-full bg-[#5cc9c4]" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500 w-20">Total Revenue</span>
              <div className="flex-1 h-6 rounded overflow-hidden flex">
                <div style={{ width: `${(newRevenue / totalRevenue) * 100}%` }} className="h-full bg-[#e07a5f]" />
                <div style={{ width: `${(totalReturn / totalRevenue) * 100}%` }} className="h-full bg-[#4267B2]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DeepDivesAttributionPage() {
  const [activeSubTab, setActiveSubTab] = useState<string>('Channel Overview')
  const [dateRange, setDateRange] = useState<[string, string]>([
    attributionMonthlyData[0].month,
    attributionMonthlyData[attributionMonthlyData.length - 1].month,
  ])
  const [selected, setSelected] = useState<string[]>([])

  // Filter data by date range
  const data = useMemo(() => {
    const startIdx = attributionMonthlyData.findIndex(d => d.month === dateRange[0])
    const endIdx = attributionMonthlyData.findIndex(d => d.month === dateRange[1])
    if (startIdx === -1 || endIdx === -1) return attributionMonthlyData
    return attributionMonthlyData.slice(startIdx, endIdx + 1)
  }, [dateRange])

  const handleCheckbox = useCallback((month: string) => {
    setSelected(prev => {
      if (prev.includes(month)) return prev.filter(m => m !== month)
      if (prev.length >= 2) return [prev[1], month]
      return [...prev, month]
    })
  }, [])

  // Ranges for heatmap
  const ranges = useMemo(() => {
    const r: Record<string, { min: number; max: number }> = {}
    for (const row of rowDefs) {
      const values = data.map(d => d[row.key] as number).filter(v => v > 0) // exclude 0s
      if (values.length === 0) {
        r[row.key] = { min: 0, max: 0 }
      } else {
        r[row.key] = { min: Math.min(...values), max: Math.max(...values) }
      }
    }
    return r
  }, [data])

  // Group rows
  const groupedRows = groups.map(g => ({
    group: g,
    rows: rowDefs.filter(r => r.group === g),
  }))

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Attribution</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs px-3 py-1 rounded border border-cream-dark bg-white text-gray-600 font-medium">Monthly</span>
          <TableDatePicker
            options={monthOptions}
            selectedRange={dateRange}
            onRangeChange={setDateRange}
            presets={datePresets}
          />
          <button className="text-xs text-gray-500 hover:text-gray-700">Reset</button>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1">
        {subTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              activeSubTab === tab
                ? 'border-b-2 border-sidebar text-gray-800'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Channel Overview Tab */}
      {activeSubTab === 'Channel Overview' && (
        <div className="bg-white rounded-lg border border-cream-dark p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-cream-dark">
                  <th className="text-left py-2 px-2 font-semibold text-gray-600 w-20 sticky left-0 bg-white z-10"></th>
                  <th className="text-left py-2 px-2 font-semibold text-gray-600 w-28 sticky left-20 bg-white z-10"></th>
                  {data.map(d => (
                    <th key={d.month} className="text-center py-2 px-2 font-semibold text-gray-600 whitespace-nowrap min-w-[90px]">
                      <div className="flex flex-col items-center gap-1">
                        <input
                          type="checkbox"
                          checked={selected.includes(d.month)}
                          onChange={() => handleCheckbox(d.month)}
                          className="w-3 h-3 accent-sidebar"
                        />
                        <span className={selected.includes(d.month) ? 'text-coral font-bold' : ''}>
                          {d.month}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groupedRows.map(({ group, rows }) => (
                  rows.map((row, rowIdx) => (
                    <tr key={row.key} className={`border-b ${rowIdx === 0 && group !== 'Biz Metrics' ? 'border-t-2 border-cream-dark' : 'border-cream-dark/50'}`}>
                      {rowIdx === 0 && (
                        <td
                          rowSpan={rows.length}
                          className="py-1.5 px-2 font-semibold text-gray-700 align-top border-r border-cream-dark sticky left-0 bg-white z-10 text-[10px]"
                        >
                          {group}
                        </td>
                      )}
                      <td className="py-1.5 px-2 font-medium text-gray-600 whitespace-nowrap sticky left-20 bg-white z-10">
                        {row.label}
                      </td>
                      {data.map(d => {
                        const value = d[row.key] as number
                        const bg = value === 0 ? 'transparent' : getHeatmapColor(value, ranges[row.key].min, ranges[row.key].max, row.higherIsBetter)
                        return (
                          <td
                            key={d.month}
                            className="py-1.5 px-2 text-center whitespace-nowrap"
                            style={{ backgroundColor: bg }}
                          >
                            {row.format(value)}
                          </td>
                        )
                      })}
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-3 pt-2 border-t border-cream-dark/50">
            <button className="text-xs text-gray-500 hover:text-gray-700">Export to CSV</button>
          </div>
        </div>
      )}

      {/* Paid, Organic & Return Tab */}
      {activeSubTab === 'Paid, Organic & Return' && (
        <PaidOrganicReturnTab />
      )}

      {/* HDYHAU Tab */}
      {activeSubTab === 'HDYHAU' && (
        <div className="bg-white rounded-lg border border-cream-dark p-4 text-center text-gray-400 py-20">
          <p className="text-sm">HDYHAU (How Did You Hear About Us) — Coming Soon</p>
        </div>
      )}
    </div>
  )
}
