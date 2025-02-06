export interface Root {
  balance: Balance
  transactions: Transaction[]
  budgets: Budget[]
  pots: Pot[]
}

export interface Pot {
  name: string
  target: number
  total: number
  theme: string
}

export interface Balance {
  current: number
  income: number
  expenses: number
}

export interface Transaction {
  avatar: string
  name: string
  category: string
  date: string
  amount: number
  recurring: boolean
}

export interface Budget {
  category: string
  maximum: number
  theme: string
}

export type DoughnutChartData = {
  labels: string[]
  datasets: [{ backgroundColor: string[]; data: number[] }]
}

export interface Legend {
  theme: string
  label: string
  value: string
}

export interface SortOption {
  id: number
  label: string
  direction: string
  sortBy: string
}

export type SelectItem = {
  id: number
  label: string
  disabled: boolean
  theme?: string
}
