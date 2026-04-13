import { cn } from '@/lib/utils'
import { TrendUp, TrendDown, Minus } from '@phosphor-icons/react/dist/ssr'
import type { ReactNode } from 'react'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: number
  trendLabel?: string
  icon?: ReactNode
  className?: string
  variant?: 'default' | 'primary' | 'scope1' | 'scope2' | 'scope3'
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  trendLabel,
  icon,
  className,
  variant = 'default',
}: MetricCardProps) {
  const getTrendIcon = () => {
    if (trend === undefined || trend === 0) return <Minus className="w-3 h-3" />
    return trend > 0 ? (
      <TrendUp className="w-3 h-3" />
    ) : (
      <TrendDown className="w-3 h-3" />
    )
  }

  const getTrendColor = () => {
    if (trend === undefined || trend === 0) return 'text-muted-foreground'
    // For emissions, down is good (green), up is bad (red)
    return trend > 0 ? 'text-destructive' : 'text-success'
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-primary-foreground'
      case 'scope1':
        return 'bg-card border-l-4 border-l-chart-1'
      case 'scope2':
        return 'bg-card border-l-4 border-l-chart-2'
      case 'scope3':
        return 'bg-card border-l-4 border-l-chart-3'
      default:
        return 'bg-card'
    }
  }

  return (
    <div
      className={cn(
        'p-4 rounded border border-border',
        getVariantStyles(),
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              'text-xs font-medium uppercase tracking-wide',
              variant === 'primary' ? 'text-primary-foreground/70' : 'text-muted-foreground'
            )}
          >
            {title}
          </p>
          <p
            className={cn(
              'text-2xl font-semibold mt-1 truncate',
              variant === 'primary' ? 'text-primary-foreground' : 'text-foreground'
            )}
          >
            {value}
          </p>
          {subtitle && (
            <p
              className={cn(
                'text-xs mt-0.5',
                variant === 'primary' ? 'text-primary-foreground/70' : 'text-muted-foreground'
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              'p-2 rounded',
              variant === 'primary' ? 'bg-primary-foreground/10' : 'bg-muted'
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {trend !== undefined && (
        <div className={cn('flex items-center gap-1 mt-3 text-xs', getTrendColor())}>
          {getTrendIcon()}
          <span className="font-medium">
            {trend >= 0 ? '+' : ''}
            {trend.toFixed(1)}%
          </span>
          {trendLabel && (
            <span
              className={cn(
                variant === 'primary' ? 'text-primary-foreground/70' : 'text-muted-foreground'
              )}
            >
              {trendLabel}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
