'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Calendar } from 'lucide-react'

export interface DateOption {
  value: string
  label: string
}

export interface DatePreset {
  label: string
  range: [string, string] | null
}

interface TableDatePickerProps {
  options: DateOption[]
  selectedRange: [string, string]
  onRangeChange: (range: [string, string]) => void
  presets?: DatePreset[]
  formatDisplay?: (startLabel: string, endLabel: string) => string
}

export default function TableDatePicker({
  options,
  selectedRange,
  onRangeChange,
  presets,
  formatDisplay,
}: TableDatePickerProps) {
  const [open, setOpen] = useState(false)
  const [selecting, setSelecting] = useState<'start' | 'end'>('start')
  const [tempStart, setTempStart] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

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

  const getIndex = useCallback((value: string) => {
    return options.findIndex(o => o.value === value)
  }, [options])

  const handleItemClick = useCallback((value: string) => {
    if (selecting === 'start') {
      setTempStart(value)
      setSelecting('end')
    } else {
      const startIdx = getIndex(tempStart!)
      const endIdx = getIndex(value)
      const [s, e] = startIdx <= endIdx
        ? [tempStart!, value]
        : [value, tempStart!]
      onRangeChange([s, e])
      setOpen(false)
      setSelecting('start')
      setTempStart(null)
    }
  }, [selecting, tempStart, getIndex, onRangeChange])

  const applyPreset = useCallback((range: [string, string]) => {
    onRangeChange(range)
    setSelecting('start')
    setTempStart(null)
  }, [onRangeChange])

  const isInRange = useCallback((value: string) => {
    const idx = getIndex(value)
    if (selecting === 'end' && tempStart !== null) {
      const tempIdx = getIndex(tempStart)
      return idx >= Math.min(tempIdx, idx) && idx <= Math.max(tempIdx, idx)
    }
    const startIdx = getIndex(selectedRange[0])
    const endIdx = getIndex(selectedRange[1])
    return idx >= startIdx && idx <= endIdx
  }, [getIndex, selecting, tempStart, selectedRange])

  const isStart = useCallback((value: string) => {
    if (selecting === 'end' && tempStart !== null) return value === tempStart
    return value === selectedRange[0]
  }, [selecting, tempStart, selectedRange])

  const isEnd = useCallback((value: string) => {
    if (selecting === 'end') return false
    return value === selectedRange[1]
  }, [selecting, selectedRange])

  const isActivePreset = (range: [string, string] | null) => {
    if (!range) return false
    return range[0] === selectedRange[0] && range[1] === selectedRange[1]
  }

  // Display label
  const startOpt = options.find(o => o.value === selectedRange[0])
  const endOpt = options.find(o => o.value === selectedRange[1])
  const displayLabel = formatDisplay
    ? formatDisplay(startOpt?.label ?? selectedRange[0], endOpt?.label ?? selectedRange[1])
    : `${startOpt?.label ?? selectedRange[0]} – ${endOpt?.label ?? selectedRange[1]}`

  const isFullRange = selectedRange[0] === options[0]?.value && selectedRange[1] === options[options.length - 1]?.value

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-xs bg-white border border-cream-dark rounded px-3 py-1.5 hover:bg-gray-50 transition-colors"
      >
        <Calendar size={13} className="text-gray-500" />
        <span className="text-gray-700 font-medium">{displayLabel}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 bg-white rounded-lg border border-cream-dark shadow-lg flex" style={{ minWidth: presets ? 420 : 260 }}>
          {/* Presets sidebar */}
          {presets && presets.length > 0 && (
            <div className="w-[150px] border-r border-cream-dark p-2 flex flex-col gap-0.5">
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
          )}

          {/* Options list */}
          <div className="flex-1 p-3 flex flex-col">
            <div className="text-center text-[10px] text-gray-400 mb-2">
              {selecting === 'start' ? 'Select start date' : 'Select end date'}
            </div>

            <div className="max-h-[280px] overflow-y-auto flex flex-col gap-0.5">
              {options.map(opt => {
                const inRange = isInRange(opt.value)
                const start = isStart(opt.value)
                const end = isEnd(opt.value)
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleItemClick(opt.value)}
                    className={`text-[11px] px-3 py-1.5 rounded text-left transition-colors
                      ${inRange ? 'bg-teal-chart/20 text-gray-800' : 'text-gray-600 hover:bg-gray-100'}
                      ${start ? 'bg-teal-chart text-white font-semibold' : ''}
                      ${end ? 'bg-teal-chart text-white font-semibold' : ''}
                    `}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>

            {/* Footer */}
            <div className="mt-2 pt-2 border-t border-cream-dark flex items-center justify-between">
              <span className="text-[10px] text-gray-400">{displayLabel}</span>
              {!isFullRange && (
                <button
                  onClick={() => {
                    applyPreset([options[0].value, options[options.length - 1].value])
                    setOpen(false)
                  }}
                  className="text-[10px] px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
