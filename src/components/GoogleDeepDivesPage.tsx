'use client'

import { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, Filter } from 'lucide-react'
import { googleKeywordsData, googleProductsData } from '@/data/dashboardData'
import type { GoogleKeywordRow, GoogleProductRow } from '@/data/dashboardData'
import TableDatePicker from './TableDatePicker'
import type { DateOption, DatePreset } from './TableDatePicker'

// Date options for the picker (daily dates Feb 15 - Mar 17)
const dateOptions: DateOption[] = Array.from({ length: 31 }, (_, i) => {
  const day = 15 + i
  if (day <= 28) return { value: `2/15-${day}`, label: `Feb ${day}, 2026` }
  const mDay = day - 28
  return { value: `3/${mDay}`, label: `Mar ${mDay}, 2026` }
}).slice(0, 31).filter((_, i) => i < 31)

// Simpler: just use a fixed set of date options
const simpleDateOptions: DateOption[] = [
  { value: '2/15', label: 'Feb 15' }, { value: '2/16', label: 'Feb 16' }, { value: '2/17', label: 'Feb 17' },
  { value: '2/18', label: 'Feb 18' }, { value: '2/19', label: 'Feb 19' }, { value: '2/20', label: 'Feb 20' },
  { value: '2/21', label: 'Feb 21' }, { value: '2/22', label: 'Feb 22' }, { value: '2/23', label: 'Feb 23' },
  { value: '2/24', label: 'Feb 24' }, { value: '2/25', label: 'Feb 25' }, { value: '2/26', label: 'Feb 26' },
  { value: '2/27', label: 'Feb 27' }, { value: '2/28', label: 'Feb 28' },
  { value: '3/1', label: 'Mar 1' }, { value: '3/2', label: 'Mar 2' }, { value: '3/3', label: 'Mar 3' },
  { value: '3/4', label: 'Mar 4' }, { value: '3/5', label: 'Mar 5' }, { value: '3/6', label: 'Mar 6' },
  { value: '3/7', label: 'Mar 7' }, { value: '3/8', label: 'Mar 8' }, { value: '3/9', label: 'Mar 9' },
  { value: '3/10', label: 'Mar 10' }, { value: '3/11', label: 'Mar 11' }, { value: '3/12', label: 'Mar 12' },
  { value: '3/13', label: 'Mar 13' }, { value: '3/14', label: 'Mar 14' }, { value: '3/15', label: 'Mar 15' },
  { value: '3/16', label: 'Mar 16' }, { value: '3/17', label: 'Mar 17' },
]

const datePresets: DatePreset[] = [
  { label: 'Last 7 Days', range: ['3/11', '3/17'] },
  { label: 'Last 14 Days', range: ['3/4', '3/17'] },
  { label: 'Last 30 Days', range: ['2/15', '3/17'] },
  { label: 'Month to Date', range: ['3/1', '3/17'] },
]

type SortDir = 'asc' | 'desc'

// ========== SORTABLE TABLE HEADER ==========
function SortHeader({ label, active, dir, onClick }: { label: string; active: boolean; dir: SortDir; onClick: () => void }) {
  return (
    <th
      className="py-2 px-3 font-semibold text-gray-600 whitespace-nowrap cursor-pointer hover:bg-cream/50 select-none"
      onClick={onClick}
    >
      <div className="flex items-center justify-end gap-1">
        <span>{label}</span>
        <div className="flex flex-col -space-y-1">
          <ChevronUp size={10} className={active && dir === 'asc' ? 'text-gray-800' : 'text-gray-300'} />
          <ChevronDown size={10} className={active && dir === 'desc' ? 'text-gray-800' : 'text-gray-300'} />
        </div>
      </div>
    </th>
  )
}

