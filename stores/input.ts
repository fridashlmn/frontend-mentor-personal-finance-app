import { defineStore } from 'pinia'

export const useInputStore = (id: number) =>
  defineStore(`input/${id}`, {
    state: () => {
      return { inputValue: '', error: '' }
    },
    actions: {
      clearError() {
        this.error = ''
      },
      clear() {
        this.inputValue = ''
        this.clearError()
      },
    },
  })()
