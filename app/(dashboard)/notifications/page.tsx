'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { mockNotifications } from '@/lib/data/mock-insights'
import type { Notification } from '@/lib/types'
import {
  Bell,
  Warning,
  FileArrowUp,
  ClockCountdown,
  CheckCircle,
  Info,
  ArrowSquareOut,
  Check,
  MagnifyingGlass,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

function getNotificationIcon(type: Notification['type']) {
  switch (type) {
    case 'anomaly_detected':
      return <Warning className="w-5 h-5 text-red-500" weight="fill" />
    case 'document_pending_review':
      return <FileArrowUp className="w-5 h-5 text-blue-500" weight="fill" />
    case 'low_confidence_extraction':
      return <Warning className="w-5 h-5 text-amber-500" weight="fill" />
    case 'data_validation':
      return <Info className="w-5 h-5 text-amber-500" weight="fill" />
    case 'deadline_reminder':
      return <ClockCountdown className="w-5 h-5 text-orange-500" weight="fill" />
    case 'report_ready':
      return <CheckCircle className="w-5 h-5 text-green-600" weight="fill" />
    case 'system':
      return <Info className="w-5 h-5 text-muted-foreground" weight="fill" />
    default:
      return <Bell className="w-5 h-5 text-muted-foreground" weight="fill" />
  }
}

function getNotificationTypeBadge(type: Notification['type']) {
  switch (type) {
    case 'anomaly_detected':
      return { label: 'Anomaly', className: 'bg-red-100 text-red-700 border-red-200' }
    case 'document_pending_review':
      return { label: 'Document Review', className: 'bg-blue-100 text-blue-700 border-blue-200' }
    case 'low_confidence_extraction':
      return { label: 'Low Confidence', className: 'bg-amber-100 text-amber-700 border-amber-200' }
    case 'data_validation':
      return { label: 'Missing Data', className: 'bg-amber-100 text-amber-700 border-amber-200' }
    case 'deadline_reminder':
      return { label: 'Deadline', className: 'bg-orange-100 text-orange-700 border-orange-200' }
    case 'report_ready':
      return { label: 'Report Ready', className: 'bg-green-100 text-green-700 border-green-200' }
    case 'system':
      return { label: 'System', className: 'bg-muted text-muted-foreground border-border' }
    default:
      return { label: 'Info', className: 'bg-muted text-muted-foreground border-border' }
  }
}

function formatTimeAgo(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date('2025-04-13T12:00:00Z')
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMins = Math.floor(diffMs / (1000 * 60))
  if (diffDays > 30) return `${Math.floor(diffDays / 30)}mo ago`
  if (diffDays > 0) return `${diffDays}d ago`
  if (diffHours > 0) return `${diffHours}h ago`
  return `${diffMins}m ago`
}

type FilterTab = 'all' | 'unread' | 'anomalies' | 'data' | 'reports'

const filterTabs: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'anomalies', label: 'Anomalies' },
  { id: 'data', label: 'Data' },
  { id: 'reports', label: 'Reports' },
]

function filterNotifications(notifications: Notification[], tab: FilterTab): Notification[] {
  switch (tab) {
    case 'unread':
      return notifications.filter(n => !n.isRead)
    case 'anomalies':
      return notifications.filter(n => n.type === 'anomaly_detected' || n.type === 'low_confidence_extraction')
    case 'data':
      return notifications.filter(n =>
        n.type === 'data_validation' ||
        n.type === 'document_pending_review' ||
        n.type === 'deadline_reminder'
      )
    case 'reports':
      return notifications.filter(n => n.type === 'report_ready' || n.type === 'system')
    default:
      return notifications
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [activeTab, setActiveTab] = useState<FilterTab>('all')

  const unreadCount = notifications.filter(n => !n.isRead).length
  const filtered = filterNotifications(notifications, activeTab)

  function markAsRead(id: string) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))
  }

  function markAllAsRead() {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Notifications"
        description="System alerts, data flags, and activity updates"
      />

      <div className="p-6 max-w-4xl">
        {/* Stats row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground text-base">{notifications.length}</span> total
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground text-base">{unreadCount}</span> unread
            </div>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              <Check className="w-4 h-4" />
              Mark all as read
            </button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-4 border-b border-border">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
              {tab.id === 'unread' && unreadCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-red-100 text-red-700 rounded-full font-semibold">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications list */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Bell className="w-10 h-10 text-muted-foreground/40 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">No notifications in this category</p>
          </div>
        ) : (
          <div className="space-y-1">
            {filtered.map(notification => {
              const badge = getNotificationTypeBadge(notification.type)
              return (
                <div
                  key={notification.id}
                  className={cn(
                    'flex items-start gap-4 px-4 py-4 rounded border transition-colors',
                    notification.isRead
                      ? 'bg-card border-border'
                      : 'bg-primary/5 border-primary/20'
                  )}
                >
                  {/* Unread dot */}
                  <div className="mt-0.5 flex-shrink-0">
                    {!notification.isRead ? (
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                    ) : (
                      <div className="w-2 h-2" />
                    )}
                  </div>

                  {/* Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn(
                        'text-xs px-2 py-0.5 rounded border font-medium',
                        badge.className
                      )}>
                        {badge.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{formatTimeAgo(notification.createdAt)}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground mb-0.5">{notification.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{notification.message}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {notification.actionUrl && (
                      <Link
                        href={notification.actionUrl}
                        className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        View <ArrowSquareOut className="w-3.5 h-3.5" />
                      </Link>
                    )}
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted"
                      >
                        Dismiss
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
