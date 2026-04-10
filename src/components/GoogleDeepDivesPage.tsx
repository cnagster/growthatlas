'use client'

import { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, Filter } from 'lucide-react'
import { googleKeywordsData, googleProductsData } from '@/data/dashboardData'
import type { GoogleKeywordRow, GoogleProductRow } from '@/data/dashboardData'
import TableDatePicker from './TableDatePicker'
import type { DateOption, DatePreset } from './TableDatePicker'

// Date options for March 2026 (data period)
const simpleDateOptions: DateOption[] = Array.from({ length: 31 }, (_, i) => ({
  value: `3/${i + 1}`,
  label: `Mar ${i + 1}`,
}))

const datePresets: DatePreset[] = [
  { label: 'Last 7 Days', range: ['3/25', '3/31'] },
  { label: 'Last 14 Days', range: ['3/18', '3/31'] },
  { label: 'Full Month', range: ['3/1', '3/31'] },
  { label: 'First Half', range: ['3/1', '3/15'] },
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
  const [dateRange, setDateRange] = useState<[string, string]>(['3/1', '3/31'])

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
