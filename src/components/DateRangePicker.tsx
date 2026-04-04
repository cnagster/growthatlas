'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import type { DateRange } from '@/data/dashboardData'

interface DateRangePickerProps {
  dateRange: DateRange
  onDateRangeChange: (range: DateRange) => void
}

const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const MONTH_NAMES_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Data availability: only March 2026 has daily data
const DATA_MONTH = 2 // 0-indexed (March)
const DATA_YEAR = 2026
const DATA_DAYS = 31

function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getStartDayOfWeek(month: number, year: number): number {
  return new Date(year, month, 1).getDay()
}

function hasData(month: number, year: number): boolean {
  return month === DATA_MONTH && year === DATA_YEAR
}

// Presets based on March data
const presets: { label: string; range: DateRange }[] = [
  { label: 'Yesterday', range: [30, 30] },
  { label: 'Last 7 Days', range: [25, 31] },
  { label: 'Last 14 Days', range: [18, 31] },
  { label: 'Last 30 Days', range: [1, 31] },
  { label: 'Last Week', range: [22, 28] },
  { label: 'Week to Date', range: [29, 31] },
  { label: 'Month to Date', range: [1, 31] },
  { label: 'Full Month', range: [1, 31] },
  { label: 'First Half', range: [1, 15] },
  { label: 'Second Half', range: [16, 31] },
]

function formatRange(range: DateRange): string {
  const [start, end] = range
  if (start === 1 && end === DATA_DAYS) return 'Mar 1 – Mar 31, 2026'
  if (start === end) return `Mar ${start}, 2026`
  return `Mar ${start} – Mar ${end}, 2026`
}

