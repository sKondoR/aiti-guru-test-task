import { makeAutoObservable } from 'mobx';
import { AuthUser } from './auth.types';

export class AuthorizationStore {
  isAuthenticated = false;
  user: AuthUser | null = null;
  rememberMe = false;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadAuthData();
  }

  loadAuthData() {
    if (typeof window !== 'undefined') {
      const savedAccessToken = localStorage.getItem('accessToken');
      const savedRefreshToken = localStorage.getItem('refreshToken');
      const sessionAccessToken = sessionStorage.getItem('accessToken');
      const sessionRefreshToken = sessionStorage.getItem('refreshToken');

      if (this.rememberMe && savedAccessToken && savedRefreshToken) {
        try {
          this.user = {
            id: parseInt(localStorage.getItem('userId') || '0'),
            username: localStorage.getItem('username') || '',
            login: '',
            password: '',
          };
          this.isAuthenticated = true;
        } catch (e) {
          console.error('Failed to parse auth data:', e);
        }
      } else if (sessionAccessToken && sessionRefreshToken) {
        try {
          this.user = {
            id: parseInt(sessionStorage.getItem('userId') || '0'),
            username: sessionStorage.getItem('username') || '',
            login: '',
            password: '',
          };
          this.isAuthenticated = true;
        } catch (e) {
          console.error('Failed to parse auth data:', e);
        }
      }
    }
  }

  async login(username: string, password: string, rememberMe: boolean) {
    this.isLoading = true;
    this.error = null;

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
      });

      const data = await response.json();

      if (!response.ok) {
        this.error = data.error || 'Ошибка авторизации';
        this.isLoading = false;
        return;
      }

      // Сохраняем данные пользователя и токены
      this.user = data.user;
      this.isAuthenticated = true;
      this.rememberMe = rememberMe;

      if (rememberMe) {
        
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      } else {
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('refreshToken', data.refreshToken);
      }

      this.isLoading = false;
    } catch (error) {
      console.error('Login error:', error);
      this.error = 'Ошибка сети';
      this.isLoading = false;
    }
  }

  async checkAuth() {
    try {
      const response = await fetch('/api/auth', {
        method: 'GET',
      });

      const data = await response.json();

      if (response.ok && data.user) {
        this.user = data.user;
        this.isAuthenticated = true;
        this.rememberMe = data.rememberMe || false;
      } else {
        this.logout();
      }
    } catch (error) {
      console.error('Check auth error:', error);
      this.logout();
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.user = null;
    this.rememberMe = false;

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
  }

  updateRememberMe(value: boolean) {
    this.rememberMe = value;
  }

  clearError() {
    this.error = null;
  }
}

export const authorizationStore = new AuthorizationStore();
