import { makeAutoObservable } from 'mobx';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  login: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

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
      const savedRememberMe = localStorage.getItem('rememberMe');
      const savedAccessToken = localStorage.getItem('accessToken');
      const savedRefreshToken = localStorage.getItem('refreshToken');
      const sessionAccessToken = sessionStorage.getItem('accessToken');
      const sessionRefreshToken = sessionStorage.getItem('refreshToken');

      this.rememberMe = savedRememberMe === 'true';

      if (this.rememberMe && savedAccessToken && savedRefreshToken) {
        try {
          this.user = {
            id: parseInt(localStorage.getItem('userId') || '0'),
            username: localStorage.getItem('username') || '',
            email: localStorage.getItem('email') || '',
            firstName: localStorage.getItem('firstName') || '',
            lastName: localStorage.getItem('lastName') || '',
            gender: localStorage.getItem('gender') || '',
            image: localStorage.getItem('image') || '',
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
            email: sessionStorage.getItem('email') || '',
            firstName: sessionStorage.getItem('firstName') || '',
            lastName: sessionStorage.getItem('lastName') || '',
            gender: sessionStorage.getItem('gender') || '',
            image: sessionStorage.getItem('image') || '',
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
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('userId', data.user.id.toString());
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('firstName', data.user.firstName);
        localStorage.setItem('lastName', data.user.lastName);
        localStorage.setItem('gender', data.user.gender);
        localStorage.setItem('image', data.user.image);
      } else {
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('refreshToken', data.refreshToken);
        sessionStorage.setItem('userId', data.user.id.toString());
        sessionStorage.setItem('username', data.user.username);
        sessionStorage.setItem('email', data.user.email);
        sessionStorage.setItem('firstName', data.user.firstName);
        sessionStorage.setItem('lastName', data.user.lastName);
        sessionStorage.setItem('gender', data.user.gender);
        sessionStorage.setItem('image', data.user.image);
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

    localStorage.removeItem('authUser');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('gender');
    localStorage.removeItem('image');

    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('lastName');
    sessionStorage.removeItem('gender');
    sessionStorage.removeItem('image');
  }

  updateRememberMe(value: boolean) {
    this.rememberMe = value;
    if (!value) {
      localStorage.removeItem('rememberMe');
    }
  }

  clearError() {
    this.error = null;
  }
}

export const authorizationStore = new AuthorizationStore();
