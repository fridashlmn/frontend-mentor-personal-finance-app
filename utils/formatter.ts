import { format } from 'date-fns'

export function toCurrency(value: number, variant?: string): string {
  if (variant === 'short') {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    })
    return formatter.format(value)
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  return formatter.format(value)
}

export function formatDay(date: string): string {
  return format(date, 'do')
}

export function formatDate(date: string): string {
  return format(date, 'd MMM y')
}
