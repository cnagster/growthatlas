'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, PieChart, Pie, Cell
} from 'recharts'
import { SlidersHorizontal } from 'lucide-react'
import {
  channelDailySpendData, channelKPIs, channelSpendMixData,
  channelMetricsData, metaFunnelRates, metaFunnelRawData,
  metaGeoTableData, metaGeoDonutData
} from '@/data/dashboardData'
import type { MetaFunnelRaw } from '@/data/dashboardData'
import TableDatePicker from './TableDatePicker'
import type { DateOption, DatePreset } from './TableDatePicker'

const snapshotDateOptions: DateOption[] = channelDailySpendData.map(d => ({
  value: d.date,
  label: `Mar ${d.date.split('/')[1]}, 2026`,
}))

const snapshotPresets: DatePreset[] = [
  { label: 'Last 7 Days', range: [channelDailySpendData[Math.max(0, channelDailySpendData.length - 7)].date, channelDailySpendData[channelDailySpendData.length - 1].date] },
  { label: 'Last 14 Days', range: [channelDailySpendData[0].date, channelDailySpendData[channelDailySpendData.length - 1].date] },
  { label: 'Month to Date', range: [channelDailySpendData[0].date, channelDailySpendData[channelDailySpendData.length - 1].date] },
]

// ========== CHANNEL COLORS ==========
const channelColors: Record<string, string> = {
  meta: '#4267B2',
  google: '#34A853',
  tiktok: '#000000',
  youtube: '#FF0000',
  pinterest: '#E60023',
  bing: '#00809D',
  shopify: '#96BF48',
}

const channelLabels: Record<string, string> = {
  meta: 'Meta Spend',
  google: 'Google Spend',
  tiktok: 'TikTok Spend',
  youtube: 'YouTube Spend',
  pinterest: 'Pinterest Spend',
  bing: 'Bing Spend',
  shopify: 'Shopify New Orders',
}

// ========== HEATMAP COLOR ==========
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

