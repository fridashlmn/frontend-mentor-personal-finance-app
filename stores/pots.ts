import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { Pot } from '~/@types/types'

export const usePotsStore = defineStore('pots', {
  state: () => ({
    pots: useLocalStorage('pots', localStorage, { mergeDefaults: true }),
  }),
  actions: {
    delete(pot: Pot) {
      this.pots = this.pots.filter((p: Pot) => p.name !== pot.name)
      localStorage.setItem('pots', JSON.stringify(this.pots))
    },
  },
})
