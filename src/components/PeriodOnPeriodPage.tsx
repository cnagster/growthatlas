'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ComposedChart
} from 'recharts'
import { periodComparisonData, monthlyYoYData, weeklyYoYData, weeklyActualsData } from '@/data/dashboardData'
import TableDatePicker from './TableDatePicker'
import type { DateOption, DatePreset } from './TableDatePicker'

const barMetrics = [
  { key: 'Spend', color1: '#8a9a7d', color2: '#f4a6b0' },
  { key: 'CAC', color1: '#8a9a7d', color2: '#f4a6b0' },
  { key: 'bROAS', color1: '#8a9a7d', color2: '#f4a6b0' },
]

const yearColors: Record<string, string> = {
  '2021': '#a3a3a3',
  '2022': '#7d8a7d',
  '2023': '#5a7d8a',
  '2024': '#4a6a5a',
  '2025': '#2d5a3d',
  '2026': '#e07a5f',
}

const years = ['2021', '2022', '2023', '2024', '2025', '2026']

function ComparisonTable() {
  const groups = ['New', 'Return', 'Total']
  const groupedRows = groups.map(g => ({
    group: g,
    rows: periodComparisonData.filter(r => r.group === g),
  }))

  return (
    <table className="text-xs border-collapse w-full">
      <thead>
        <tr className="border-b border-cream-dark">
          <th className="w-12"></th>
          <th className="text-left py-2 px-2 font-semibold text-gray-600"></th>
          <th className="text-center py-2 px-2 font-semibold text-gray-600">
            <div className="text-[10px] text-gray-400">Period 1</div>
            <div>3/8/26 – 3/14/26</div>
          </th>
          <th className="text-center py-2 px-2 font-semibold text-gray-600">
            <div className="text-[10px] text-gray-400">Period 2</div>
            <div>3/24 – 3/1/24</div>
          </th>
          <th className="text-center py-2 px-2 font-semibold text-gray-600">% Change</th>
        </tr>
      </thead>
      <tbody>
        {groupedRows.map(({ group, rows }) =>
          rows.map((row, idx) => (
            <tr key={`${group}-${row.metric}-${idx}`} className="border-b border-cream-dark/50">
              {idx === 0 && (
                <td rowSpan={rows.length} className="py-1.5 px-2 font-semibold text-gray-700 align-top border-r border-cream-dark text-xs">
                  {group}
                </td>
              )}
              <td className="py-1.5 px-2 font-medium text-gray-600">{row.metric}</td>
              <td className="py-1.5 px-2 text-center">{row.format(row.period1)}</td>
              <td className="py-1.5 px-2 text-center">{row.format(row.period2)}</td>
              <td className="py-1.5 px-2 text-center">
                <span className={`px-2 py-0.5 rounded text-white text-[10px] font-bold ${
                  row.pctChange >= 0 ? 'bg-teal-chart' : 'bg-coral'
                }`}>
                  {row.pctChange >= 0 ? '+' : ''}{row.pctChange}%
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}

// Metrics that use the right axis (AOV/CAC $ scale and ROAS/bROAS % scale)
const rightAxisMetrics = new Set(['CAC', 'ROAS', 'New AOV', 'Return AOV', 'Total AOV', 'bROAS', 'CVR'])

interface ChartMetricDef {
  id: string        // unique display label
  group: string     // data group in periodComparisonData
  metric: string    // metric key in periodComparisonData
  section: string   // dropdown section header
}

const allChartMetrics: ChartMetricDef[] = [
  { id: 'Spend', group: 'New', metric: 'Spend', section: 'New' },
  { id: 'New Orders', group: 'New', metric: 'Orders', section: 'New' },
  { id: 'New Revenue', group: 'New', metric: 'Revenue', section: 'New' },
  { id: 'CAC', group: 'New', metric: 'CAC', section: 'New' },
  { id: 'ROAS', group: 'New', metric: 'ROAS', section: 'New' },
  { id: 'New AOV', group: 'New', metric: 'AOV', section: 'New' },
  { id: 'Return Orders', group: 'Return', metric: 'Orders', section: 'Return' },
  { id: 'Return Revenue', group: 'Return', metric: 'Revenue', section: 'Return' },
  { id: 'Return AOV', group: 'Return', metric: 'AOV', section: 'Return' },
  { id: 'Total Orders', group: 'Total', metric: 'Orders', section: 'Total' },
  { id: 'Total Revenue', group: 'Total', metric: 'Revenue', section: 'Total' },
  { id: 'Total AOV', group: 'Total', metric: 'AOV', section: 'Total' },
  { id: 'bROAS', group: 'Total', metric: 'bROAS', section: 'Total' },
  { id: 'CVR', group: 'Total', metric: 'CVR', section: 'Total' },
]

const dropdownSections = ['New', 'Return', 'Total']

function ComparisonBarChart() {
  const defaultSelected = ['Spend', 'New Orders', 'New Revenue', 'CAC', 'ROAS', 'New AOV']
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(defaultSelected)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleMetric = (id: string) => {
    setSelectedMetrics(prev =>
      prev.includes(id) ? prev.filter(k => k !== id) : [...prev, id]
    )
  }

  const chartData = useMemo(() => {
    return selectedMetrics.map(id => {
      const def = allChartMetrics.find(m => m.id === id)
      if (!def) return { name: id, period1_left: 0, period2_left: 0, period1_right: 0, period2_right: 0 }
      const row = periodComparisonData.find(r => r.metric === def.metric && r.group === def.group)
      const isRight = rightAxisMetrics.has(id)
      return {
        name: id,
        period1_left: !isRight ? (row?.period1 ?? 0) : 0,
        period2_left: !isRight ? (row?.period2 ?? 0) : 0,
        period1_right: isRight ? (row?.period1 ?? 0) : 0,
        period2_right: isRight ? (row?.period2 ?? 0) : 0,
      }
    })
  }, [selectedMetrics])

  const hasLeftAxis = selectedMetrics.some(k => !rightAxisMetrics.has(k))
  const hasRightAxis = selectedMetrics.some(k => rightAxisMetrics.has(k))

  const unselectedCount = allChartMetrics.length - selectedMetrics.length

  return (
    <div>
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {/* Selected metric pills */}
        {selectedMetrics.map(id => (
          <span
            key={id}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] rounded border border-cream-dark bg-white text-gray-700 cursor-pointer hover:bg-cream"
            onClick={() => toggleMetric(id)}
          >
            {id} <span className="text-gray-400 ml-0.5">×</span>
          </span>
        ))}
        {/* Dropdown trigger */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="px-2.5 py-1 text-[11px] rounded border border-cream-dark bg-white text-gray-400 hover:bg-cream hover:text-gray-600"
          >
            +{unselectedCount} more
          </button>
          {showDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-cream-dark rounded shadow-lg z-20 py-1 min-w-[180px] max-h-[380px] overflow-y-auto">
              {dropdownSections.map(section => (
                <div key={section}>
                  <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-cream-dark/50">
                    {section}
                  </div>
                  {allChartMetrics.filter(m => m.section === section).map(m => (
                    <div key={m.id} className="flex items-center gap-2 px-3 py-1.5 hover:bg-cream cursor-pointer text-[11px] text-gray-700" onClick={() => toggleMetric(m.id)}>
                      <span className={`w-3.5 h-3.5 flex-shrink-0 flex items-center justify-center rounded-sm border ${selectedMetrics.includes(m.id) ? 'bg-sidebar border-sidebar text-white' : 'border-gray-300'}`}>
                        {selectedMetrics.includes(m.id) && (
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        )}
                      </span>
                      {m.id}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d5" />
          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
          {/* Left axis: Revenue / Spend (large dollar values) */}
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 9 }}
            tickFormatter={v => {
              if (v === 0) return '$0'
              return v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
            }}
            hide={!hasLeftAxis}
            label={{ value: 'Revenue / Spend', angle: -90, position: 'insideLeft', style: { fontSize: 8, fill: '#888' } }}
          />
          {/* Right axis: AOV/CAC ($) and ROAS/bROAS (%) */}
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 9 }}
            tickFormatter={v => {
              // Show $ for CAC/AOV or % for ROAS/bROAS
              return `$${v}  ${v}%`
            }}
            hide={!hasRightAxis}
            label={{ value: 'AOV / CAC / ROAS / bROAS', angle: 90, position: 'insideRight', style: { fontSize: 8, fill: '#888' } }}
          />
          <Tooltip
            contentStyle={{ fontSize: 11, backgroundColor: '#faf8f5', border: '1px solid #e5e0d5' }}
            formatter={(value: number, name: string) => {
              if (value === 0) return [null, null]
              const isPeriod1 = name.includes('period1')
              const prefix = isPeriod1 ? 'Period 1' : 'Period 2'
              const isRight = name.includes('right')
              // Find the metric name from the chart data entry
              const formatted = isRight
                ? (value >= 100 ? `${value}%` : `$${value}`)
                : `$${value.toLocaleString()}`
              return [formatted, prefix]
            }}
          />
          <Legend
            formatter={(value: string) => {
              if (value.includes('period1')) return 'Period 1'
              if (value.includes('period2')) return 'Period 2'
              return value
            }}
            wrapperStyle={{ fontSize: 10 }}
            payload={[
              { value: 'Period 1', type: 'rect', color: '#8a9a7d' },
              { value: 'Period 2', type: 'rect', color: '#f4a6b0' },
            ]}
          />
          {/* Left axis bars */}
          <Bar yAxisId="left" dataKey="period1_left" fill="#8a9a7d" radius={[2, 2, 0, 0]} barSize={36} name="period1_left" />
          <Bar yAxisId="left" dataKey="period2_left" fill="#f4a6b0" radius={[2, 2, 0, 0]} barSize={36} name="period2_left" />
          {/* Right axis bars */}
          <Bar yAxisId="right" dataKey="period1_right" fill="#8a9a7d" radius={[2, 2, 0, 0]} barSize={36} name="period1_right" />
          <Bar yAxisId="right" dataKey="period2_right" fill="#f4a6b0" radius={[2, 2, 0, 0]} barSize={36} name="period2_right" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function MonthlyYoYChart() {
  const [showSpend, setShowSpend] = useState(true)

  return (
    <div className="bg-cream/50 rounded-lg border border-cream-dark p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-gray-800">Monthly (Year Over Year)</h3>
        <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
          <div className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${showSpend ? 'bg-teal-chart' : 'bg-gray-300'}`}
            onClick={() => setShowSpend(!showSpend)}
          >
            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${showSpend ? 'translate-x-4' : 'translate-x-0.5'}`} />
          </div>
          Spend Axis
        </label>
      </div>
      <h4 className="text-center text-xs font-semibold text-gray-700 mb-1">Monthly Revenue by Year</h4>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={monthlyYoYData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d5" />
          <XAxis dataKey="month" tick={{ fontSize: 9 }} />
          <YAxis tick={{ fontSize: 9 }} tickFormatter={v => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}k`} />
          {showSpend && (
            <YAxis yAxisId="spend" orientation="right" tick={{ fontSize: 9 }}
              tickFormatter={v => v >= 1000000 ? `$${(v / 1000000).toFixed(0)}M` : `$${(v / 1000).toFixed(0)}k`}
            />
          )}
          <Tooltip
            contentStyle={{ fontSize: 10, backgroundColor: '#faf8f5', border: '1px solid #e5e0d5' }}
            formatter={(value: number, name: string) => {
              const label = name.replace('_revenue', ' Revenue').replace('_spend', ' Spend')
              return [`$${value.toLocaleString()}`, label]
            }}
          />
          <Legend wrapperStyle={{ fontSize: 9 }} formatter={(v: string) => v.replace('_revenue', ' Revenue').replace('_spend', ' Spend')} />
          {/* Revenue lines */}
          {years.map(yr => (
            <Line
              key={`${yr}_revenue`}
              type="monotone"
              dataKey={`${yr}_revenue`}
              stroke={yearColors[yr]}
              strokeWidth={yr === '2025' || yr === '2026' ? 2.5 : 1.5}
              dot={false}
              strokeDasharray={yr === '2026' ? '5 3' : undefined}
              connectNulls
            />
          ))}
          {/* Spend bars for 2025 and 2026 */}
          {showSpend && (
            <>
              <Bar yAxisId="spend" dataKey="2025_spend" fill="#8a9a7d" opacity={0.5} barSize={16} radius={[2, 2, 0, 0]} />
              <Bar yAxisId="spend" dataKey="2026_spend" fill="#e07a5f" opacity={0.5} barSize={16} radius={[2, 2, 0, 0]} />
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

function WeeklyYoYChart() {
  const [showSpend, setShowSpend] = useState(true)

  return (
    <div className="bg-cream/50 rounded-lg border border-cream-dark p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-gray-800">Weekly (Year Over Year)</h3>
        <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
          <div className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${showSpend ? 'bg-teal-chart' : 'bg-gray-300'}`}
            onClick={() => setShowSpend(!showSpend)}
          >
            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${showSpend ? 'translate-x-4' : 'translate-x-0.5'}`} />
          </div>
          Spend Axis
        </label>
      </div>
      <h4 className="text-center text-xs font-semibold text-gray-700 mb-1">Weekly Revenue by Year</h4>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={weeklyYoYData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d5" />
          <XAxis dataKey="week" tick={{ fontSize: 7 }} interval={1} />
          <YAxis tick={{ fontSize: 9 }} tickFormatter={v => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}k`} />
          {showSpend && (
            <YAxis yAxisId="spend" orientation="right" tick={{ fontSize: 9 }}
              tickFormatter={v => v >= 1000000 ? `$${(v / 1000000).toFixed(0)}M` : `$${(v / 1000).toFixed(0)}k`}
            />
          )}
          <Tooltip
            contentStyle={{ fontSize: 10, backgroundColor: '#faf8f5', border: '1px solid #e5e0d5' }}
            formatter={(value: number, name: string) => {
              const label = name.replace('_revenue', ' Revenue').replace('_spend', ' Spend')
              return [`$${value.toLocaleString()}`, label]
            }}
          />
          <Legend wrapperStyle={{ fontSize: 9 }} formatter={(v: string) => v.replace('_revenue', ' Revenue').replace('_spend', ' Spend')} />
          {years.map(yr => (
            <Line
              key={`${yr}_revenue`}
              type="monotone"
              dataKey={`${yr}_revenue`}
              stroke={yearColors[yr]}
              strokeWidth={yr === '2025' || yr === '2026' ? 2.5 : 1.5}
              dot={false}
              strokeDasharray={yr === '2026' ? '5 3' : undefined}
              connectNulls
            />
          ))}
          {showSpend && (
            <>
              <Bar yAxisId="spend" dataKey="2025_spend" fill="#8a9a7d" opacity={0.5} barSize={6} radius={[1, 1, 0, 0]} />
              <Bar yAxisId="spend" dataKey="2026_spend" fill="#e07a5f" opacity={0.5} barSize={6} radius={[1, 1, 0, 0]} />
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

const weekLabelMap: Record<string, string> = {
  '12/15': 'Dec 15', '12/22': 'Dec 22', '12/29': 'Dec 29',
  '01/05': 'Jan 05', '01/12': 'Jan 12', '01/19': 'Jan 19', '01/26': 'Jan 26',
  '02/02': 'Feb 02', '02/09': 'Feb 09', '02/16': 'Feb 16', '02/23': 'Feb 23',
  '03/02': 'Mar 02', '03/09': 'Mar 09', '03/16': 'Mar 16',
}

const periodWeekOptions: DateOption[] = weeklyActualsData.map(w => ({
  value: w.weekStart,
  label: weekLabelMap[w.weekStart] || w.weekStart,
}))

const periodPresets: DatePreset[] = [
  { label: 'Last Week', range: ['03/09', '03/16'] },
  { label: 'Last 2 Weeks', range: ['03/02', '03/16'] },
  { label: 'Last 4 Weeks', range: ['02/23', '03/16'] },
  { label: 'MTD', range: ['03/02', '03/16'] },
]

interface PeriodOnPeriodPageProps {
  period1Range: [string, string]
  onPeriod1Change: (range: [string, string]) => void
  period2Range: [string, string]
  onPeriod2Change: (range: [string, string]) => void
}

export default function PeriodOnPeriodPage({ period1Range, onPeriod1Change, period2Range, onPeriod2Change }: PeriodOnPeriodPageProps) {
  return (
    <div className="space-y-4">
      {/* Comparisons section */}
      <div className="bg-white rounded-lg border border-cream-dark p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-gray-800">Comparisons</h3>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <TableDatePicker
              options={periodWeekOptions}
              selectedRange={period1Range}
              onRangeChange={onPeriod1Change}
              presets={periodPresets}
            />
            <span className="text-gray-400">Compared to:</span>
            <TableDatePicker
              options={periodWeekOptions}
              selectedRange={period2Range}
              onRangeChange={onPeriod2Change}
              presets={periodPresets}
            />
          </div>
        </div>
        <div className="grid grid-cols-[280px_1fr] gap-4">
          <ComparisonTable />
          <ComparisonBarChart />
        </div>
      </div>

      {/* Monthly YoY */}
      <MonthlyYoYChart />

      {/* Weekly YoY */}
      <WeeklyYoYChart />
    </div>
  )
}
