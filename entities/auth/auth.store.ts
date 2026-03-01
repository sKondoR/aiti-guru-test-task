import { makeAutoObservable } from 'mobx'
import type { AuthUser } from './auth.types'

export class AuthorizationStore {
  isAuthenticated = false
  user: AuthUser | null = null
  rememberMe = false
  isLoading = false
  error: string | null = null

  constructor() {
    makeAutoObservable(this)
    this.loadAuthData()
  }

  loadAuthData() {
    if (typeof window !== 'undefined') {
      const savedAccessToken = localStorage.getItem('accessToken')
      const savedRefreshToken = localStorage.getItem('refreshToken')
      const sessionAccessToken = sessionStorage.getItem('accessToken')
      const sessionRefreshToken = sessionStorage.getItem('refreshToken')

      if (savedAccessToken && savedRefreshToken) {
        try {
          this.user = {
            id: parseInt(localStorage.getItem('userId') || '0'),
            username: localStorage.getItem('username') || '',
          }
          this.isAuthenticated = true
          this.rememberMe = true
        } catch (e) {
          console.error('Failed to parse auth data:', e)
        }
      } else if (sessionAccessToken && sessionRefreshToken) {
        try {
          this.user = {
            id: parseInt(sessionStorage.getItem('userId') || '0'),
            username: sessionStorage.getItem('username') || '',
          }
          this.isAuthenticated = true
          this.rememberMe = false
        } catch (e) {
          console.error('Failed to parse auth data:', e)
        }
      }
    }
  }

  async login(username: string, password: string, rememberMe: boolean) {
    this.isLoading = true
    this.error = null

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          rememberMe,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        this.error = data.error || 'Ошибка авторизации'
        this.isLoading = false
        return
      }

      this.user = { ...data.user }
      this.isAuthenticated = true
      this.rememberMe = rememberMe

      const storage = rememberMe ? localStorage : sessionStorage
      storage.setItem('accessToken', data.accessToken)
      storage.setItem('refreshToken', data.refreshToken)
      storage.setItem('username', data.user.username)
      storage.setItem('userId', data.user.id)

      this.isLoading = false
    } catch (error) {
      console.error('Login error:', error)
      this.error = 'Ошибка сети'
      this.isLoading = false
    }
  }

  async checkAuth() {
    try {
      const response = await fetch('/api/auth', {
        method: 'GET',
      })

      const data = await response.json()

      if (response.ok && data.user) {
        this.user = { ...data.user }
        this.isAuthenticated = true
        this.rememberMe = data.rememberMe || false
      } else {
        this.logout()
      }
    } catch (error) {
      console.error('Check auth error:', error)
      this.logout()
    }
  }

  logout() {
    this.isAuthenticated = false
    this.user = null
    this.rememberMe = false

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('refreshToken')
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('userId')
  }

  updateRememberMe(value: boolean) {
    this.rememberMe = value
  }

  clearError() {
    this.error = null
  }
}

// export const authorizationStore = new AuthorizationStore()
