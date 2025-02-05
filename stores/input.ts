import { defineStore } from 'pinia'

export const useInputStore = defineStore('inputField', {
  state: () => {
    return { inputValue: '' }
  },
  actions: {
    clear() {
      this.inputValue = ''
    },
  },
})
