import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { Pot } from '~/@types/types'

export const useBudgetsStore = defineStore('budgets', {
  state: () => ({
    budgets: useLocalStorage('budgets', localStorage, { mergeDefaults: true }),
  }),
  actions: {
    delete(category: string) {
      this.budgets = this.budgets.filter((p: Pot) => p.category !== category)
      localStorage.setItem('budgets', JSON.stringify(this.budgets))
    },
  },
})
