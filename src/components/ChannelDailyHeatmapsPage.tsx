'use client'

import React, { useState, useMemo } from 'react'
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts'
import { ChevronRight, ChevronDown, Search } from 'lucide-react'
import { channelHeatmapData, channelBreakoutData } from '@/data/dashboardData'
import type { ChannelDailyHeatmapRow, BreakoutCampaign, BreakoutMetrics } from '@/data/dashboardData'
import TableDatePicker from './TableDatePicker'
import type { DateOption, DatePreset } from './TableDatePicker'

const channelTabs = ['Meta', 'Google', 'Applovin', 'Bing', 'Pinterest', 'Tiktok', 'Amazon']

const columns: {
  key: keyof ChannelDailyHeatmapRow
  label: string
  format: (v: number) => string
  higherIsBetter: boolean
}[] = [
  { key: 'spend', label: 'Spend', format: v => `$${v.toLocaleString()}`, higherIsBetter: false },
  { key: 'cpr', label: 'CPR', format: v => `$${v}`, higherIsBetter: false },
  { key: 'cpm', label: 'CPM', format: v => `$${v}`, higherIsBetter: false },
  { key: 'freq', label: 'Freq', format: v => v.toFixed(2), higherIsBetter: true },
  { key: 'ctr', label: 'CTR', format: v => `${v}%`, higherIsBetter: true },
  { key: 'cpc', label: 'CPC', format: v => `$${v}`, higherIsBetter: false },
  { key: 'cvr', label: 'CVR', format: v => `${v}%`, higherIsBetter: true },
  { key: 'cpa', label: 'CPA', format: v => `$${v}`, higherIsBetter: false },
  { key: 'hcpa', label: 'hCPA', format: v => v > 0 ? `$${v}` : '-', higherIsBetter: false },
  { key: 'roas', label: 'ROAS', format: v => `${v}%`, higherIsBetter: true },
  { key: 'hroas', label: 'hROAS', format: v => v > 0 ? `${v}%` : '-', higherIsBetter: true },
  { key: 'aov', label: 'AOV', format: v => `$${v}`, higherIsBetter: true },
]

// Averages summary columns (subset)
const avgColumns: { key: keyof ChannelDailyHeatmapRow; label: string; format: (v: number) => string }[] = [
  { key: 'spend', label: 'Spend', format: v => `$${v.toLocaleString()}` },
  { key: 'cpm', label: 'CPM', format: v => `$${v.toFixed(2)}` },
  { key: 'cpc', label: 'CPC', format: v => `$${v.toFixed(2)}` },
  { key: 'ctr', label: 'CTR', format: v => `${v.toFixed(2)}%` },
  { key: 'cvr', label: 'CVR', format: v => `${v.toFixed(2)}%` },
  { key: 'cpa', label: 'CPA', format: v => `$${v.toFixed(2)}` },
  { key: 'roas', label: 'ROAS', format: v => `${Math.round(v)}%` },
  { key: 'aov', label: 'AOV', format: v => `$${v.toFixed(2)}` },
]

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

function computeAvg(data: ChannelDailyHeatmapRow[], days: number) {
  const slice = data.slice(0, days)
  const result: Record<string, number> = {}
  for (const col of avgColumns) {
    const sum = slice.reduce((s, r) => s + (r[col.key] as number), 0)
    result[col.key] = sum / slice.length
  }
  return result
}

