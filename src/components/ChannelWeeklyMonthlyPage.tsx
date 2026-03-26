'use client'

import React, { useState, useMemo, useCallback } from 'react'
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts'
import { channelWeeklyData, channelAttributionData } from '@/data/dashboardData'
import type { ChannelWeeklyRow, ChannelAttributionWeek } from '@/data/dashboardData'
import TableDatePicker from './TableDatePicker'
import type { DateOption, DatePreset } from './TableDatePicker'

const weekLabelMap: Record<string, string> = {
  '12/15': 'Dec 15', '12/22': 'Dec 22', '12/29': 'Dec 29',
  '1/5': 'Jan 05', '1/12': 'Jan 12', '1/19': 'Jan 19', '1/26': 'Jan 26',
  '2/2': 'Feb 02', '2/9': 'Feb 09', '2/16': 'Feb 16', '2/23': 'Feb 23',
  '3/2': 'Mar 02', '3/9': 'Mar 09', '3/16': 'Mar 16',
}

const weekOptions: DateOption[] = Object.keys(weekLabelMap).map(k => ({ value: k, label: weekLabelMap[k] }))

const weeklyPresets: DatePreset[] = [
  { label: 'Last 4 Weeks', range: ['2/16', '3/16'] },
  { label: 'Last 8 Weeks', range: ['1/19', '3/16'] },
  { label: 'All Weeks', range: ['12/15', '3/16'] },
]

const channelTabs = ['Meta', 'Google', 'Applovin', 'Bing', 'Pinterest', 'Tiktok', 'Amazon']

// Row definitions grouped by category
interface RowDef {
  key: keyof ChannelWeeklyRow
  label: string
  group: string
  format: (v: number) => string
  higherIsBetter: boolean
}

const rowDefs: RowDef[] = [
  { key: 'spend', label: 'Spend', group: 'Metrics', format: v => `$${v.toLocaleString()}`, higherIsBetter: false },
  { key: 'reach', label: 'Reach', group: 'Metrics', format: v => v.toLocaleString(), higherIsBetter: true },
  { key: 'impressions', label: 'Impressions', group: 'Metrics', format: v => v.toLocaleString(), higherIsBetter: true },
  { key: 'clicks', label: 'Clicks', group: 'Metrics', format: v => v.toLocaleString(), higherIsBetter: true },
  { key: 'purchases', label: 'Purchases', group: 'Metrics', format: v => v.toLocaleString(), higherIsBetter: true },
  { key: 'revenue', label: 'Revenue', group: 'Metrics', format: v => `$${v.toLocaleString()}`, higherIsBetter: true },
  { key: 'cpr', label: 'CPR', group: 'Reach', format: v => `$${v}`, higherIsBetter: false },
  { key: 'cpm', label: 'CPM', group: 'Reach', format: v => `$${v}`, higherIsBetter: false },
  { key: 'frequency', label: 'Frequency', group: 'Reach', format: v => v.toFixed(2), higherIsBetter: true },
  { key: 'cpc', label: 'CPC', group: 'Engagement', format: v => `$${v.toFixed(2)}`, higherIsBetter: false },
  { key: 'ctr', label: 'CTR', group: 'Engagement', format: v => `${v}%`, higherIsBetter: true },
  { key: 'cvr', label: 'CVR', group: 'Conversion', format: v => `${v}%`, higherIsBetter: true },
  { key: 'cpa', label: 'CPA', group: 'Conversion', format: v => `$${v}`, higherIsBetter: false },
  { key: 'hcpa', label: 'hCPA', group: 'Conversion', format: v => `$${v}`, higherIsBetter: false },
  { key: 'roas', label: 'ROAS', group: 'Conversion', format: v => `${v}%`, higherIsBetter: true },
  { key: 'hroas', label: 'hROAS', group: 'Conversion', format: v => `${v}%`, higherIsBetter: true },
  { key: 'aov', label: 'AOV', group: 'Conversion', format: v => `$${v}`, higherIsBetter: true },
]

const groups = ['Metrics', 'Reach', 'Engagement', 'Conversion']

