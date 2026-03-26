'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Calendar } from 'lucide-react'
import type { DateRange } from '@/data/dashboardData'

interface DateRangePickerProps {
  dateRange: DateRange
  onDateRangeChange: (range: DateRange) => void
}

const DAYS_IN_MARCH = 31
const MONTH_LABEL = 'March 2026'
// March 2026 starts on Sunday (day 0)
const START_DAY_OF_WEEK = 0
const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

// "Today" is March 18, 2026
const TODAY = 18

// Preset filters — ranges are [startDay, endDay] within March
// Presets that extend beyond March data are clamped to available range
const presets: { label: string; range: DateRange | null }[] = [
  { label: 'Yesterday', range: [TODAY - 1, TODAY - 1] },
  { label: 'Last 7 Days', range: [TODAY - 6, TODAY] },
  { label: 'Last 30 Days', range: [1, TODAY] }, // clamped to month start
  { label: 'Last Week', range: [8, 14] }, // Sun Mar 8 – Sat Mar 14
  { label: 'Last Month', range: null }, // February — no data
  { label: 'Last Quarter', range: null }, // Q4 2025 — no data
  { label: 'Last Year', range: null }, // 2025 — no data
  { label: 'Week to Date', range: [15, TODAY] }, // Current week Sun Mar 15 – today
  { label: 'Month to Date', range: [1, TODAY] },
  { label: 'Quarter to Date', range: [1, TODAY] }, // Q1 starts Jan, clamped to March
  { label: 'Year to Date', range: [1, TODAY] }, // clamped to March
  { label: 'BFCM (Last Year)', range: null }, // Nov 2025 — no data
]

function formatRange(range: DateRange): string {
  const [start, end] = range
  if (start === 1 && end === DAYS_IN_MARCH) return 'Full Month'
  if (start === end) return `Mar ${start}`
  return `Mar ${start} – Mar ${end}`
}

export default function DateRangePicker({ dateRange, onDateRangeChange }: DateRangePickerProps) {
  const [open, setOpen] = useState(false)
  const [selecting, setSelecting] = useState<'start' | 'end'>('start')
  const [tempStart, setTempStart] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setSelecting('start')
        setTempStart(null)
      }
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const applyPreset = useCallback((range: DateRange) => {
    onDateRangeChange(range)
    setSelecting('start')
    setTempStart(null)
  }, [onDateRangeChange])

  const handleDayClick = useCallback((day: number) => {
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
  }, [selecting, tempStart, onDateRangeChange])

  // Build calendar grid
  const blanks = START_DAY_OF_WEEK
  const cells: (number | null)[] = []
  for (let i = 0; i < blanks; i++) cells.push(null)
  for (let d = 1; d <= DAYS_IN_MARCH; d++) cells.push(d)

  const isInRange = (day: number) => {
    if (selecting === 'end' && tempStart !== null) {
      return day >= Math.min(tempStart, day) && day <= Math.max(tempStart, day)
    }
    return day >= dateRange[0] && day <= dateRange[1]
  }

  const isStart = (day: number) => {
    if (selecting === 'end' && tempStart !== null) return day === tempStart
    return day === dateRange[0]
  }

  const isEnd = (day: number) => {
    if (selecting === 'end') return false
    return day === dateRange[1]
  }

  // Check if a preset matches the current range
  const isActivePreset = (range: DateRange | null) => {
    if (!range) return false
    return range[0] === dateRange[0] && range[1] === dateRange[1]
  }

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
        <div className="absolute right-0 top-full mt-1 z-50 bg-white rounded-lg border border-cream-dark shadow-lg flex w-[460px]">
          {/* Presets sidebar */}
          <div className="w-[170px] border-r border-cream-dark p-2 flex flex-col gap-0.5">
            {presets.map(p => (
              <button
                key={p.label}
                disabled={!p.range}
                onClick={() => p.range && applyPreset(p.range)}
                className={`text-left text-[11px] px-2 py-1.5 rounded transition-colors
                  ${!p.range ? 'text-gray-300 cursor-not-allowed' : ''}
                  ${p.range && isActivePreset(p.range) ? 'bg-teal-chart/20 text-teal-700 font-medium' : ''}
                  ${p.range && !isActivePreset(p.range) ? 'text-gray-600 hover:bg-gray-100' : ''}
                `}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Calendar */}
          <div className="flex-1 p-3">
            <div className="text-center text-xs font-semibold text-gray-700 mb-2">{MONTH_LABEL}</div>
            <div className="text-center text-[10px] text-gray-400 mb-2">
              {selecting === 'start' ? 'Select start date' : 'Select end date'}
            </div>

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
                const inRange = isInRange(day)
                const start = isStart(day)
                const end = isEnd(day)
                const isToday = day === TODAY
                return (
                  <button
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className={`text-[11px] py-1.5 transition-colors relative
                      ${inRange ? 'bg-teal-chart/20 text-gray-800' : 'text-gray-600 hover:bg-gray-100'}
                      ${start ? 'bg-teal-chart text-white rounded-l font-semibold' : ''}
                      ${end ? 'bg-teal-chart text-white rounded-r font-semibold' : ''}
                      ${start && end ? 'rounded' : ''}
                      ${isToday && !start && !end ? 'font-bold' : ''}
                    `}
                  >
                    {day}
                    {isToday && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-coral" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Custom range display */}
            <div className="mt-2 pt-2 border-t border-cream-dark flex items-center justify-between">
              <span className="text-[10px] text-gray-400">
                {formatRange(dateRange)}
              </span>
              <button
                onClick={() => { applyPreset([1, DAYS_IN_MARCH]); setOpen(false) }}
                className="text-[10px] px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
