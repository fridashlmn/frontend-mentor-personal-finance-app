import { defineStore } from 'pinia'
import { pots } from '~/content/data.json'

export const usePotsStore = defineStore('pots', {
  state: () => {
    return {
      pots: pots,
    }
  },
})
