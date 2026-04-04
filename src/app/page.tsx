'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'
import KPICards from '@/components/KPICards'
import DailyRevenueChart from '@/components/DailyRevenueChart'
import PaidVsOrganicChart from '@/components/PaidVsOrganicChart'
import SessionsCVRChart from '@/components/SessionsCVRChart'
import AcquisitionMetricsChart from '@/components/AcquisitionMetricsChart'
import HourlyKPICards from '@/components/HourlyKPICards'
import HourlyRevenueChart from '@/components/HourlyRevenueChart'
import DailyPacingPage from '@/components/DailyPacingPage'
import WeeklyMonthlyPage from '@/components/WeeklyMonthlyPage'
import ChannelSnapshotPage from '@/components/ChannelSnapshotPage'
import ChannelDailyHeatmapsPage from '@/components/ChannelDailyHeatmapsPage'
import ChannelWeeklyMonthlyPage from '@/components/ChannelWeeklyMonthlyPage'
import GoogleDeepDivesPage from '@/components/GoogleDeepDivesPage'
import DeepDivesAttributionPage from '@/components/DeepDivesAttributionPage'
import type { DateRange } from '@/data/dashboardData'

export default function Home() {
  const [activePage, setActivePage] = useState('snapshot')
  const [activeTab, setActiveTab] = useState<'monthly' | 'hourly'>('monthly')
  const [running, setRunning] = useState(true)
  const [dateRange, setDateRange] = useState<DateRange>([1, 31])
  const [selectedMonth, setSelectedMonth] = useState('2026-03')
  const [hourlyRunningTotal, setHourlyRunningTotal] = useState(true)
  const [hourlyAllCustomers, setHourlyAllCustomers] = useState(false)

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />

      {/* Main content */}
      <div className="flex-1 ml-48">
        {activePage === 'snapshot' && (
          <>
            <TopBar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              running={running}
              onRunningChange={setRunning}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
              hourlyRunningTotal={hourlyRunningTotal}
              onHourlyRunningTotalChange={setHourlyRunningTotal}
              hourlyAllCustomers={hourlyAllCustomers}
              onHourlyAllCustomersChange={setHourlyAllCustomers}
            />

            {activeTab === 'monthly' ? (
              <div className="p-4 space-y-4">
                <div className="flex gap-4">
                  <KPICards dateRange={dateRange} selectedMonth={selectedMonth} />
                  <DailyRevenueChart running={running} dateRange={dateRange} selectedMonth={selectedMonth} />
                </div>
                <div className="flex gap-4">
                  <PaidVsOrganicChart dateRange={dateRange} selectedMonth={selectedMonth} />
                  <SessionsCVRChart dateRange={dateRange} selectedMonth={selectedMonth} />
                </div>
                <AcquisitionMetricsChart dateRange={dateRange} selectedMonth={selectedMonth} />
              </div>
            ) : (
              <div className="p-4 space-y-4">
                <div className="flex gap-4">
                  <HourlyKPICards allCustomers={hourlyAllCustomers} />
                  <HourlyRevenueChart runningTotal={hourlyRunningTotal} allCustomers={hourlyAllCustomers} />
                </div>
                <div className="flex gap-4">
                  <PaidVsOrganicChart dateRange={dateRange} selectedMonth={selectedMonth} />
                  <SessionsCVRChart dateRange={dateRange} selectedMonth={selectedMonth} />
                </div>
                <AcquisitionMetricsChart dateRange={dateRange} selectedMonth={selectedMonth} />
              </div>
            )}
          </>
        )}

        {activePage === 'daily-pacing' && <DailyPacingPage />}
        {activePage === 'weekly-monthly' && <WeeklyMonthlyPage />}
        {activePage === 'channel-snapshot' && <ChannelSnapshotPage />}
        {activePage === 'daily-heatmaps' && <ChannelDailyHeatmapsPage />}
        {activePage === 'channel-weekly-monthly' && <ChannelWeeklyMonthlyPage />}
        {activePage === 'google-deep-dives' && <GoogleDeepDivesPage />}
        {activePage === 'attribution' && <DeepDivesAttributionPage />}
      </div>
    </div>
  )
}
