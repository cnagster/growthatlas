'use client'

import { useState } from 'react'
import ActualsTable from './ActualsTable'
import TargetsTable from './TargetsTable'
import MonthlyActualsTable from './MonthlyActualsTable'
import MonthlyTargetsTable from './MonthlyTargetsTable'
import QuarterlyActualsTable from './QuarterlyActualsTable'
import PeriodOnPeriodPage from './PeriodOnPeriodPage'

const tabs = ['Weekly', 'Monthly', 'Quarterly', 'Period On Period'] as const

export default function WeeklyMonthlyPage() {
  const [activeTab, setActiveTab] = useState<string>('Weekly')

  // Date range states: [startValue, endValue] for each tab
  const [weeklyRange, setWeeklyRange] = useState<[string, string]>(['12/15', '03/16'])
  const [monthlyRange, setMonthlyRange] = useState<[string, string]>(['2025-01', '2026-03'])
  const [quarterlyRange, setQuarterlyRange] = useState<[string, string]>(['2025-Q1', '2026-Q1'])
  const [period1Range, setPeriod1Range] = useState<[string, string]>(['03/09', '03/16'])
  const [period2Range, setPeriod2Range] = useState<[string, string]>(['03/02', '03/09'])

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Business Overview</h2>
        <div className="flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-sidebar text-white'
                  : 'bg-white text-gray-600 border border-cream-dark hover:bg-cream'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tables */}
      {activeTab === 'Weekly' && (
        <>
          <ActualsTable dateRange={weeklyRange} onDateRangeChange={setWeeklyRange} />
          <TargetsTable dateRange={weeklyRange} />
        </>
      )}
      {activeTab === 'Monthly' && (
        <>
          <MonthlyActualsTable dateRange={monthlyRange} onDateRangeChange={setMonthlyRange} />
          <MonthlyTargetsTable dateRange={monthlyRange} />
        </>
      )}
      {activeTab === 'Quarterly' && (
        <QuarterlyActualsTable dateRange={quarterlyRange} onDateRangeChange={setQuarterlyRange} />
      )}
      {activeTab === 'Period On Period' && (
        <PeriodOnPeriodPage
          period1Range={period1Range}
          onPeriod1Change={setPeriod1Range}
          period2Range={period2Range}
          onPeriod2Change={setPeriod2Range}
        />
      )}
    </div>
  )
}
