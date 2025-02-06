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
    delete(budget: Budget) {
      this.budgets = this.budgets.filter(
        (b: Budget) => b.category !== budget.category,
      )
      localStorage.setItem('budgets', JSON.stringify(this.budgets))
    },
    add(budget: Budget) {
      const existingEntries = JSON.parse(
        localStorage.getItem('budgets') || '[]',
      )
      existingEntries.push({
        category: budget.category,
        maximum: budget.maximum,
        theme: budget.theme,
      })
      this.budgets = existingEntries.sort((a: Budget, b: Budget) =>
        a.category.localeCompare(b.category),
      )
      localStorage.setItem('budgets', JSON.stringify(this.budgets))
    },
    edit(oldBudget: Budget, newBudget: Budget) {
      this.delete(oldBudget)
      this.add(newBudget)
    },
  },
})
