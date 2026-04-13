'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockInsights } from '@/lib/data/mock-insights'
import { Warning, Info, WarningCircle, ArrowRight } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils/formatters'

const severityConfig = {
  critical: {
    icon: WarningCircle,
    color: 'text-destructive',
    bg: 'bg-destructive/10',
    badge: 'destructive' as const,
  },
  warning: {
    icon: Warning,
    color: 'text-warning',
    bg: 'bg-warning/10',
    badge: 'secondary' as const,
  },
  info: {
    icon: Info,
    color: 'text-info',
    bg: 'bg-info/10',
    badge: 'outline' as const,
  },
}

export function InsightSummary() {
  const recentInsights = mockInsights.slice(0, 3)
  const unreadCount = mockInsights.filter((i) => !i.isRead).length

  return (
    <Card className="border-border">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Recent Insights</CardTitle>
        {unreadCount > 0 && (
          <Badge variant="secondary" className="text-xs">
            {unreadCount} new
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentInsights.map((insight) => {
            const config = severityConfig[insight.severity]
            const Icon = config.icon

            return (
              <div
                key={insight.id}
                className={cn(
                  'flex items-start gap-3 p-3 rounded border border-border',
                  !insight.isRead && 'bg-muted/50'
                )}
              >
                <div className={cn('p-1.5 rounded', config.bg)}>
                  <Icon className={cn('w-4 h-4', config.color)} weight="fill" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">
                      {insight.title}
                    </p>
                    {!insight.isRead && (
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {insight.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={config.badge} className="text-[10px] px-1.5 py-0">
                      {insight.type}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">
                      {formatDate(insight.createdAt, 'relative')}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <Link
          href="/insights"
          className="flex items-center justify-center gap-2 mt-4 py-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          View all insights
          <ArrowRight className="w-4 h-4" />
        </Link>
      </CardContent>
    </Card>
  )
}
