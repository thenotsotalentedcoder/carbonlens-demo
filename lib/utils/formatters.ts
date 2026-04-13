// Number formatting utilities for emission data

export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function formatEmission(value: number, unit = 'tCO2e'): string {
  if (value >= 1000000) {
    return `${formatNumber(value / 1000000, 2)} M${unit}`
  }
  if (value >= 1000) {
    return `${formatNumber(value / 1000, 1)} k${unit}`
  }
  return `${formatNumber(value, 1)} ${unit}`
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`
}

export function formatTrend(value: number): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}

export function formatCurrency(value: number, currency = 'PKR'): string {
  if (currency === 'PKR') {
    if (value >= 10000000) {
      return `PKR ${(value / 10000000).toFixed(2)} Cr`
    }
    if (value >= 100000) {
      return `PKR ${(value / 100000).toFixed(2)} Lac`
    }
    return `PKR ${formatNumber(value)}`
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(date: string | Date, format: 'short' | 'long' | 'relative' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  if (format === 'relative') {
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
  }
  
  if (format === 'long') {
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function formatConfidence(value: number): string {
  const percentage = Math.round(value * 100)
  if (percentage >= 90) return 'High'
  if (percentage >= 70) return 'Medium'
  return 'Low'
}

export function formatUncertainty(lower: number, upper: number): string {
  return `${lower.toFixed(0)} - ${upper.toFixed(0)} tCO2e`
}

export function getScopeName(scope: 'scope1' | 'scope2' | 'scope3'): string {
  const names = {
    scope1: 'Scope 1',
    scope2: 'Scope 2',
    scope3: 'Scope 3',
  }
  return names[scope]
}

export function getScopeDescription(scope: 'scope1' | 'scope2' | 'scope3'): string {
  const descriptions = {
    scope1: 'Direct emissions from owned or controlled sources',
    scope2: 'Indirect emissions from purchased energy',
    scope3: 'All other indirect emissions in the value chain',
  }
  return descriptions[scope]
}
