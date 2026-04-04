'use client'

import { Calendar, RefreshCw } from 'lucide-react'
import { ChevronDown, Save } from 'lucide-react'
import { monthlySummary, runningTotalsData, todayEstimatedNewRev, todayEstimatedAllRev, DATA_LAST_UPDATED } from '@/data/dashboardData'
import type { DateRange } from '@/data/dashboardData'
import DateRangePicker from './DateRangePicker'
import { useState, useCallback } from 'react'

interface TopBarProps {
  activeTab: 'monthly' | 'hourly'
  onTabChange: (tab: 'monthly' | 'hourly') => void
  running: boolean
  onRunningChange: (val: boolean) => void
  dateRange: DateRange
  onDateRangeChange: (range: DateRange) => void
  selectedMonth: string
  onMonthChange: (month: string) => void
  hourlyRunningTotal: boolean
  onHourlyRunningTotalChange: (val: boolean) => void
  hourlyAllCustomers: boolean
  onHourlyAllCustomersChange: (val: boolean) => void
}

export default function TopBar({
  activeTab, onTabChange,
  running, onRunningChange,
  dateRange, onDateRangeChange,
  selectedMonth, onMonthChange,
  hourlyRunningTotal, onHourlyRunningTotalChange,
  hourlyAllCustomers, onHourlyAllCustomersChange,
}: TopBarProps) {
  // March is complete — show actual final revenue
  const currentDay = runningTotalsData.length
  const currentRevenue = runningTotalsData[currentDay - 1].runningActualRevenue
  const finalRevenue = Math.round(currentRevenue)
  const prevMonthRevenue = monthlySummary.february.totalRevenue
  const revenueChange = Math.round((finalRevenue - prevMonthRevenue) / prevMonthRevenue * 100)

  // Data freshness
  const [refreshing, setRefreshing] = useState(false)
  const lastUpdated = new Date(DATA_LAST_UPDATED)
  const lastUpdatedStr = lastUpdated.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      await fetch('/api/refresh', { method: 'POST' })
    } catch {
      // Refresh is a placeholder — data is updated by Claude
    } finally {
      setTimeout(() => setRefreshing(false), 1000)
    }
  }, [])

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-cream border-b border-cream-dark">
      <div className="flex items-center gap-4">
        {/* Monthly / Hourly toggle */}
        <div className="flex bg-cream-dark rounded-md overflow-hidden text-xs font-medium">
          <button
            className={`px-3 py-1.5 transition-colors ${activeTab === 'monthly' ? 'bg-sidebar text-white' : 'text-gray-600 hover:bg-gray-200'}`}
            onClick={() => onTabChange('monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-3 py-1.5 transition-colors ${activeTab === 'hourly' ? 'bg-sidebar text-white' : 'text-gray-600 hover:bg-gray-200'}`}
            onClick={() => onTabChange('hourly')}
          >
            Hourly
          </button>
        </div>

        {activeTab === 'monthly' ? (
          <>
            {/* March Final Revenue */}
            <div>
              <div className="text-[10px] text-gray-500 font-medium">March 2026 Revenue (Final)</div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">${finalRevenue.toLocaleString()}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                  revenueChange >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                }`}>
                  {revenueChange >= 0 ? '+' : ''}{revenueChange}% vs Feb
                </span>
              </div>
            </div>

            {/* Model selector */}
            <div className="flex items-center gap-2">
              <button className="text-xs bg-sidebar text-white px-2 py-1 rounded">&lt;</button>
              <button className="flex items-center gap-1 text-xs bg-sidebar text-white px-3 py-1.5 rounded">
                Weighted (Google Sheets)
                <ChevronDown size={12} />
              </button>
              <button className="flex items-center gap-1 text-xs bg-teal-chart text-sidebar px-3 py-1.5 rounded font-medium">
                <Save size={12} />
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Last Day Revenue (Mar 31) */}
            <div>
              <div className="text-[10px] text-gray-500 font-medium">
                {hourlyAllCustomers ? "Mar 31 Total Rev" : "Mar 31 New Rev"}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  ${(hourlyAllCustomers ? todayEstimatedAllRev : todayEstimatedNewRev).value.toLocaleString()}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                  (hourlyAllCustomers ? todayEstimatedAllRev : todayEstimatedNewRev).pctChange >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                }`}>
                  {(hourlyAllCustomers ? todayEstimatedAllRev : todayEstimatedNewRev).pctChange >= 0 ? '+' : ''}{(hourlyAllCustomers ? todayEstimatedAllRev : todayEstimatedNewRev).pctChange}%
                </span>
              </div>
              <div className="text-[9px] text-gray-400">Based on Pacing against L7D AVG</div>
            </div>

            {/* Comparison toggles */}
            <div className="flex bg-cream-dark rounded-md overflow-hidden text-xs font-medium">
              <button className="px-3 py-1.5 bg-teal-chart text-sidebar">vs L7D Avg</button>
              <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-200">vs Last Year</button>
            </div>

            {/* Running Total / Hourly Actuals toggle */}
            <div className="flex bg-cream-dark rounded-md overflow-hidden text-xs font-medium">
              <button
                className={`px-3 py-1.5 transition-colors ${hourlyRunningTotal ? 'bg-teal-chart text-sidebar' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => onHourlyRunningTotalChange(true)}
              >
                Running Total
              </button>
              <button
                className={`px-3 py-1.5 transition-colors ${!hourlyRunningTotal ? 'bg-teal-chart text-sidebar' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => onHourlyRunningTotalChange(false)}
              >
                Hourly Actuals
              </button>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Data freshness indicator */}
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 border-r border-cream-dark pr-3 mr-1">
          <span>Updated {lastUpdatedStr}</span>
          <button
            onClick={handleRefresh}
            className="p-0.5 hover:text-gray-600 transition-colors"
            title="Data is refreshed by asking Claude to update. Click to ping refresh endpoint."
          >
            <RefreshCw size={10} className={refreshing ? 'animate-spin' : ''} />
          </button>
        </div>

        {activeTab === 'monthly' ? (
          <>
            {/* Running toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 font-medium">Running</span>
              <button
                onClick={() => onRunningChange(!running)}
                className={`relative w-10 h-5 rounded-full transition-colors ${running ? 'bg-teal-chart' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${running ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>

            {/* Date Range Picker */}
            <DateRangePicker dateRange={dateRange} onDateRangeChange={onDateRangeChange} selectedMonth={selectedMonth} onMonthChange={onMonthChange} />
          </>
        ) : (
          <>
            {/* New Customers / All Customers toggle */}
            <div className="flex bg-cream-dark rounded-md overflow-hidden text-xs font-medium">
              <button
                className={`px-3 py-1.5 transition-colors ${!hourlyAllCustomers ? 'bg-teal-chart text-sidebar' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => onHourlyAllCustomersChange(false)}
              >
                New Customers
              </button>
              <button
                className={`px-3 py-1.5 transition-colors ${hourlyAllCustomers ? 'bg-teal-chart text-sidebar' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => onHourlyAllCustomersChange(true)}
              >
                All Customers
              </button>
            </div>

            {/* Last 7 Days + Reset */}
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 text-xs bg-white border border-cream-dark rounded px-3 py-1.5">
                <Calendar size={13} className="text-gray-500" />
                <span className="text-gray-700 font-medium">Last 7 Days</span>
              </button>
              <button className="text-xs text-gray-500 hover:text-gray-700">Reset</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
