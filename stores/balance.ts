import { defineStore } from 'pinia'
import { balance } from '~/content/data.json'

export const useBalanceStore = defineStore('balance', {
  state: () => {
    return {
      balance: balance,
    }
  },
})
