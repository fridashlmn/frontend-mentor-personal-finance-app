import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { Budget } from '~/@types/types'

export const useBudgetsStore = defineStore('budgets', {
  state: () => {
    return {
      budgets: useLocalStorage('budgets', localStorage, {
        mergeDefaults: true,
      }),
    }
  },
  actions: {
    delete(category: string) {
      this.budgets = this.budgets.filter((b: Budget) => b.category !== category)
      localStorage.setItem('budgets', JSON.stringify(this.budgets))
    },
    add(category: string, maximum: number, theme: string) {
      const existingEntries = JSON.parse(
        localStorage.getItem('budgets') || '[]',
      )
      existingEntries.push({
        category: category,
        maximum: maximum,
        theme: theme,
      })
      this.budgets = existingEntries
      localStorage.setItem('budgets', JSON.stringify(this.budgets))
    },
  },
})