export default function DateRangePicker({ dateRange, onDateRangeChange }: DateRangePickerProps) {
  const [open, setOpen] = useState(false)
  const [viewMonth, setViewMonth] = useState(DATA_MONTH) // 0-indexed
  const [viewYear, setViewYear] = useState(DATA_YEAR)
  const [showYearPicker, setShowYearPicker] = useState(false)
  const [selecting, setSelecting] = useState<'start' | 'end'>('start')
  const [tempStart, setTempStart] = useState<number | null>(null)
  const [customStart, setCustomStart] = useState(String(dateRange[0]))
  const [customEnd, setCustomEnd] = useState(String(dateRange[1]))
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCustomStart(String(dateRange[0]))
    setCustomEnd(String(dateRange[1]))
  }, [dateRange])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setSelecting('start')
        setTempStart(null)
        setShowYearPicker(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const goToPrevMonth = useCallback(() => {
    setShowYearPicker(false)
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(y => y - 1)
    } else {
      setViewMonth(m => m - 1)
    }
  }, [viewMonth])

  const goToNextMonth = useCallback(() => {
    setShowYearPicker(false)
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(y => y + 1)
    } else {
      setViewMonth(m => m + 1)
    }
  }, [viewMonth])

  const jumpToDataMonth = useCallback(() => {
    setViewMonth(DATA_MONTH)
    setViewYear(DATA_YEAR)
    setShowYearPicker(false)
  }, [])

  const applyPreset = useCallback((range: DateRange) => {
    onDateRangeChange(range)
    setSelecting('start')
    setTempStart(null)
    setViewMonth(DATA_MONTH)
    setViewYear(DATA_YEAR)
  }, [onDateRangeChange])

  const handleDayClick = useCallback((day: number) => {
    if (!hasData(viewMonth, viewYear)) return
    if (selecting === 'start') {
      setTempStart(day)
      setSelecting('end')
    } else {
      const start = tempStart!
      const newRange: DateRange = day >= start ? [start, day] : [day, start]
      onDateRangeChange(newRange)
      setOpen(false)
      setSelecting('start')
      setTempStart(null)
    }
  }, [selecting, tempStart, onDateRangeChange, viewMonth, viewYear])

  const handleCustomApply = useCallback(() => {
    const s = Math.max(1, Math.min(DATA_DAYS, parseInt(customStart) || 1))
    const e = Math.max(1, Math.min(DATA_DAYS, parseInt(customEnd) || DATA_DAYS))
    const newRange: DateRange = s <= e ? [s, e] : [e, s]
    onDateRangeChange(newRange)
    setOpen(false)
    setSelecting('start')
    setTempStart(null)
  }, [customStart, customEnd, onDateRangeChange])

  const handleCustomKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCustomApply()
  }, [handleCustomApply])

  // Build calendar grid for current view month
  const daysInMonth = getDaysInMonth(viewMonth, viewYear)
  const startDay = getStartDayOfWeek(viewMonth, viewYear)
  const isDataMonth = hasData(viewMonth, viewYear)

  const cells: (number | null)[] = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const isInRange = (day: number) => {
    if (!isDataMonth) return false
    if (selecting === 'end' && tempStart !== null) {
      return day >= Math.min(tempStart, day) && day <= Math.max(tempStart, day)
    }
    return day >= dateRange[0] && day <= dateRange[1]
  }

  const isStart = (day: number) => {
    if (!isDataMonth) return false
    if (selecting === 'end' && tempStart !== null) return day === tempStart
    return day === dateRange[0]
  }

  const isEnd = (day: number) => {
    if (!isDataMonth) return false
    if (selecting === 'end') return false
    return day === dateRange[1]
  }

  const isActivePreset = (range: DateRange) => {
    return range[0] === dateRange[0] && range[1] === dateRange[1]
  }

  // Year picker: show range around current year
  const yearOptions = Array.from({ length: 7 }, (_, i) => viewYear - 3 + i)

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-xs bg-white border border-cream-dark rounded px-3 py-1.5 hover:bg-gray-50 transition-colors"
      >
        <Calendar size={13} className="text-gray-500" />
        <span className="text-gray-700 font-medium">{formatRange(dateRange)}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 bg-white rounded-lg border border-cream-dark shadow-lg flex w-[520px]">
          {/* Presets sidebar */}
          <div className="w-[150px] border-r border-cream-dark p-2 flex flex-col gap-0.5">
            {presets.map(p => (
              <button
                key={p.label}
                onClick={() => applyPreset(p.range)}
                className={`text-left text-[11px] px-2 py-1.5 rounded transition-colors
                  ${isActivePreset(p.range) ? 'bg-teal-chart/20 text-teal-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}
                `}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Calendar */}
          <div className="flex-1 p-3">
            {/* Month/Year header with arrows */}
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={goToPrevMonth}
                className="p-1 rounded hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={16} className="text-gray-500" />
              </button>

              <button
                onClick={() => setShowYearPicker(!showYearPicker)}
                className="text-xs font-semibold text-gray-700 hover:text-teal-700 hover:bg-teal-chart/10 px-3 py-1 rounded transition-colors"
              >
                {MONTH_NAMES[viewMonth]} {viewYear}
              </button>

              <button
                onClick={goToNextMonth}
                className="p-1 rounded hover:bg-gray-100 transition-colors"
              >
                <ChevronRight size={16} className="text-gray-500" />
              </button>
            </div>

            {/* Year/Month picker overlay */}
            {showYearPicker && (
              <div className="mb-3 p-2 bg-gray-50 rounded border border-cream-dark">
                {/* Year row */}
                <div className="flex items-center justify-center gap-1 mb-2">
                  <button onClick={() => setViewYear(y => y - 1)} className="p-0.5 rounded hover:bg-gray-200">
                    <ChevronLeft size={12} className="text-gray-500" />
                  </button>
                  {yearOptions.map(y => (
                    <button
                      key={y}
                      onClick={() => setViewYear(y)}
                      className={`text-[10px] px-2 py-1 rounded transition-colors ${
                        y === viewYear ? 'bg-teal-chart text-white font-semibold' : 'text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                  <button onClick={() => setViewYear(y => y + 1)} className="p-0.5 rounded hover:bg-gray-200">
                    <ChevronRight size={12} className="text-gray-500" />
                  </button>
                </div>
                {/* Month grid */}
                <div className="grid grid-cols-4 gap-1">
                  {MONTH_NAMES_SHORT.map((m, i) => {
                    const isData = hasData(i, viewYear)
                    return (
                      <button
                        key={m}
                        onClick={() => { setViewMonth(i); setShowYearPicker(false) }}
                        className={`text-[10px] px-1.5 py-1.5 rounded transition-colors
                          ${i === viewMonth ? 'bg-teal-chart text-white font-semibold' : ''}
                          ${i !== viewMonth && isData ? 'text-teal-700 bg-teal-chart/10 hover:bg-teal-chart/20 font-medium' : ''}
                          ${i !== viewMonth && !isData ? 'text-gray-500 hover:bg-gray-200' : ''}
                        `}
                      >
                        {m}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* No data notice for non-March months */}
            {!isDataMonth && (
              <div className="text-center mb-2">
                <span className="text-[10px] text-gray-400">No daily data for this month</span>
                <button
                  onClick={jumpToDataMonth}
                  className="ml-2 text-[10px] text-teal-600 hover:text-teal-800 underline"
                >
                  Go to Mar 2026
                </button>
              </div>
            )}

            {/* Selection hint */}
            {isDataMonth && (
              <div className="text-center text-[10px] text-gray-400 mb-2">
                {selecting === 'start' ? 'Select start date' : 'Select end date'}
              </div>
            )}

            {/* Day names */}
            <div className="grid grid-cols-7 gap-0 mb-1">
              {DAY_NAMES.map(d => (
                <div key={d} className="text-center text-[10px] text-gray-400 font-medium py-1">{d}</div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-0">
              {cells.map((day, i) => {
                if (day === null) return <div key={`blank-${i}`} />
                const enabled = isDataMonth
                const inRange = isInRange(day)
                const start = isStart(day)
                const end = isEnd(day)
                return (
                  <button
                    key={day}
                    onClick={() => enabled && handleDayClick(day)}
                    disabled={!enabled}
                    className={`text-[11px] py-1.5 transition-colors relative
                      ${!enabled ? 'text-gray-300 cursor-default' : ''}
                      ${enabled && inRange ? 'bg-teal-chart/20 text-gray-800' : ''}
                      ${enabled && !inRange ? 'text-gray-600 hover:bg-gray-100' : ''}
                      ${start ? 'bg-teal-chart text-white rounded-l font-semibold' : ''}
                      ${end ? 'bg-teal-chart text-white rounded-r font-semibold' : ''}
                      ${start && end ? 'rounded' : ''}
                    `}
                  >
                    {day}
                  </button>
                )
              })}
            </div>

            {/* Custom date inputs */}
            <div className="mt-3 pt-2 border-t border-cream-dark">
              <div className="text-[10px] text-gray-400 mb-1.5 font-medium">Custom Range (Mar 2026)</div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={DATA_DAYS}
                  value={customStart}
                  onChange={e => setCustomStart(e.target.value)}
                  onKeyDown={handleCustomKeyDown}
                  placeholder="1"
                  className="w-14 text-xs border border-cream-dark rounded px-2 py-1 text-center text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-chart"
                />
                <span className="text-[10px] text-gray-400">to</span>
                <input
                  type="number"
                  min={1}
                  max={DATA_DAYS}
                  value={customEnd}
                  onChange={e => setCustomEnd(e.target.value)}
                  onKeyDown={handleCustomKeyDown}
                  placeholder="31"
                  className="w-14 text-xs border border-cream-dark rounded px-2 py-1 text-center text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-chart"
                />
                <button
                  onClick={handleCustomApply}
                  className="text-[10px] px-3 py-1 rounded bg-teal-chart text-white font-medium hover:bg-teal-600 transition-colors"
                >
                  Apply
                </button>
                <button
                  onClick={() => { applyPreset([1, DATA_DAYS]); setOpen(false) }}
                  className="text-[10px] px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
