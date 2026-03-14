import { defineStore } from 'pinia'

interface ThemeState {
  isDark: boolean
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    isDark: false
  }),

  getters: {
    naiveTheme: (state) => state.isDark ? window['naiveTheme']?.darkTheme : null
  },

  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
    }
  }
})