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

export function formattedDueDate(date: string) {
  const number = new Date(date).getDate()
  const nthNumber =
    number > 0
      ? ['th', 'st', 'nd', 'rd'][
          (number > 3 && number < 21) || number % 10 > 3 ? 0 : number % 10
        ]
      : ''
  return `Monthly-${number}${nthNumber}`
}
