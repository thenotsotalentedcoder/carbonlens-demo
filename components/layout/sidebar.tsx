'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  House,
  ChartBar,
  CloudArrowUp,
  Lightbulb,
  FileText,
  Gear,
  Bell,
  BookOpen,
  SignOut,
  CaretLeft,
  CaretRight,
  Leaf,
  CalendarBlank,
  Flask,
} from '@phosphor-icons/react'
import { useState } from 'react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: House },
  { name: 'Emissions', href: '/emissions', icon: ChartBar },
  { name: 'Data Entry', href: '/data-entry', icon: CloudArrowUp },
  { name: 'Insights', href: '/insights', icon: Lightbulb },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Reporting Periods', href: '/reporting-periods', icon: CalendarBlank },
  { name: 'Methodology', href: '/methodology', icon: BookOpen },
]

const secondaryNavigation = [
  { name: 'Settings', href: '/settings', icon: Gear },
  { name: 'Notifications', href: '/notifications', icon: Bell },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-200',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-8 h-8 rounded bg-sidebar-accent">
          <Leaf className="w-5 h-5 text-sidebar-foreground" weight="fill" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-serif text-lg font-medium tracking-tight">CarbonLens</span>
            <span className="text-xs text-sidebar-foreground/70">GHG Reporting</span>
          </div>
        )}
      </div>

      {/* Demo Mode Banner */}
      {!collapsed && (
        <div className="mx-3 mt-3 px-3 py-2 rounded bg-amber-900/30 border border-amber-600/40">
          <div className="flex items-center gap-2">
            <Flask className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" weight="fill" />
            <span className="text-xs text-amber-300 font-medium">Demo Mode</span>
          </div>
          <p className="text-[10px] text-amber-400/80 mt-0.5 leading-tight">NovaTech University — Sample Data</p>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto scrollbar-thin min-h-0">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" weight={isActive ? 'fill' : 'regular'} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Secondary Navigation */}
      <div className="px-2 py-4 space-y-1 border-t border-sidebar-border">
        {secondaryNavigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" weight={isActive ? 'fill' : 'regular'} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </div>

      {/* Collapse Toggle */}
      <div className="px-2 py-3 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full gap-2 px-3 py-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground rounded hover:bg-sidebar-accent/50 transition-colors"
        >
          {collapsed ? (
            <CaretRight className="w-4 h-4" />
          ) : (
            <>
              <CaretLeft className="w-4 h-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>

      {/* User Section */}
      <div className="px-2 py-3 border-t border-sidebar-border">
        <div
          className={cn(
            'flex items-center gap-3 px-3 py-2',
            collapsed && 'justify-center'
          )}
        >
          <div className="w-8 h-8 rounded bg-sidebar-accent flex items-center justify-center text-sm font-medium">
            AK
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Dr. Ayesha Khan</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">Admin</p>
            </div>
          )}
          {!collapsed && (
            <button className="p-1.5 text-sidebar-foreground/70 hover:text-sidebar-foreground rounded hover:bg-sidebar-accent/50 transition-colors">
              <SignOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
