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
    add(pot: Pot) {
      const existingEntries = JSON.parse(localStorage.getItem('pots') || '[]')
      existingEntries.unshift({
        name: pot.name,
        target: pot.target,
        total: pot.total,
        theme: pot.theme,
      })
      this.pots = existingEntries.sort((a: Pot, b: Pot) =>
        a.name.localeCompare(b.name),
      )
      localStorage.setItem('pots', JSON.stringify(this.pots))
    },
    withdraw(pot: Pot, newAmount: number) {
      this.delete(pot)
      pot.total = pot.total - newAmount
      this.add(pot)
    },
    addMoney(pot: Pot, newAmount: number) {
      this.delete(pot)
      pot.total = pot.total + newAmount
      this.add(pot)
    },
  },
})
