'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import type { DateRange } from '@/data/dashboardData'
import { MONTHS_WITH_DAILY_DATA } from '@/data/dashboardData'

interface DateRangePickerProps {
  dateRange: DateRange
  onDateRangeChange: (range: DateRange) => void
  selectedMonth: string
  onMonthChange: (month: string) => void
}

const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const MONTH_NAMES_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getStartDayOfWeek(month: number, year: number): number {
  return new Date(year, month, 1).getDay()
}

function hasData(month: number, year: number): boolean {
  const key = `${year}-${String(month + 1).padStart(2, '0')}`
  return (MONTHS_WITH_DAILY_DATA as readonly string[]).includes(key)
}

function monthKeyToIndices(monthKey: string): { month: number; year: number } {
  const [y, m] = monthKey.split('-').map(Number)
  return { month: m - 1, year: y } // month is 0-indexed
}

function indicesToMonthKey(month: number, year: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}`
}

// Presets - dynamically generated based on selected month
function getPresets(month: number, year: number): { label: string; range: DateRange }[] {
  const daysInMonth = getDaysInMonth(month, year)
  const lastDay = daysInMonth
  return [
    { label: 'Last 7 Days', range: [Math.max(1, lastDay - 6), lastDay] },
    { label: 'Last 14 Days', range: [Math.max(1, lastDay - 13), lastDay] },
    { label: 'Full Month', range: [1, lastDay] },
    { label: 'First Half', range: [1, Math.min(15, lastDay)] },
    { label: 'Second Half', range: [16, lastDay] },
    { label: 'Week 1', range: [1, 7] },
    { label: 'Week 2', range: [8, 14] },
    { label: 'Week 3', range: [15, 21] },
    { label: 'Week 4', range: [22, Math.min(28, lastDay)] },
  ]
}

function formatRange(range: DateRange, month: number, year: number): string {
  const [start, end] = range
  const mName = MONTH_NAMES_SHORT[month]
  const daysInMonth = getDaysInMonth(month, year)
  if (start === 1 && end === daysInMonth) return `${mName} 1 – ${mName} ${daysInMonth}, ${year}`
  if (start === end) return `${mName} ${start}, ${year}`
  return `${mName} ${start} – ${mName} ${end}, ${year}`
}

export default function DateRangePicker({ dateRange, onDateRangeChange, selectedMonth, onMonthChange }: DateRangePickerProps) {
  const { month: initialMonth, year: initialYear } = monthKeyToIndices(selectedMonth)
  const [open, setOpen] = useState(false)
  const [viewMonth, setViewMonth] = useState(initialMonth)
  const [viewYear, setViewYear] = useState(initialYear)
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
    const { month, year } = monthKeyToIndices(selectedMonth)
    setViewMonth(month)
    setViewYear(year)
  }, [selectedMonth])

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

  const selectMonthWithData = useCallback((month: number, year: number) => {
    const key = indicesToMonthKey(month, year)
    const days = getDaysInMonth(month, year)
    onMonthChange(key)
    onDateRangeChange([1, days])
    setViewMonth(month)
    setViewYear(year)
    setShowYearPicker(false)
    setSelecting('start')
    setTempStart(null)
  }, [onMonthChange, onDateRangeChange])

  const applyPreset = useCallback((range: DateRange) => {
    // If viewing a month with data that isn't the selected month, switch to it
    if (hasData(viewMonth, viewYear)) {
      const key = indicesToMonthKey(viewMonth, viewYear)
      if (key !== selectedMonth) {
        onMonthChange(key)
      }
    }
    onDateRangeChange(range)
    setSelecting('start')
    setTempStart(null)
  }, [onDateRangeChange, onMonthChange, viewMonth, viewYear, selectedMonth])

  const handleDayClick = useCallback((day: number) => {
    if (!hasData(viewMonth, viewYear)) return
    if (selecting === 'start') {
      setTempStart(day)
      setSelecting('end')
    } else {
      const start = tempStart!
      const newRange: DateRange = day >= start ? [start, day] : [day, start]
      const key = indicesToMonthKey(viewMonth, viewYear)
      if (key !== selectedMonth) {
        onMonthChange(key)
      }
      onDateRangeChange(newRange)
      setOpen(false)
      setSelecting('start')
      setTempStart(null)
    }
  }, [selecting, tempStart, onDateRangeChange, onMonthChange, viewMonth, viewYear, selectedMonth])

  const handleCustomApply = useCallback(() => {
    const daysInMonth = getDaysInMonth(viewMonth, viewYear)
    const s = Math.max(1, Math.min(daysInMonth, parseInt(customStart) || 1))
    const e = Math.max(1, Math.min(daysInMonth, parseInt(customEnd) || daysInMonth))
    const newRange: DateRange = s <= e ? [s, e] : [e, s]
    const key = indicesToMonthKey(viewMonth, viewYear)
    if (key !== selectedMonth) {
      onMonthChange(key)
    }
    onDateRangeChange(newRange)
    setOpen(false)
    setSelecting('start')
    setTempStart(null)
  }, [customStart, customEnd, onDateRangeChange, onMonthChange, viewMonth, viewYear, selectedMonth])

  const handleCustomKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCustomApply()
  }, [handleCustomApply])

  // Build calendar grid for current view month
  const daysInMonth = getDaysInMonth(viewMonth, viewYear)
  const startDay = getStartDayOfWeek(viewMonth, viewYear)
  const isDataMonth = hasData(viewMonth, viewYear)
  const isViewingSelectedMonth = indicesToMonthKey(viewMonth, viewYear) === selectedMonth

  const cells: (number | null)[] = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const isInRange = (day: number) => {
    if (!isDataMonth || !isViewingSelectedMonth) return false
    if (selecting === 'end' && tempStart !== null) {
      return day >= Math.min(tempStart, day) && day <= Math.max(tempStart, day)
    }
    return day >= dateRange[0] && day <= dateRange[1]
  }

  const isStart = (day: number) => {
    if (!isDataMonth || !isViewingSelectedMonth) return false
    if (selecting === 'end' && tempStart !== null) return day === tempStart
    return day === dateRange[0]
  }

  const isEnd = (day: number) => {
    if (!isDataMonth || !isViewingSelectedMonth) return false
    if (selecting === 'end') return false
    return day === dateRange[1]
  }

  const isActivePreset = (range: DateRange) => {
    return isViewingSelectedMonth && range[0] === dateRange[0] && range[1] === dateRange[1]
  }

  const presets = isDataMonth ? getPresets(viewMonth, viewYear) : []

  // Year picker: show range around current year
  const yearOptions = Array.from({ length: 7 }, (_, i) => viewYear - 3 + i)

  const { month: selMonth } = monthKeyToIndices(selectedMonth)

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-xs bg-white border border-cream-dark rounded px-3 py-1.5 hover:bg-gray-50 transition-colors"
      >
        <Calendar size={13} className="text-gray-500" />
        <span className="text-gray-700 font-medium">{formatRange(dateRange, selMonth, monthKeyToIndices(selectedMonth).year)}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 bg-white rounded-lg border border-cream-dark shadow-lg flex w-[520px]">
          {/* Presets sidebar */}
          <div className="w-[150px] border-r border-cream-dark p-2 flex flex-col gap-0.5">
            {/* Quick month jump buttons */}
            <div className="text-[9px] text-gray-400 font-medium px-2 pt-1 pb-0.5">MONTHS WITH DATA</div>
            {MONTHS_WITH_DAILY_DATA.map(mk => {
              const { month: m, year: y } = monthKeyToIndices(mk)
              const isActive = mk === selectedMonth
              return (
                <button
                  key={mk}
                  onClick={() => selectMonthWithData(m, y)}
                  className={`text-left text-[11px] px-2 py-1.5 rounded transition-colors
                    ${isActive ? 'bg-teal-chart/20 text-teal-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}
                  `}
                >
                  {MONTH_NAMES_SHORT[m]} {y}
                </button>
              )
            })}
            <div className="border-t border-cream-dark my-1" />
            <div className="text-[9px] text-gray-400 font-medium px-2 pb-0.5">PRESETS</div>
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
                        onClick={() => {
                          if (isData) {
                            selectMonthWithData(i, viewYear)
                          } else {
                            setViewMonth(i)
                            setShowYearPicker(false)
                          }
                        }}
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

            {/* No data notice for months without daily data */}
            {!isDataMonth && (
              <div className="text-center mb-2">
                <span className="text-[10px] text-gray-400">No daily data for this month</span>
                <button
                  onClick={() => selectMonthWithData(2, 2026)}
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
            {isDataMonth && (
              <div className="mt-3 pt-2 border-t border-cream-dark">
                <div className="text-[10px] text-gray-400 mb-1.5 font-medium">Custom Range ({MONTH_NAMES_SHORT[viewMonth]} {viewYear})</div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={daysInMonth}
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
                    max={daysInMonth}
                    value={customEnd}
                    onChange={e => setCustomEnd(e.target.value)}
                    onKeyDown={handleCustomKeyDown}
                    placeholder={String(daysInMonth)}
                    className="w-14 text-xs border border-cream-dark rounded px-2 py-1 text-center text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-chart"
                  />
                  <button
                    onClick={handleCustomApply}
                    className="text-[10px] px-3 py-1 rounded bg-teal-chart text-white font-medium hover:bg-teal-600 transition-colors"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => { applyPreset([1, daysInMonth]); setOpen(false) }}
                    className="text-[10px] px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