// ========== KPI CARDS ==========
function ChannelKPICards() {
  return (
    <div className="w-44 flex flex-col gap-2 flex-shrink-0">
      {channelKPIs.map((kpi) => (
        <div key={kpi.label} className="bg-white rounded-lg p-3 border border-cream-dark">
          <div className="text-[10px] text-gray-500 font-medium mb-1">{kpi.label}</div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-gray-900">
              {kpi.prefix}{kpi.value.toLocaleString()}
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
              kpi.change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
            }`}>
              {kpi.change >= 0 ? '+' : ''}{kpi.change}%
            </span>
          </div>
          <div className="text-[9px] text-gray-400">compared to prior week</div>
        </div>
      ))}
    </div>
  )
}

// ========== DAILY CHANNEL SPEND CHART ==========
function DailyChannelSpendChart() {
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

  // All series definitions: spend bars, then order lines, then CPA lines
  const spendBars = [
    { dataKey: 'totalSpend', name: 'Total Spend', fill: '#2d2a26' },
    { dataKey: 'shopify', name: 'Shopify New Orders', fill: channelColors.shopify },
    { dataKey: 'google', name: 'Google Spend', fill: channelColors.google },
    { dataKey: 'meta', name: 'Meta Spend', fill: channelColors.meta },
    { dataKey: 'bing', name: 'Bing Spend', fill: channelColors.bing },
    { dataKey: 'pinterest', name: 'Pinterest Spend', fill: channelColors.pinterest },
    { dataKey: 'tiktok', name: 'TikTok Spend', fill: channelColors.tiktok },
  ]

  const orderLines = [
    { dataKey: 'cac', name: 'CAC', stroke: '#e07a5f' },
    { dataKey: 'googleOrders', name: 'Google Orders', stroke: '#34A853' },
    { dataKey: 'metaOrders', name: 'Meta Orders', stroke: '#4267B2' },
    { dataKey: 'bingOrders', name: 'Bing Orders', stroke: '#00809D' },
    { dataKey: 'pinterestOrders', name: 'Pinterest Orders', stroke: '#E60023' },
    { dataKey: 'tiktokOrders', name: 'TikTok Orders', stroke: '#555555' },
  ]

  const cpaLines = [
    { dataKey: 'googleCPA', name: 'Google CPA', stroke: '#34A853' },
    { dataKey: 'metaCPA', name: 'Meta CPA', stroke: '#4267B2' },
    { dataKey: 'bingCPA', name: 'Bing CPA', stroke: '#00809D' },
    { dataKey: 'pinterestCPA', name: 'Pinterest CPA', stroke: '#E60023' },
    { dataKey: 'tiktokCPA', name: 'TikTok CPA', stroke: '#555555' },
  ]

  // Only show stacked spend bars (excluding totalSpend which is a line/hidden reference)
  const stackedBarKeys = ['meta', 'google', 'tiktok', 'pinterest', 'bing', 'shopify'] as const

  return (
    <div className="flex-1 bg-white rounded-lg border border-cream-dark p-4">
      <h3 className="text-sm font-semibold text-gray-800 text-center mb-3">
        Daily Channel Spend vs New Orders vs CAC
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={channelDailySpendData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0ece6" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 10 }}
            tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 10 }}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name.includes('Spend') || name.includes('Shopify') || name === 'Total Spend') return [`$${value.toLocaleString()}`, name]
              if (name.includes('CPA') || name === 'CAC') return [`$${value}`, name]
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
            wrapperStyle={{ fontSize: 9, lineHeight: '18px' }}
          />
          {/* Total Spend as a reference line (hidden bar, just for legend) */}
          <Line dataKey="totalSpend" name="Total Spend" yAxisId="left" stroke="#2d2a26" strokeWidth={2} dot={false} hide={!isVisible('totalSpend')} />
          {/* Shopify New Orders as a line */}
          <Line dataKey="shopifyOrders" name="Shopify New Orders" yAxisId="right" stroke={channelColors.shopify} strokeWidth={2} dot={{ r: 2 }} hide={!isVisible('shopifyOrders')} />
          {/* Stacked spend bars */}
          {stackedBarKeys.map(key => (
            <Bar
              key={key}
              dataKey={key}
              name={channelLabels[key]}
              stackId="spend"
              yAxisId="left"
              fill={channelColors[key]}
              hide={!isVisible(key)}
              opacity={isVisible(key) ? 1 : 0.2}
            />
          ))}
          {/* CAC line */}
          <Line dataKey="cac" name="CAC" yAxisId="right" stroke="#e07a5f" strokeWidth={2} dot={{ r: 2 }} hide={!isVisible('cac')} />
          {/* Per-channel order lines */}
          {orderLines.filter(l => l.dataKey !== 'cac').map(l => (
            <Line key={l.dataKey} dataKey={l.dataKey} name={l.name} yAxisId="right" stroke={l.stroke} strokeWidth={1.5} dot={{ r: 2 }} hide={!isVisible(l.dataKey)} />
          ))}
          {/* Per-channel CPA lines (dashed) */}
          {cpaLines.map(l => (
            <Line key={l.dataKey} dataKey={l.dataKey} name={l.name} yAxisId="right" stroke={l.stroke} strokeWidth={1.5} strokeDasharray="4 3" dot={{ r: 2 }} hide={!isVisible(l.dataKey)} />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

// ========== CHANNEL SPEND MIX TABLE ==========
function ChannelSpendMixTable() {
  return (
    <div className="flex-1">
      <h4 className="text-xs font-bold text-gray-700 mb-2">Channel Spend Mix</h4>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-cream-dark">
            <th className="text-left py-2 px-2 font-semibold text-gray-600">Channel</th>
            <th className="text-right py-2 px-2 font-semibold text-gray-600">Last Week $</th>
            <th className="text-right py-2 px-2 font-semibold text-gray-600">Last Week %</th>
            <th className="text-right py-2 px-2 font-semibold text-gray-600">% WoW</th>
          </tr>
        </thead>
        <tbody>
          {channelSpendMixData.map(row => (
            <tr key={row.channel} className="border-b border-cream-dark/50">
              <td className="py-2 px-2 font-medium text-gray-700">{row.channel}</td>
              <td className="py-2 px-2 text-right">${row.lastWeekDollars.toLocaleString()}</td>
              <td className="py-2 px-2 text-right">{row.lastWeekPct}%</td>
              <td className="py-2 px-2 text-right">
                <div className="flex items-center justify-end gap-2">
                  <div className="w-20 h-4 bg-gray-100 rounded overflow-hidden flex items-center"
                    style={{ justifyContent: row.wowPct >= 0 ? 'flex-start' : 'flex-end' }}>
                    <div
                      className={`h-full rounded ${row.wowPct >= 0 ? 'bg-green-400' : 'bg-red-400'}`}
                      style={{ width: `${Math.min(Math.abs(row.wowPct) * 1.2, 100)}%` }}
                    />
                  </div>
                  <span className={`w-10 text-right font-medium ${row.wowPct >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {row.wowPct >= 0 ? '+' : ''}{row.wowPct}%
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-2">
        <button className="text-xs text-gray-500 hover:text-gray-700">Export to CSV</button>
      </div>
    </div>
  )
}

// ========== CHANNEL METRICS TAB TABLE ==========

// Color for WoW bar: green (positive ≥20), yellow (small positive/negative -5 to 19), red (negative < -5)
function getWowBarColor(pct: number): string {
  if (pct >= 20) return '#4ead5b' // green
  if (pct >= 0) return '#4ead5b'  // green
  if (pct >= -10) return '#e8c547' // yellow
  return '#d4686a' // red
}

function ChannelMetricsTabTable() {
  const channelTabs = Object.keys(channelMetricsData)
  const [activeTab, setActiveTab] = useState(channelTabs[0])
  const metrics = channelMetricsData[activeTab] || []

  // Top metrics (Impressions through Revenue) get separated from bottom (CPM through AOV)
  const topMetrics = ['Impressions', 'Clicks', 'Cost', 'Purchases', 'Revenue']

  const formatValue = (value: number, format: string) => {
    if (format === 'currency') return `$${value.toLocaleString()}`
    if (format === 'percent') return `${value}%`
    return value.toLocaleString()
  }

  return (
    <div className="flex-1">
      <div className="flex gap-1 mb-3 flex-wrap">
        {channelTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2 py-1 text-[10px] rounded font-medium transition-colors ${
              activeTab === tab
                ? 'bg-[#8b3a62] text-white'
                : 'bg-white text-gray-600 border border-cream-dark hover:bg-cream'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-cream-dark">
            <th className="text-left py-2 px-3 font-semibold text-gray-600 w-[40%]"></th>
            <th className="text-center py-2 px-3 font-semibold text-gray-600 w-[30%]">Last Week</th>
            <th className="text-center py-2 px-3 font-semibold text-gray-600 w-[30%]">% WoW</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((row, idx) => {
            const isTopSection = topMetrics.includes(row.metric)
            const prevMetric = idx > 0 ? metrics[idx - 1].metric : null
            const showDivider = !isTopSection && prevMetric && topMetrics.includes(prevMetric)
            return (
              <tr key={row.metric} className={`${showDivider ? 'border-t-2 border-cream-dark' : 'border-b border-cream-dark/30'}`}>
                <td className="py-2.5 px-3 font-bold text-gray-800">{row.metric}</td>
                <td className="py-2.5 px-3 text-center font-medium text-gray-700">{formatValue(row.lastWeekValue, row.format)}</td>
                <td className="py-0 px-0">
                  <div
                    className="w-full py-2.5 px-3 text-center text-white font-semibold text-[11px]"
                    style={{ backgroundColor: getWowBarColor(row.wowPct) }}
                  >
                    {row.wowPct >= 0 ? '+' : ''}{row.wowPct}%
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="flex justify-end mt-2">
        <button className="text-xs text-gray-500 hover:text-gray-700">Export to CSV</button>
      </div>
    </div>
  )
}

// ========== META FUNNEL CHART ==========
function MetaFunnelChart() {
  // Derive aggregate rates from raw data for the bar chart
  const chartData = useMemo(() => {
    const totals = metaFunnelRawData.reduce((acc, r) => ({
      impressions: acc.impressions + r.impressions,
      clicks: acc.clicks + r.clicks,
      lpViews: acc.lpViews + r.lpViews,
      atc: acc.atc + r.atc,
      ic: acc.ic + r.ic,
      conversions: acc.conversions + r.conversions,
    }), { impressions: 0, clicks: 0, lpViews: 0, atc: 0, ic: 0, conversions: 0 })

    return [
      { label: 'CTR', rate: parseFloat(((totals.clicks / totals.impressions) * 100).toFixed(2)), rawLabel: `(${totals.impressions.toLocaleString()})`, color: '#2d5a3d' },
      { label: 'LP View %', rate: parseFloat(((totals.lpViews / totals.clicks) * 100).toFixed(2)), rawLabel: `(${totals.lpViews.toLocaleString()})`, color: '#3a7a50' },
      { label: 'ATC %', rate: parseFloat(((totals.atc / totals.lpViews) * 100).toFixed(2)), rawLabel: `(${totals.atc.toLocaleString()})`, color: '#4a9a63' },
      { label: 'IC %', rate: parseFloat(((totals.ic / totals.atc) * 100).toFixed(2)), rawLabel: `(${totals.ic.toLocaleString()})`, color: '#5cc9c4' },
      { label: 'CVR %', rate: parseFloat(((totals.conversions / totals.ic) * 100).toFixed(2)), rawLabel: `(${totals.conversions.toLocaleString()})`, color: '#5cc9c4' },
      { label: 'Click→Purch %', rate: parseFloat(((totals.conversions / totals.clicks) * 100).toFixed(2)), rawLabel: `(${totals.conversions.toLocaleString()})`, color: '#5cc9c4' },
    ]
  }, [])

  return (
    <div className="w-[420px] flex-shrink-0">
      <h4 className="text-xs font-semibold text-gray-800 mb-2">Meta Funnel (Last 30 Days)</h4>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 50, left: 90, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0ece6" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v: number) => `${v}%`} />
          <YAxis type="category" dataKey="label" tick={{ fontSize: 10 }} width={85} />
          <Tooltip formatter={(value: number) => [`${value}%`, 'Rate']} />
          <Bar dataKey="rate" radius={[0, 4, 4, 0]} label={{ position: 'right', fontSize: 9, formatter: (v: number) => `${v}%` }}>
            {chartData.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ========== META FUNNEL TABLE ==========

// Derive conversion rates from raw data
function deriveConversionRates(raw: MetaFunnelRaw) {
  const ctr = raw.impressions > 0 ? parseFloat(((raw.clicks / raw.impressions) * 100).toFixed(2)) : 0
  const clickToLP = raw.clicks > 0 ? parseFloat(((raw.lpViews / raw.clicks) * 100).toFixed(2)) : 0
  const lpToATC = raw.lpViews > 0 ? parseFloat(((raw.atc / raw.lpViews) * 100).toFixed(2)) : 0
  const atcToIC = raw.atc > 0 ? parseFloat(((raw.ic / raw.atc) * 100).toFixed(2)) : 0
  const icToConv = raw.ic > 0 ? parseFloat(((raw.conversions / raw.ic) * 100).toFixed(2)) : 0
  const clickToPurch = raw.clicks > 0 ? parseFloat(((raw.conversions / raw.clicks) * 100).toFixed(2)) : 0
  return { date: raw.date, spend: raw.spend, ctr, clickToLP, lpToATC, atcToIC, icToConv, clickToPurch }
}

function MetaFunnelTable() {
  const [mode, setMode] = useState<'conversion' | 'raw'>('raw')

  // Raw value columns
  const rawCols = [
    { key: 'spend', label: 'Spend', format: (v: number) => `$${v.toLocaleString()}`, higherIsBetter: false },
    { key: 'impressions', label: 'Impressions', format: (v: number) => v.toLocaleString(), higherIsBetter: true },
    { key: 'clicks', label: 'Clicks', format: (v: number) => v.toLocaleString(), higherIsBetter: true },
    { key: 'lpViews', label: 'LP Views', format: (v: number) => v.toLocaleString(), higherIsBetter: true },
    { key: 'atc', label: 'ATC', format: (v: number) => v.toLocaleString(), higherIsBetter: true },
    { key: 'ic', label: 'IC', format: (v: number) => v.toLocaleString(), higherIsBetter: true },
    { key: 'conversions', label: 'Conversions', format: (v: number) => v.toLocaleString(), higherIsBetter: true },
  ]

  // Conversion rate columns (derived from raw)
  const convCols = [
    { key: 'spend', label: 'Spend', format: (v: number) => `$${v.toLocaleString()}`, higherIsBetter: false },
    { key: 'ctr', label: 'CTR', format: (v: number) => `${v}%`, higherIsBetter: true },
    { key: 'clickToLP', label: 'Click>LP', format: (v: number) => `${v}%`, higherIsBetter: true },
    { key: 'lpToATC', label: 'LP>ATC', format: (v: number) => `${v}%`, higherIsBetter: true },
    { key: 'atcToIC', label: 'ATC>IC', format: (v: number) => `${v}%`, higherIsBetter: true },
    { key: 'icToConv', label: 'IC>Conv', format: (v: number) => `${v}%`, higherIsBetter: true },
    { key: 'clickToPurch', label: 'Click>Purch', format: (v: number) => `${v}%`, higherIsBetter: true },
  ]

  const derivedData = useMemo(() => metaFunnelRawData.map(deriveConversionRates), [])

  const activeCols = mode === 'raw' ? rawCols : convCols
  const activeData = mode === 'raw' ? metaFunnelRawData : derivedData

  const ranges = useMemo(() => {
    const r: Record<string, { min: number; max: number }> = {}
    for (const col of activeCols) {
      const vals = activeData.map(d => d[col.key as keyof typeof d] as number)
      r[col.key] = { min: Math.min(...vals), max: Math.max(...vals) }
    }
    return r
  }, [mode])

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-2">
        <div />
        <div className="flex items-center gap-2">
          <div className="flex text-[10px]">
            <button
              onClick={() => setMode('conversion')}
              className={`px-3 py-1 rounded-l border ${mode === 'conversion' ? 'bg-coral text-white border-coral' : 'bg-white text-gray-600 border-cream-dark'}`}
            >
              Conversion Rates
            </button>
            <button
              onClick={() => setMode('raw')}
              className={`px-3 py-1 rounded-r border-t border-r border-b ${mode === 'raw' ? 'bg-coral text-white border-coral' : 'bg-white text-gray-600 border-cream-dark'}`}
            >
              Raw Values
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-cream-dark">
              <th className="py-2 px-2 font-semibold text-gray-600 whitespace-nowrap text-center">Date</th>
              {activeCols.map(col => (
                <th key={col.key} className="py-2 px-2 font-semibold text-gray-600 whitespace-nowrap text-center">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activeData.map(row => (
              <tr key={row.date} className="border-b border-cream-dark/50">
                <td className="py-1.5 px-2 text-center whitespace-nowrap font-medium text-gray-700">{row.date}</td>
                {activeCols.map(col => {
                  const value = row[col.key as keyof typeof row] as number
                  const bg = getHeatmapColor(value, ranges[col.key].min, ranges[col.key].max, col.higherIsBetter ?? true)
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

// ========== META GEO DONUT ==========
function MetaGeoDonutChart() {
  const totalSpend = metaGeoDonutData.reduce((s, g) => s + g.value, 0)

  return (
    <div className="w-[300px] flex-shrink-0">
      <h4 className="text-xs font-semibold text-gray-800 mb-2 text-center">Spend by State</h4>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={metaGeoDonutData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            dataKey="value"
            label={({ name, value }) => `${name} ${((value / totalSpend) * 100).toFixed(1)}%`}
            labelLine={true}
          >
            {metaGeoDonutData.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Spend']} />
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center text-[10px] text-gray-500 mt-1">
        {metaGeoDonutData[0].name}: {((metaGeoDonutData[0].value / totalSpend) * 100).toFixed(1)}%
      </div>
    </div>
  )
}

// ========== META GEO TABLE ==========
function MetaGeoTable() {
  const [showCols, setShowCols] = useState(false)
  const colsRef = useRef<HTMLDivElement>(null)

  const allCols = [
    { key: 'geo', label: 'Geo' },
    { key: 'spend', label: 'Spend', format: (v: number) => `$${v.toLocaleString()}`, higherIsBetter: true },
    { key: 'cpr', label: 'CPR', format: (v: number) => `$${v}`, higherIsBetter: false },
    { key: 'cpm', label: 'CPM', format: (v: number) => `$${v}`, higherIsBetter: false },
    { key: 'freq', label: 'Freq', format: (v: number) => v.toFixed(2), higherIsBetter: true },
    { key: 'ctr', label: 'CTR', format: (v: number) => `${v}%`, higherIsBetter: true },
    { key: 'cpc', label: 'CPC', format: (v: number) => `$${v}`, higherIsBetter: false },
    { key: 'cvr', label: 'CVR', format: (v: number) => `${v}%`, higherIsBetter: true },
    { key: 'cpa', label: 'CPA', format: (v: number) => `$${v}`, higherIsBetter: false },
    { key: 'roas', label: 'ROAS', format: (v: number) => v.toFixed(2), higherIsBetter: true },
    { key: 'aov', label: 'AOV', format: (v: number) => `$${v.toLocaleString()}`, higherIsBetter: true },
  ]

  const [visibleCols, setVisibleCols] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(allCols.map(c => [c.key, true]))
  )

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (colsRef.current && !colsRef.current.contains(e.target as Node)) setShowCols(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const numericCols = allCols.filter(c => c.key !== 'geo' && visibleCols[c.key])
  const ranges = useMemo(() => {
    const r: Record<string, { min: number; max: number }> = {}
    for (const col of allCols.filter(c => c.key !== 'geo')) {
      const vals = metaGeoTableData.map(g => g[col.key as keyof typeof g] as number)
      r[col.key] = { min: Math.min(...vals), max: Math.max(...vals) }
    }
    return r
  }, [])

  return (
    <div className="flex-1">
      <div className="flex items-center justify-end mb-2 gap-1">
        <button className="px-3 py-1 rounded border text-[10px] font-medium bg-sidebar text-white border-sidebar">
          By State
        </button>
        <div className="relative" ref={colsRef}>
          <button
            onClick={() => setShowCols(!showCols)}
            className="px-3 py-1 rounded border text-[10px] text-gray-600 border-cream-dark bg-white flex items-center gap-1"
          >
            <SlidersHorizontal size={10} /> Columns
          </button>
            {showCols && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-cream-dark rounded-lg shadow-lg z-20 p-2 w-40">
                {allCols.filter(c => c.key !== 'geo').map(col => (
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
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-cream-dark">
              <th className="text-left py-2 px-2 font-semibold text-gray-600">State</th>
              {numericCols.map(col => (
                <th key={col.key} className="text-right py-2 px-2 font-semibold text-gray-600 whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metaGeoTableData.map(row => (
              <tr key={row.geo} className="border-b border-cream-dark/50">
                <td className="py-2 px-2 font-medium text-gray-700 whitespace-nowrap">{row.geo}</td>
                {numericCols.map(col => {
                  const value = row[col.key as keyof typeof row] as number
                  const bg = getHeatmapColor(value, ranges[col.key].min, ranges[col.key].max, col.higherIsBetter ?? true)
                  return (
                    <td key={col.key} className="py-2 px-2 text-right whitespace-nowrap" style={{ backgroundColor: bg }}>
                      {col.format!(value)}
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

// ========== MAIN PAGE ==========
export default function ChannelSnapshotPage() {
  const [dateRange, setDateRange] = useState<[string, string]>([
    channelDailySpendData[0].date,
    channelDailySpendData[channelDailySpendData.length - 1].date,
  ])

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Paid Channels Snapshot</h2>
        <TableDatePicker
          options={snapshotDateOptions}
          selectedRange={dateRange}
          onRangeChange={setDateRange}
          presets={snapshotPresets}
        />
      </div>

      {/* Section 1: KPIs + Daily Chart */}
      <div className="flex gap-4">
        <ChannelKPICards />
        <DailyChannelSpendChart />
      </div>

      {/* Section 2: Week on Week Channel Performance */}
      <div className="bg-white rounded-lg border border-cream-dark p-4">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Week On Week Channel Performance</h3>
        <div className="flex gap-6">
          <ChannelSpendMixTable />
          <ChannelMetricsTabTable />
        </div>
      </div>

      {/* Section 3: Meta Funnel View */}
      <div className="bg-white rounded-lg border border-cream-dark p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-gray-800">Meta Funnel View</h3>
            <span className="text-[10px] text-gray-400">(Last 30 Days)</span>
          </div>
        </div>
        <div className="flex gap-4">
          <MetaFunnelChart />
          <MetaFunnelTable />
        </div>
      </div>

      {/* Section 4: Meta Geos */}
      <div className="bg-white rounded-lg border border-cream-dark p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-gray-800">Meta Geos</h3>
            <span className="text-[10px] text-gray-400">(By State)</span>
          </div>
        </div>
        <div className="flex gap-4">
          <MetaGeoDonutChart />
          <MetaGeoTable />
        </div>
      </div>
    </div>
  )
}
