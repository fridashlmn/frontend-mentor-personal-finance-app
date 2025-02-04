import { defineStore } from 'pinia'
import { budgets } from '~/content/data.json'

export const useBudgetsStore = defineStore('budgets', {
  state: () => {
    return {
      budgets: budgets,
    }
  },
})
