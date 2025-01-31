import type { SortOption } from '~/@types/types'

export const selectCategories = [
  { id: 2, label: 'Entertainment' },
  { id: 3, label: 'Bills' },
  { id: 4, label: 'Groceries' },
  { id: 5, label: 'Dining Out' },
  { id: 6, label: 'Transportation' },
  { id: 7, label: 'Personal Care' },
  { id: 8, label: 'Education' },
  { id: 9, label: 'Lifecycle' },
  { id: 10, label: 'Shopping' },
  { id: 11, label: 'General' },
]
export const selectCategoriesWithAll: { id: number; label: string }[] = [
  { id: 1, label: 'All Transactions' },
  ...selectCategories,
]

export const selectSorting: SortOption[] = [
  { id: 1, label: 'Latest', direction: 'desc', sortBy: 'date' },
  { id: 2, label: 'Oldest', direction: 'asc', sortBy: 'date' },
  { id: 3, label: 'A to Z', direction: 'asc', sortBy: 'name' },
  { id: 4, label: 'Z to A', direction: 'desc', sortBy: 'name' },
  { id: 5, label: 'Highest', direction: 'desc', sortBy: 'amount' },
  { id: 6, label: 'Lowest', direction: 'asc', sortBy: 'amount' },
]

export const selectColors: {
  id: number
  label: string
  theme: string
  disabled: boolean
}[] = [
  { id: 1, label: 'Green', theme: '#277c78', disabled: false },
  { id: 2, label: 'Yellow', theme: '#f2cdac', disabled: false },
  { id: 3, label: 'Cyan', theme: '#82c9d7', disabled: false },
  { id: 4, label: 'Navy', theme: '#626070', disabled: false },
  { id: 5, label: 'Red', theme: '#c94736', disabled: false },
  { id: 6, label: 'Purple', theme: '#af81ba', disabled: false },
  { id: 7, label: 'Turquoise', theme: '#597c7c', disabled: false },
  { id: 8, label: 'Brown', theme: '#93674F', disabled: false },
  { id: 9, label: 'Magenta', theme: '#934f6f', disabled: false },
  { id: 10, label: 'Blue', theme: '#3f82b2', disabled: false },
  { id: 11, label: 'Navy Grey', theme: '#97A0AC', disabled: false },
  { id: 12, label: 'Army Green', theme: '#7f9161', disabled: false },
  { id: 13, label: 'Gold', theme: '#cab361', disabled: false },
  { id: 14, label: 'Orange', theme: '#BE6C49', disabled: false },
]
