import { defineStore } from 'pinia'
import { transactions } from '~/content/data.json'

export const useTransactionsStore = defineStore('transactions', {
  state: () => {
    return {
      transactions: transactions,
    }
  },
})