function getHeatmapColor(value: number, min: number, max: number, higherIsBetter: boolean): string {
  if (min === max) return 'transparent'
  const normalized = (value - min) / (max - min)
  const t = higherIsBetter ? normalized : 1 - normalized
  if (t <= 0.5) {
    const r = 224 + (250 - 224) * (t / 0.5)
    const g = 122 + (200 - 122) * (t / 0.5)
    const b = 95 + (100 - 95) * (t / 0.5)
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 0.35)`
  } else {
    const r = 250 + (92 - 250) * ((t - 0.5) / 0.5)
    const g = 200 + (201 - 200) * ((t - 0.5) / 0.5)
    const b = 100 + (196 - 100) * ((t - 0.5) / 0.5)
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 0.35)`
  }
}

// ========== ATTRIBUTION CHART ==========
function AttributionChart({ data, period }: { data: ChannelAttributionWeek[]; period: string }) {
  return (
    <div className="bg-white rounded-lg border border-cream-dark p-4 mb-4">
      <div className="mb-1">
        <h3 className="text-sm font-bold text-gray-800">Conversions by Attribution Window</h3>
        <p className="text-[10px] text-gray-400">Breakdown of conversions by days to convert · Faded weeks have an incomplete 28-day attribution window</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0ece6" />
          <XAxis dataKey="week" tick={{ fontSize: 10 }} />
          <YAxis yAxisId="left" tick={{ fontSize: 9 }} tickFormatter={(v: number) => `${v}%`} domain={[0, 100]} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 9 }} tickFormatter={(v: number) => `${v}%`} domain={[0, 100]} />
          <Tooltip formatter={(value: number, name: string) => [`${value}%`, name]} />
          <Legend wrapperStyle={{ fontSize: 10 }} />
          <Bar dataKey="oneDC" name="1DC" stackId="attr" yAxisId="left" fill="#5cc9c4" />
          <Bar dataKey="days2to7" name="Days 2-7" stackId="attr" yAxisId="left" fill="#8a7d5a" />
          <Bar dataKey="days8to28" name="Days 8-28" stackId="attr" yAxisId="left" fill="#c9a0b0" />
          <Line dataKey="upliftRatio" name="Uplift Ratio" yAxisId="right" stroke="#e07a5f" strokeWidth={2} dot={{ r: 3 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

// ========== MAIN HEATMAP TABLE ==========
function WeeklyHeatmapTable({ data }: { data: ChannelWeeklyRow[] }) {
  const [selected, setSelected] = useState<string[]>([])

  const handleCheckbox = useCallback((ws: string) => {
    setSelected(prev => {
      if (prev.includes(ws)) return prev.filter(w => w !== ws)
      if (prev.length >= 2) return [prev[1], ws]
      return [...prev, ws]
    })
  }, [])

  // Compare last two columns by default or selected
  const [compareNew, compareOld] = useMemo(() => {
    if (selected.length === 2) {
      const idxA = data.findIndex(d => d.weekStart === selected[0])
      const idxB = data.findIndex(d => d.weekStart === selected[1])
      return idxA < idxB ? [data[idxB], data[idxA]] : [data[idxA], data[idxB]]
    }
    if (data.length >= 2) return [data[data.length - 1], data[data.length - 2]]
    return [null, null]
  }, [selected, data])

  const compareLabel = compareNew && compareOld
    ? `${compareNew.weekStart} vs ${compareOld.weekStart}`
    : ''

  const compareData = useMemo(() => {
    if (!compareNew || !compareOld) return null
    const result: Record<string, number> = {}
    for (const row of rowDefs) {
      const nv = compareNew[row.key] as number
      const ov = compareOld[row.key] as number
      result[row.key] = ov !== 0 ? parseFloat(((nv - ov) / Math.abs(ov) * 100).toFixed(1)) : 0
    }
    return result
  }, [compareNew, compareOld])

  // Min/max per row
  const ranges = useMemo(() => {
    const r: Record<string, { min: number; max: number }> = {}
    for (const row of rowDefs) {
      const vals = data.map(w => w[row.key] as number)
      r[row.key] = { min: Math.min(...vals), max: Math.max(...vals) }
    }
    return r
  }, [data])

  const groupedRows = groups.map(g => ({
    group: g,
    rows: rowDefs.filter(r => r.group === g),
  }))

  return (
    <div className="bg-white rounded-lg border border-cream-dark p-4 mb-4">
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-cream-dark">
              <th className="text-left py-2 px-1 font-semibold text-gray-600 w-16 sticky left-0 bg-white z-10"></th>
              <th className="text-left py-2 px-1 font-semibold text-gray-600 w-20 sticky left-16 bg-white z-10"></th>
              {data.map(w => {
                const isChecked = selected.includes(w.weekStart)
                return (
                  <th key={w.weekStart} className="text-center py-2 px-1 font-semibold text-gray-600 whitespace-nowrap">
                    <div className="flex flex-col items-center gap-0.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckbox(w.weekStart)}
                        className="w-3 h-3 accent-sidebar"
                      />
                      <span className={`text-[10px] ${isChecked ? 'text-coral font-bold' : ''}`}>
                        {w.weekStart} {isChecked ? '✓' : ''}
                      </span>
                    </div>
                  </th>
                )
              })}
              <th className="text-center py-2 px-2 font-semibold text-gray-600 whitespace-nowrap border-l border-cream-dark text-[10px]">
                {compareLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {groupedRows.map(({ group, rows }) =>
              rows.map((row, rowIdx) => (
                <tr key={`${group}-${row.key}`} className="border-b border-cream-dark/40">
                  {rowIdx === 0 && (
                    <td
                      rowSpan={rows.length}
                      className="py-1 px-1 font-semibold text-gray-700 align-top border-r border-cream-dark text-[10px] sticky left-0 bg-white z-10"
                    >
                      {group}
                    </td>
                  )}
                  <td className="py-1 px-1 font-medium text-gray-600 whitespace-nowrap text-[10px] sticky left-16 bg-white z-10">
                    {row.label}
                  </td>
                  {data.map(w => {
                    const value = w[row.key] as number
                    const bg = getHeatmapColor(value, ranges[row.key].min, ranges[row.key].max, row.higherIsBetter)
                    return (
                      <td key={w.weekStart} className="py-1 px-1 text-center whitespace-nowrap text-[10px]" style={{ backgroundColor: bg }}>
                        {row.format(value)}
                      </td>
                    )
                  })}
                  <td className="py-1 px-2 text-center whitespace-nowrap font-medium border-l border-cream-dark text-[10px]">
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
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ========== WEEKLY KPIs CHART ==========
function WeeklyKPIsChart({ data, channelName, period }: { data: ChannelWeeklyRow[]; channelName: string; period: string }) {
  const [hidden, setHidden] = useState<Set<string>>(() => {
    const h = new Set<string>()
    // Default: show only spend and CPA
    const allKeys = ['spend','cpm','frequency','cpr','cpc','ctr','cvr','cpa','roas','aov','hcpa','hroas',
      'avgCpm','avgCpc','avgCtr','avgCvr','avgCpa']
    allKeys.forEach(k => { if (k !== 'spend' && k !== 'cpa') h.add(k) })
    return h
  })

  const toggleSeries = (key: string) => {
    setHidden(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const isVisible = (key: string) => !hidden.has(key)

  const chartData = useMemo(() => {
    return data.map((row, idx) => {
      const window = data.slice(Math.max(0, idx - 3), idx + 1)
      return {
        ...row,
        avgCpm: parseFloat((window.reduce((s, r) => s + r.cpm, 0) / window.length).toFixed(1)),
        avgCpc: parseFloat((window.reduce((s, r) => s + r.cpc, 0) / window.length).toFixed(2)),
        avgCtr: parseFloat((window.reduce((s, r) => s + r.ctr, 0) / window.length).toFixed(2)),
        avgCvr: parseFloat((window.reduce((s, r) => s + r.cvr, 0) / window.length).toFixed(2)),
        avgCpa: Math.round(window.reduce((s, r) => s + r.cpa, 0) / window.length),
      }
    })
  }, [data])

  const lines = [
    { dataKey: 'cpm', name: 'CPM', color: '#4267B2' },
    { dataKey: 'avgCpm', name: 'avg CPM', color: '#4267B2', dashed: true },
    { dataKey: 'frequency', name: 'Frequency', color: '#96BF48' },
    { dataKey: 'cpr', name: 'CPR', color: '#8a7d5a' },
    { dataKey: 'avgCpc', name: 'avg CPC', color: '#00809D', dashed: true },
    { dataKey: 'cpc', name: 'CPC', color: '#00809D' },
    { dataKey: 'ctr', name: 'CTR', color: '#34A853' },
    { dataKey: 'avgCtr', name: 'avg CTR', color: '#34A853', dashed: true },
    { dataKey: 'cvr', name: 'CVR', color: '#E60023' },
    { dataKey: 'avgCvr', name: 'avg CVR', color: '#E60023', dashed: true },
    { dataKey: 'cpa', name: 'CPA', color: '#e07a5f' },
    { dataKey: 'avgCpa', name: 'avg CPA', color: '#e07a5f', dashed: true },
    { dataKey: 'roas', name: 'ROAS', color: '#5cc9c4' },
    { dataKey: 'aov', name: 'AOV', color: '#c9a0b0' },
    { dataKey: 'hcpa', name: 'hCPA', color: '#FF6B6B' },
    { dataKey: 'hroas', name: 'hROAS', color: '#4ECDC4' },
  ]

  return (
    <div className="bg-white rounded-lg border border-cream-dark p-4">
      <div className="text-[9px] text-gray-400 mb-1">
        Any metric labeled &quot;avg&quot; is a benchmark average across the <strong>ORCA</strong> platform.
      </div>
      <h3 className="text-sm font-semibold text-gray-800 text-center mb-3">
        {channelName} {period === 'weekly' ? 'Weekly' : 'Monthly'} KPIs
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={chartData} margin={{ top: 5, right: 50, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0ece6" />
          <XAxis dataKey="weekStart" tick={{ fontSize: 9 }} />
          <YAxis yAxisId="left" tick={{ fontSize: 9 }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 9 }} tickFormatter={(v: number) => `$${v}`} />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === 'Spend') return [`$${value.toLocaleString()}`, name]
              if (name.includes('CPA') || name.includes('CPM') || name.includes('CPC') || name === 'AOV' || name === 'CPR') return [`$${value}`, name]
              if (name.includes('CTR') || name.includes('CVR')) return [`${value}%`, name]
              if (name.includes('ROAS')) return [`${value}%`, name]
              return [value, name]
            }}
          />
          <Legend
            onClick={(e) => { const key = e.dataKey as string; if (key) toggleSeries(key) }}
            formatter={(value: string, entry) => (
              <span style={{
                color: hidden.has(entry.dataKey as string) ? '#ccc' : '#333',
                fontSize: 9,
                textDecoration: hidden.has(entry.dataKey as string) ? 'line-through' : 'none',
              }}>{value}</span>
            )}
            wrapperStyle={{ fontSize: 9 }}
          />
          <Bar dataKey="spend" name="Spend" yAxisId="left" fill="#e07a5f" opacity={isVisible('spend') ? 0.7 : 0} hide={!isVisible('spend')} />
          {lines.map(l => (
            <Line
              key={l.dataKey}
              dataKey={l.dataKey}
              name={l.name}
              yAxisId="right"
              stroke={l.color}
              strokeWidth={1.5}
              strokeDasharray={'dashed' in l && l.dashed ? '5 3' : undefined}
              dot={false}
              hide={!isVisible(l.dataKey)}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

// ========== MAIN PAGE ==========
export default function ChannelWeeklyMonthlyPage() {
  const [activeChannel, setActiveChannel] = useState('Meta')
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly')
  const [dateRange, setDateRange] = useState<[string, string]>(['12/15', '3/16'])

  const allWeeklyData = channelWeeklyData[activeChannel] || []
  const attributionData = channelAttributionData[activeChannel] || []

  // Filter weekly data by date range
  const weeklyData = useMemo(() => {
    const startIdx = allWeeklyData.findIndex(d => d.weekStart === dateRange[0])
    const endIdx = allWeeklyData.findIndex(d => d.weekStart === dateRange[1])
    if (startIdx === -1 || endIdx === -1) return allWeeklyData
    return allWeeklyData.slice(startIdx, endIdx + 1)
  }, [allWeeklyData, dateRange])

  // For monthly: aggregate ALL weekly data (not filtered) into months
  const monthNames: Record<string, string> = {
    '2025-12': 'Dec', '2026-01': 'Jan', '2026-02': 'Feb', '2026-03': 'Mar',
  }
  const monthlyData = useMemo(() => {
    if (period !== 'monthly') return []
    const months: Record<string, ChannelWeeklyRow[]> = {}
    allWeeklyData.forEach(w => {
      const parts = w.weekStart.split('/')
      const m = parseInt(parts[0])
      const monthKey = m <= 3 ? `2026-${String(m).padStart(2, '0')}` : `2025-${String(m).padStart(2, '0')}`
      if (!months[monthKey]) months[monthKey] = []
      months[monthKey].push(w)
    })
    return Object.entries(months).sort(([a], [b]) => a.localeCompare(b)).map(([key, weeks]) => {
      const avg = (fn: (w: ChannelWeeklyRow) => number) => weeks.reduce((s, w) => s + fn(w), 0) / weeks.length
      const sum = (fn: (w: ChannelWeeklyRow) => number) => weeks.reduce((s, w) => s + fn(w), 0)
      return {
        weekStart: monthNames[key] || key,
        spend: sum(w => w.spend),
        reach: sum(w => w.reach),
        impressions: sum(w => w.impressions),
        clicks: sum(w => w.clicks),
        purchases: sum(w => w.purchases),
        revenue: sum(w => w.revenue),
        cpr: Math.round(avg(w => w.cpr)),
        cpm: Math.round(avg(w => w.cpm)),
        frequency: parseFloat(avg(w => w.frequency).toFixed(2)),
        cpc: parseFloat(avg(w => w.cpc).toFixed(2)),
        ctr: parseFloat(avg(w => w.ctr).toFixed(2)),
        cvr: parseFloat(avg(w => w.cvr).toFixed(2)),
        cpa: Math.round(avg(w => w.cpa)),
        hcpa: Math.round(avg(w => w.hcpa)),
        roas: Math.round(avg(w => w.roas)),
        hroas: Math.round(avg(w => w.hroas)),
        aov: Math.round(avg(w => w.aov)),
      } as ChannelWeeklyRow
    })
  }, [allWeeklyData, period])

  const activeData = period === 'weekly' ? weeklyData : monthlyData

  // Aggregate attribution data into months when in monthly mode
  const activeAttributionData = useMemo(() => {
    if (period !== 'monthly') return attributionData
    const months: Record<string, ChannelAttributionWeek[]> = {}
    attributionData.forEach(a => {
      const m = parseInt(a.week.split('/')[0])
      const monthKey = m <= 3 ? `2026-${String(m).padStart(2, '0')}` : `2025-${String(m).padStart(2, '0')}`
      if (!months[monthKey]) months[monthKey] = []
      months[monthKey].push(a)
    })
    return Object.entries(months).sort(([a], [b]) => a.localeCompare(b)).map(([key, weeks]) => {
      const avg = (fn: (w: ChannelAttributionWeek) => number) => weeks.reduce((s, w) => s + fn(w), 0) / weeks.length
      return {
        week: monthNames[key] || key,
        oneDC: parseFloat(avg(w => w.oneDC).toFixed(1)),
        days2to7: parseFloat(avg(w => w.days2to7).toFixed(1)),
        days8to28: parseFloat(avg(w => w.days8to28).toFixed(1)),
        upliftRatio: parseFloat(avg(w => w.upliftRatio).toFixed(1)),
      } as ChannelAttributionWeek
    })
  }, [attributionData, period])

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Channel Overview</h2>
        <TableDatePicker
          options={weekOptions}
          selectedRange={dateRange}
          onRangeChange={setDateRange}
          presets={weeklyPresets}
        />
      </div>

      {/* Channel tabs */}
      <div className="flex items-center gap-4">
        <div className="flex gap-1">
          {channelTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveChannel(tab)}
              className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                activeChannel === tab
                  ? 'bg-sidebar text-white'
                  : 'bg-white text-gray-600 border border-cream-dark hover:bg-cream'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Weekly / Monthly toggle */}
      <div className="flex gap-1">
        <button
          onClick={() => setPeriod('weekly')}
          className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
            period === 'weekly'
              ? 'bg-coral text-white'
              : 'bg-white text-gray-600 border border-cream-dark hover:bg-cream'
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => setPeriod('monthly')}
          className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
            period === 'monthly'
              ? 'bg-coral text-white'
              : 'bg-white text-gray-600 border border-cream-dark hover:bg-cream'
          }`}
        >
          Monthly
        </button>
      </div>

      {/* Attribution Chart */}
      <AttributionChart data={activeAttributionData} period={period} />

      {/* Main Heatmap Table */}
      <WeeklyHeatmapTable data={activeData} />

      {/* Weekly/Monthly KPIs Chart */}
      <WeeklyKPIsChart data={activeData} channelName={activeChannel} period={period} />
    </div>
  )
}