// ========== KEYWORDS TABLE ==========
function KeywordsTable() {
  const [sortKey, setSortKey] = useState<keyof GoogleKeywordRow>('spendPct')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [page, setPage] = useState(1)
  const perPage = 20

  const handleSort = (key: keyof GoogleKeywordRow) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('desc') }
    setPage(1)
  }

  const sorted = useMemo(() => {
    return [...googleKeywordsData].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av))
    })
  }, [sortKey, sortDir])

  const totalPages = Math.ceil(sorted.length / perPage)
  const pageData = sorted.slice((page - 1) * perPage, page * perPage)

  const columns: { key: keyof GoogleKeywordRow; label: string; format: (v: number | string) => string; align: string }[] = [
    { key: 'keyword', label: 'Keyword', format: v => String(v), align: 'text-left' },
    { key: 'spendPct', label: 'Spend % of Total', format: v => `${v}%`, align: 'text-right' },
    { key: 'revenuePct', label: 'Revenue % of Total', format: v => `${v}%`, align: 'text-right' },
    { key: 'spend', label: 'Spend', format: v => `$${Number(v).toLocaleString()}`, align: 'text-right' },
    { key: 'conversions', label: 'Conversions', format: v => String(v), align: 'text-right' },
    { key: 'revenue', label: 'Revenue', format: v => v === 0 ? '$0' : `$${Number(v).toLocaleString()}`, align: 'text-right' },
    { key: 'cpa', label: 'CPA', format: v => v === 0 ? '$0' : `$${v}`, align: 'text-right' },
  ]

  return (
    <div>
      <h3 className="text-sm font-bold text-gray-800 mb-3">Top Google Keywords</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-cream-dark">
              {columns.map(col => (
                col.key === 'keyword' ? (
                  <th key={col.key} className="py-2 px-3 font-semibold text-gray-600 text-left cursor-pointer hover:bg-cream/50" onClick={() => handleSort(col.key)}>
                    <div className="flex items-center gap-1">
                      <span>{col.label}</span>
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp size={10} className={sortKey === col.key && sortDir === 'asc' ? 'text-gray-800' : 'text-gray-300'} />
                        <ChevronDown size={10} className={sortKey === col.key && sortDir === 'desc' ? 'text-gray-800' : 'text-gray-300'} />
                      </div>
                    </div>
                  </th>
                ) : (
                  <SortHeader
                    key={col.key}
                    label={col.label}
                    active={sortKey === col.key}
                    dir={sortDir}
                    onClick={() => handleSort(col.key)}
                  />
                )
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, idx) => (
              <tr key={idx} className="border-b border-cream-dark/30 hover:bg-cream/30">
                {columns.map(col => (
                  <td key={col.key} className={`py-2.5 px-3 ${col.align} ${col.key === 'keyword' ? 'font-medium text-gray-700' : 'text-gray-600'}`}>
                    {col.format(row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2 mt-3">
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-7 h-7 text-xs rounded ${page === p ? 'bg-sidebar text-white' : 'bg-white border border-cream-dark text-gray-600 hover:bg-cream'}`}
          >
            {p}
          </button>
        ))}
        {totalPages > 5 && (
          <>
            <span className="text-xs text-gray-400">...</span>
            <button
              onClick={() => setPage(totalPages)}
              className={`w-7 h-7 text-xs rounded ${page === totalPages ? 'bg-sidebar text-white' : 'bg-white border border-cream-dark text-gray-600 hover:bg-cream'}`}
            >
              {totalPages}
            </button>
          </>
        )}
        <span className="text-xs text-gray-400 ml-1">{perPage} / page</span>
      </div>
    </div>
  )
}

// ========== PRODUCTS TABLE ==========
function ProductsTable() {
  const [sortKey, setSortKey] = useState<keyof GoogleProductRow>('spendPct')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [page, setPage] = useState(1)
  const perPage = 20

  const handleSort = (key: keyof GoogleProductRow) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('desc') }
    setPage(1)
  }

  const sorted = useMemo(() => {
    return [...googleProductsData].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av))
    })
  }, [sortKey, sortDir])

  const totalPages = Math.ceil(sorted.length / perPage)
  const pageData = sorted.slice((page - 1) * perPage, page * perPage)

  const columns: { key: keyof GoogleProductRow; label: string; format: (v: number | string) => string; align: string }[] = [
    { key: 'product', label: 'Product', format: v => String(v), align: 'text-left' },
    { key: 'spendPct', label: 'Spend % of Total', format: v => `${v}%`, align: 'text-right' },
    { key: 'revenuePct', label: 'Revenue % of Total', format: v => `${v}%`, align: 'text-right' },
    { key: 'spend', label: 'Spend', format: v => `$${Number(v).toLocaleString()}`, align: 'text-right' },
    { key: 'conversions', label: 'Conversions', format: v => String(v), align: 'text-right' },
    { key: 'revenue', label: 'Revenue', format: v => v === 0 ? '$0' : `$${Number(v).toLocaleString()}`, align: 'text-right' },
    { key: 'cpa', label: 'CPA', format: v => v === 0 ? '$0' : `$${v}`, align: 'text-right' },
    { key: 'roas', label: 'ROAS', format: v => v === 0 ? '0' : `${v}x`, align: 'text-right' },
  ]

  return (
    <div>
      <h3 className="text-sm font-bold text-gray-800 mb-3">Top Google Products</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-cream-dark">
              {columns.map(col => (
                col.key === 'product' ? (
                  <th key={col.key} className="py-2 px-3 font-semibold text-gray-600 text-left cursor-pointer hover:bg-cream/50" onClick={() => handleSort(col.key)}>
                    <div className="flex items-center gap-1">
                      <span>{col.label}</span>
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp size={10} className={sortKey === col.key && sortDir === 'asc' ? 'text-gray-800' : 'text-gray-300'} />
                        <ChevronDown size={10} className={sortKey === col.key && sortDir === 'desc' ? 'text-gray-800' : 'text-gray-300'} />
                      </div>
                    </div>
                  </th>
                ) : (
                  <SortHeader
                    key={col.key}
                    label={col.label}
                    active={sortKey === col.key}
                    dir={sortDir}
                    onClick={() => handleSort(col.key)}
                  />
                )
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, idx) => (
              <tr key={idx} className="border-b border-cream-dark/30 hover:bg-cream/30">
                {columns.map(col => (
                  <td key={col.key} className={`py-2.5 px-3 ${col.align} ${col.key === 'product' ? 'font-medium text-gray-700' : 'text-gray-600'}`}>
                    {col.format(row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-2 mt-3">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-7 h-7 text-xs rounded ${page === p ? 'bg-sidebar text-white' : 'bg-white border border-cream-dark text-gray-600 hover:bg-cream'}`}
            >
              {p}
            </button>
          ))}
          <span className="text-xs text-gray-400 ml-1">{perPage} / page</span>
        </div>
      )}
    </div>
  )
}

// ========== MAIN PAGE ==========
export default function GoogleDeepDivesPage() {
  const [activeTab, setActiveTab] = useState<'keywords' | 'products'>('keywords')
  const [dateRange, setDateRange] = useState<[string, string]>(['2/15', '3/17'])

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Google Deep Dives</h2>
        <div className="flex items-center gap-3">
          <TableDatePicker
            options={simpleDateOptions}
            selectedRange={dateRange}
            onRangeChange={setDateRange}
            presets={datePresets}
          />
          <button className="text-xs text-gray-500 hover:text-gray-700">Reset</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1">
        <button
          onClick={() => setActiveTab('keywords')}
          className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
            activeTab === 'keywords' ? 'bg-[#8b3a62] text-white' : 'bg-white text-gray-600 border border-cream-dark hover:bg-cream'
          }`}
        >
          Google Keywords
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
            activeTab === 'products' ? 'bg-[#8b3a62] text-white' : 'bg-white text-gray-600 border border-cream-dark hover:bg-cream'
          }`}
        >
          Google Products
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-cream-dark p-4">
        {activeTab === 'keywords' ? <KeywordsTable /> : <ProductsTable />}

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-cream-dark/50">
          <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
            <Filter size={12} /> Filters
          </button>
          <button className="text-xs text-gray-500 hover:text-gray-700">Export to CSV</button>
        </div>
      </div>
    </div>
  )
}
