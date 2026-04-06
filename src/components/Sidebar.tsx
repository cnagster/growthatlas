'use client'

import { ChevronLeft, ChevronRight, BarChart3, Briefcase, Radio, Layers, TrendingUp, ClipboardList } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { icon: BarChart3, label: 'Snapshot', page: 'snapshot' as const },
  { icon: Briefcase, label: 'Business', hasSubmenu: true, subItems: [
    { label: 'Daily Pacing', page: 'daily-pacing' as const },
    { label: 'Weekly / Monthly (Biz)', page: 'weekly-monthly' as const },
    { label: 'Site Metrics', page: null },
  ]},
  { icon: Radio, label: 'Channels', hasSubmenu: true, subItems: [
    { label: 'Channel Snapshot', page: 'channel-snapshot' as const },
    { label: 'Daily Heatmaps', page: 'daily-heatmaps' as const },
    { label: 'Weekly / Monthly (Channels)', page: 'channel-weekly-monthly' as const },
    { label: 'Creative + LPs', page: null },
    { label: 'Google Deep Dives', page: 'google-deep-dives' as const },
  ]},
  { icon: Layers, label: 'Deep Dives', hasSubmenu: true, subItems: [
    { label: 'Attribution', page: 'attribution' as const },
    { label: 'Cohorts', page: null },
    { label: 'Products', page: null },
    { label: 'Demographics', page: null },
  ]},
  { icon: TrendingUp, label: 'Projections', hasSubmenu: true },
  { icon: ClipboardList, label: 'Paid Media L10', page: 'paid-media-l10' as const },
]

interface SidebarProps {
  activePage: string
  onPageChange: (page: string) => void
}

export default function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  const isPageActive = (item: typeof navItems[number]) => {
    if (item.page) return activePage === item.page
    if (item.subItems) return item.subItems.some(sub => sub.page && activePage === sub.page)
    return false
  }

  return (
    <div className={`fixed left-0 top-0 h-full bg-sidebar text-white flex flex-col z-50 transition-all duration-200 ${collapsed ? 'w-16' : 'w-48'}`}>
      {/* Logo */}
      <div className="flex items-center justify-between px-4 h-12 border-b border-white/10">
        {!collapsed && <span className="font-bold text-lg tracking-wide">GROWTH ATLAS</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-sidebar-hover transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2">
        {navItems.map((item) => (
          <div key={item.label}>
            <button
              onClick={() => {
                if (item.page) {
                  onPageChange(item.page)
                } else if (item.subItems && !collapsed) {
                  setExpanded(expanded === item.label ? null : item.label)
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                isPageActive(item)
                  ? 'bg-sidebar-active text-white'
                  : 'text-gray-300 hover:bg-sidebar-hover hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.hasSubmenu && (
                    <ChevronRight
                      size={14}
                      className={`opacity-50 transition-transform ${expanded === item.label ? 'rotate-90' : ''}`}
                    />
                  )}
                </>
              )}
            </button>
            {/* Submenu */}
            {!collapsed && expanded === item.label && item.subItems && (
              <div className="py-1">
                {item.subItems.map((sub) => (
                  <button
                    key={sub.label}
                    onClick={() => sub.page && onPageChange(sub.page)}
                    className={`w-full text-left pl-11 pr-4 py-1.5 text-xs transition-colors ${
                      sub.page && activePage === sub.page
                        ? 'text-teal-chart font-medium'
                        : 'text-gray-400 hover:text-white hover:bg-sidebar-hover'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

      </nav>

    </div>
  )
}