// ========== AVERAGES TABLE ==========
function AveragesTable({ data }: { data: ChannelDailyHeatmapRow[] }) {
  const avg7 = useMemo(() => computeAvg(data, 7), [data])
  const avg21 = useMemo(() => computeAvg(data, 21), [data])

  return (
    <div className="bg-cream/50 rounded-lg border border-cream-dark p-3 mb-4">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-cream-dark">
            <th className="text-left py-1.5 px-2 font-semibold text-gray-600 w-24">Average</th>
            {avgColumns.map(col => (
              <th key={col.key} className="text-right py-1.5 px-2 font-semibold text-gray-600">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-cream-dark/50">
            <td className="py-1.5 px-2 font-medium text-gray-700">7 days</td>
            {avgColumns.map(col => (
              <td key={col.key} className="py-1.5 px-2 text-right">{col.format(avg7[col.key])}</td>
            ))}
          </tr>
          <tr>
            <td className="py-1.5 px-2 font-medium text-gray-700">21 days</td>
            {avgColumns.map(col => (
              <td key={col.key} className="py-1.5 px-2 text-right">{col.format(avg21[col.key])}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end mt-1">
        <button className="text-xs text-gray-500 hover:text-gray-700">Export to CSV</button>
      </div>
    </div>
  )
}

// ========== MAIN HEATMAP TABLE ==========
function HeatmapTable({ data }: { data: ChannelDailyHeatmapRow[] }) {
  const [showFilters, setShowFilters] = useState(false)

  const ranges = useMemo(() => {
    const r: Record<string, { min: number; max: number }> = {}
    for (const col of columns) {
      const vals = data.map(row => row[col.key] as number).filter(v => v > 0)
      r[col.key] = { min: Math.min(...vals), max: Math.max(...vals) }
    }
    return r
  }, [data])

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-xs px-3 py-1 rounded border border-cream-dark bg-cream text-gray-700 hover:bg-cream-dark"
        >
          ▽ Show Filters
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-cream-dark bg-cream/30">
              <th className="text-left py-2 px-2 font-bold text-gray-700 whitespace-nowrap sticky left-0 bg-cream/80 z-10">Date</th>
              {columns.map(col => (
                <th key={col.key} className="text-center py-2 px-2 font-bold text-gray-700 whitespace-nowrap">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={row.date} className={`border-b border-cream-dark/40 ${idx % 2 === 0 ? '' : 'bg-cream/20'}`}>
                <td className="py-1.5 px-2 font-medium text-gray-700 whitespace-nowrap sticky left-0 bg-white z-10">
                  {row.date}
                </td>
                {columns.map(col => {
                  const value = row[col.key] as number
                  const bg = value > 0 ? getHeatmapColor(value, ranges[col.key].min, ranges[col.key].max, col.higherIsBetter) : 'transparent'
                  return (
                    <td key={col.key} className="py-1.5 px-2 text-center whitespace-nowrap" style={{ backgroundColor: bg }}>
                      {col.format(value)}
                    </td>
                  )
                })}
              </tr>
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

// ========== DAILY KPIs CHART ==========
function DailyKPIsChart({ data, channelName }: { data: ChannelDailyHeatmapRow[]; channelName: string }) {
  const [hidden, setHidden] = useState<Set<string>>(new Set())

  const toggleSeries = (key: string) => {
    setHidden(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const isVisible = (key: string) => !hidden.has(key)

  // Reverse data so chart goes left-to-right chronologically
  const chartData = useMemo(() => [...data].reverse(), [data])

  // Compute running averages for overlay lines
  const chartDataWithAvg = useMemo(() => {
    return chartData.map((row, idx) => {
      const window = chartData.slice(Math.max(0, idx - 6), idx + 1)
      return {
        ...row,
        dateLabel: row.date.replace('/2026', '').replace(/^(\d+)\/(\d+)$/, (_, m, d) => {
          const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          return `${months[parseInt(m)]} ${d}`
        }),
        avgCpm: parseFloat((window.reduce((s, r) => s + r.cpm, 0) / window.length).toFixed(1)),
        avgCtr: parseFloat((window.reduce((s, r) => s + r.ctr, 0) / window.length).toFixed(2)),
        avgCpc: parseFloat((window.reduce((s, r) => s + r.cpc, 0) / window.length).toFixed(2)),
        avgCvr: parseFloat((window.reduce((s, r) => s + r.cvr, 0) / window.length).toFixed(2)),
        avgCpa: Math.round(window.reduce((s, r) => s + r.cpa, 0) / window.length),
      }
    })
  }, [chartData])

  const series = [
    { dataKey: 'spend', name: 'Spend', type: 'bar', color: '#e07a5f', yAxisId: 'left' },
    { dataKey: 'cpr', name: 'CPR', type: 'line', color: '#8a7d5a', yAxisId: 'right' },
    { dataKey: 'cpm', name: 'CPM', type: 'line', color: '#4267B2', yAxisId: 'right' },
    { dataKey: 'ctr', name: 'CTR', type: 'line', color: '#34A853', yAxisId: 'right' },
    { dataKey: 'cpc', name: 'CPC', type: 'line', color: '#00809D', yAxisId: 'right' },
    { dataKey: 'cvr', name: 'CVR', type: 'line', color: '#E60023', yAxisId: 'right' },
    { dataKey: 'cpa', name: 'CPA', type: 'line', color: '#e07a5f', yAxisId: 'right' },
    { dataKey: 'roas', name: 'ROAS', type: 'line', color: '#5cc9c4', yAxisId: 'right' },
    { dataKey: 'aov', name: 'AOV', type: 'line', color: '#c9a0b0', yAxisId: 'right' },
    { dataKey: 'hcpa', name: 'hCPA', type: 'line', color: '#FF6B6B', yAxisId: 'right' },
    { dataKey: 'hroas', name: 'hROAS', type: 'line', color: '#4ECDC4', yAxisId: 'right' },
    { dataKey: 'avgCpm', name: 'Avg CPM', type: 'line', color: '#4267B2', yAxisId: 'right', dashed: true },
    { dataKey: 'avgCtr', name: 'Avg CTR', type: 'line', color: '#34A853', yAxisId: 'right', dashed: true },
    { dataKey: 'avgCpc', name: 'Avg CPC', type: 'line', color: '#00809D', yAxisId: 'right', dashed: true },
    { dataKey: 'avgCvr', name: 'Avg CVR', type: 'line', color: '#E60023', yAxisId: 'right', dashed: true },
    { dataKey: 'avgCpa', name: 'Avg CPA', type: 'line', color: '#e07a5f', yAxisId: 'right', dashed: true },
  ] as const

  // Default: show only Spend and CPA
  const defaultHidden = useMemo(() => {
    const h = new Set<string>()
    series.forEach(s => {
      if (s.dataKey !== 'spend' && s.dataKey !== 'cpa') h.add(s.dataKey)
    })
    return h
  }, [])

  // Initialize hidden state
  useState(() => { setHidden(defaultHidden) })

  return (
    <div className="bg-white rounded-lg border border-cream-dark p-4">
      <div className="text-[9px] text-gray-400 mb-1">
        Any metric labeled &quot;avg&quot; is a benchmark average across the <strong>ORCA</strong> platform.
      </div>
      <h3 className="text-sm font-semibold text-gray-800 text-center mb-3">{channelName} Daily KPIs</h3>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={chartDataWithAvg} margin={{ top: 5, right: 50, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0ece6" />
          <XAxis dataKey="dateLabel" tick={{ fontSize: 9 }} />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 9 }}
            tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 9 }}
            tickFormatter={(v: number) => `$${v}`}
          />
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
            onClick={(e) => {
              const key = e.dataKey as string
              if (key) toggleSeries(key)
            }}
            formatter={(value: string, entry) => (
              <span style={{
                color: hidden.has(entry.dataKey as string) ? '#ccc' : '#333',
                fontSize: 9,
                textDecoration: hidden.has(entry.dataKey as string) ? 'line-through' : 'none',
              }}>
                {value}
              </span>
            )}
            wrapperStyle={{ fontSize: 9 }}
          />
          {/* Spend bar */}
          <Bar dataKey="spend" name="Spend" yAxisId="left" fill="#e07a5f" opacity={isVisible('spend') ? 0.7 : 0} hide={!isVisible('spend')} />
          {/* Metric lines */}
          {series.filter(s => s.type === 'line').map(s => (
            <Line
              key={s.dataKey}
              dataKey={s.dataKey}
              name={s.name}
              yAxisId={s.yAxisId}
              stroke={s.color}
              strokeWidth={1.5}
              strokeDasharray={'dashed' in s && s.dashed ? '5 3' : undefined}
              dot={false}
              hide={!isVisible(s.dataKey)}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

// ========== BREAKOUTS TABLE ==========
const breakoutCols: { key: keyof BreakoutMetrics; label: string; format: (v: number) => string; higherIsBetter: boolean }[] = [
  { key: 'spend', label: 'Spend ↓', format: v => `$${v.toLocaleString()}`, higherIsBetter: false },
  { key: 'cpm', label: 'CPM ↓', format: v => `$${v}`, higherIsBetter: false },
  { key: 'ctr', label: 'CTR ↓', format: v => `${v}%`, higherIsBetter: true },
  { key: 'cpc', label: 'CPC ↓', format: v => `$${v}`, higherIsBetter: false },
  { key: 'cvr', label: 'CVR ↓', format: v => `${v}%`, higherIsBetter: true },
  { key: 'cpa', label: 'CPA', format: v => `$${v}`, higherIsBetter: false },
  { key: 'arcosCPA', label: 'arcosCPA ↓', format: () => '--', higherIsBetter: false },
  { key: 'pCPA', label: 'pCPA ↓', format: () => '--', higherIsBetter: false },
  { key: 'roas', label: 'ROAS ↓', format: v => `${v}%`, higherIsBetter: true },
  { key: 'aov', label: 'AOV ↓', format: v => `$${v}`, higherIsBetter: true },
]

function BreakoutsTable({ channel }: { channel: string }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = useState('')

  const campaignData = channelBreakoutData[channel] || []

  const toggleExpand = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Compute ranges for heatmap across all campaigns
  const ranges = useMemo(() => {
    const r: Record<string, { min: number; max: number }> = {}
    for (const col of breakoutCols) {
      if (col.key === 'arcosCPA' || col.key === 'pCPA') continue
      const vals = campaignData.map(c => c[col.key] as number).filter(v => v > 0)
      if (vals.length > 0) r[col.key] = { min: Math.min(...vals), max: Math.max(...vals) }
      else r[col.key] = { min: 0, max: 1 }
    }
    return r
  }, [campaignData])

  const filteredCampaigns = searchQuery
    ? campaignData.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : campaignData

  const renderMetricCells = (metrics: BreakoutMetrics) => (
    breakoutCols.map(col => {
      const value = metrics[col.key] as number
      const bg = (col.key === 'arcosCPA' || col.key === 'pCPA' || value === 0)
        ? 'transparent'
        : getHeatmapColor(value, ranges[col.key]?.min ?? 0, ranges[col.key]?.max ?? 1, col.higherIsBetter)
      return (
        <td key={col.key} className="py-2 px-2 text-center whitespace-nowrap text-xs" style={{ backgroundColor: bg }}>
          {col.format(value)}
        </td>
      )
    })
  )

  return (
    <div className="bg-white rounded-lg border border-cream-dark p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-gray-800">Breakouts</h3>
          <span className="text-[10px] bg-coral text-white px-2 py-0.5 rounded-full font-medium">
            {campaignData.length} Campaigns
          </span>
        </div>
        <div className="relative">
          <Search size={13} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns, adsets, ads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-xs pl-7 pr-3 py-1.5 border border-cream-dark rounded bg-white text-gray-700 w-64 focus:outline-none focus:ring-1 focus:ring-teal-chart"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-cream-dark bg-cream/30">
              <th className="text-left py-2 px-2 font-bold text-gray-700 whitespace-nowrap min-w-[300px]">Name ↓</th>
              {breakoutCols.map(col => (
                <th key={col.key} className="text-center py-2 px-2 font-bold text-gray-700 whitespace-nowrap">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCampaigns.map(campaign => {
              const campaignKey = campaign.name
              const isCampaignExpanded = expanded[campaignKey]
              return (
                <React.Fragment key={campaignKey}>
                  {/* Campaign row */}
                  <tr className="border-b border-cream-dark/50 hover:bg-cream/30 cursor-pointer" onClick={() => toggleExpand(campaignKey)}>
                    <td className="py-2 px-2 font-medium text-gray-800 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {isCampaignExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                        {campaign.name}
                      </div>
                    </td>
                    {renderMetricCells(campaign)}
                  </tr>
                  {/* Ad Set rows */}
                  {isCampaignExpanded && campaign.adSets.map(adSet => {
                    const adSetKey = `${campaignKey}__${adSet.name}`
                    const isAdSetExpanded = expanded[adSetKey]
                    return (
                      <React.Fragment key={adSetKey}>
                        <tr className="border-b border-cream-dark/30 hover:bg-cream/20 cursor-pointer bg-cream/10" onClick={() => toggleExpand(adSetKey)}>
                          <td className="py-1.5 px-2 font-medium text-gray-700 whitespace-nowrap">
                            <div className="flex items-center gap-1 pl-5">
                              {isAdSetExpanded ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                              {adSet.name}
                            </div>
                          </td>
                          {renderMetricCells(adSet)}
                        </tr>
                        {/* Ad rows */}
                        {isAdSetExpanded && adSet.ads.map(ad => (
                          <tr key={ad.name} className="border-b border-cream-dark/20 bg-cream/5">
                            <td className="py-1.5 px-2 text-gray-600 whitespace-nowrap">
                              <div className="pl-10">{ad.name}</div>
                            </td>
                            {renderMetricCells(ad)}
                          </tr>
                        ))}
                      </React.Fragment>
                    )
                  })}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-2">
        <button className="text-xs text-gray-500 hover:text-gray-700">Export to CSV</button>
      </div>
    </div>
  )
}

// ========== MAIN PAGE ==========
export default function ChannelDailyHeatmapsPage() {
  const [activeChannel, setActiveChannel] = useState('Meta')
  const [subTab, setSubTab] = useState<'rollup' | 'breakouts'>('rollup')

  const allData = channelHeatmapData[activeChannel] || []

  // Build date options from current channel data (newest first in data, so reverse for picker)
  const dateOptions: DateOption[] = useMemo(() =>
    [...allData].reverse().map(d => ({ value: d.date, label: d.date })),
  [allData])

  const [dateRange, setDateRange] = useState<[string, string]>(() => {
    const reversed = [...allData].reverse()
    return [reversed[0]?.date || '', reversed[reversed.length - 1]?.date || '']
  })

  const heatmapPresets: DatePreset[] = useMemo(() => {
    const reversed = [...allData].reverse()
    const last = reversed[reversed.length - 1]?.date || ''
    return [
      { label: 'Last 7 Days', range: [reversed[Math.max(0, reversed.length - 7)]?.date || '', last] },
      { label: 'Last 14 Days', range: [reversed[Math.max(0, reversed.length - 14)]?.date || '', last] },
      { label: 'Last 21 Days', range: [reversed[0]?.date || '', last] },
    ]
  }, [allData])

  // Filter data by selected range
  const data = useMemo(() => {
    const reversed = [...allData].reverse()
    const startIdx = reversed.findIndex(d => d.date === dateRange[0])
    const endIdx = reversed.findIndex(d => d.date === dateRange[1])
    if (startIdx === -1 || endIdx === -1) return allData
    const filtered = reversed.slice(startIdx, endIdx + 1)
    return filtered.reverse() // back to newest-first for table display
  }, [allData, dateRange])

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Daily Heatmaps (Last 21 Days)</h2>
        <TableDatePicker
          options={dateOptions}
          selectedRange={dateRange}
          onRangeChange={setDateRange}
          presets={heatmapPresets}
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

        <div className="flex gap-1 ml-4">
          <button
            onClick={() => setSubTab('rollup')}
            className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
              subTab === 'rollup'
                ? 'bg-coral text-white'
                : 'bg-white text-gray-600 border border-cream-dark hover:bg-cream'
            }`}
          >
            Daily Rollup
          </button>
          <button
            onClick={() => setSubTab('breakouts')}
            className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
              subTab === 'breakouts'
                ? 'bg-coral text-white'
                : 'bg-white text-gray-600 border border-cream-dark hover:bg-cream'
            }`}
          >
            Breakouts
          </button>
        </div>
      </div>

      {/* Averages summary — always visible */}
      <AveragesTable data={data} />

      {subTab === 'rollup' ? (
        /* Main heatmap table */
        <HeatmapTable data={data} />
      ) : (
        /* Breakouts view */
        <BreakoutsTable channel={activeChannel} />
      )}

      {/* Daily KPIs chart */}
      <DailyKPIsChart data={data} channelName={activeChannel} />
    </div>
  )
}
