'use client'

import { Bell, MagnifyingGlass, CaretDown, CalendarBlank, CheckCircle } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { mockOrganisation } from '@/lib/data/mock-organisation'
import { mockNotifications } from '@/lib/data/mock-insights'
import { mockReportingPeriods } from '@/lib/data/mock-periods'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface HeaderProps {
  title?: string
  description?: string
}

export function Header({ title, description }: HeaderProps) {
  const unreadCount = mockNotifications.filter((n) => !n.isRead).length
  const [activePeriodId, setActivePeriodId] = useState('rp-2024')
  const activePeriod = mockReportingPeriods.find(p => p.id === activePeriodId) ?? mockReportingPeriods[0]

  const statusColors: Record<string, string> = {
    in_progress: 'text-green-600',
    completed: 'text-muted-foreground',
    verified: 'text-primary',
    draft: 'text-amber-600',
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
      <div className="flex-1 min-w-0">
        {title && (
          <h1 className="font-serif text-2xl font-medium text-foreground truncate">
            {title}
          </h1>
        )}
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden lg:block">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-56 pl-9 pr-4 py-2 text-sm bg-muted border border-border rounded focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring"
          />
        </div>

        {/* Reporting Period Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="hidden md:flex items-center gap-2 border-dashed">
              <CalendarBlank className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{activePeriod.fiscalYear}</span>
              <span className={cn('text-xs', statusColors[activePeriod.status])}>
                {activePeriod.status === 'in_progress' ? '● Active' : activePeriod.status === 'verified' ? '✓ Verified' : ''}
              </span>
              <CaretDown className="w-3.5 h-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Reporting Period
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {mockReportingPeriods.map((period) => (
              <DropdownMenuItem
                key={period.id}
                onClick={() => setActivePeriodId(period.id)}
                className="flex items-center justify-between py-2.5 cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className={cn('font-medium text-sm', activePeriodId === period.id && 'text-primary')}>{period.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{period.type} · {period.status === 'in_progress' ? 'Active' : period.status}</span>
                </div>
                {activePeriodId === period.id && (
                  <CheckCircle className="w-4 h-4 text-primary" weight="fill" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/reporting-periods" className="text-xs text-muted-foreground">
                Manage periods →
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Organisation Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="hidden md:flex items-center gap-2">
              <span className="text-sm font-medium truncate max-w-[130px]">
                {mockOrganisation.name}
              </span>
              <CaretDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Current Organisation</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span className="font-medium">{mockOrganisation.name}</span>
                <span className="text-xs text-muted-foreground">{mockOrganisation.city}, {mockOrganisation.country}</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Switch Organisation</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              {unreadCount > 0 && (
                <span className="text-xs font-normal text-muted-foreground">
                  {unreadCount} unread
                </span>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {mockNotifications.slice(0, 4).map((notification) => (
              <DropdownMenuItem key={notification.id} asChild>
                <Link
                  href={notification.actionUrl || '/notifications'}
                  className="flex flex-col items-start gap-1 py-2"
                >
                  <div className="flex items-center gap-2">
                    {!notification.isRead && (
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    )}
                    <span className="font-medium text-sm">{notification.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground line-clamp-2 ml-4">
                    {notification.message}
                  </span>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/notifications" className="text-center w-full text-sm text-primary">
                View all notifications →
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
