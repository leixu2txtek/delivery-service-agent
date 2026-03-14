import { defineStore } from 'pinia'

interface AuthState {
  token: string | null
  phoneNumber: string | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token') || null,
    phoneNumber: localStorage.getItem('phoneNumber') || null,
    isAuthenticated: !!localStorage.getItem('token')
  }),

  actions: {
    setCredentials(token: string, phoneNumber: string) {
      this.token = token
      this.phoneNumber = phoneNumber
      this.isAuthenticated = true

      localStorage.setItem('token', token)
      localStorage.setItem('phoneNumber', phoneNumber)
    },

    logout() {
      this.token = null
      this.phoneNumber = null
      this.isAuthenticated = false

      localStorage.removeItem('token')
      localStorage.removeItem('phoneNumber')
    }
  }
})