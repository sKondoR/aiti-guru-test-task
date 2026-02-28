import { makeAutoObservable } from 'mobx';

export interface AuthUser {
  login: string;
  password: string;
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
      const savedUser = localStorage.getItem('authUser');
      const savedRememberMe = localStorage.getItem('rememberMe');

      if (savedUser) {
        try {
          this.user = JSON.parse(savedUser);
          this.isAuthenticated = true;
          this.rememberMe = savedRememberMe === 'true';
        } catch (e) {
          console.error('Failed to parse auth data:', e);
        }
      }
    }
  }

  login(login: string, password: string, rememberMe: boolean) {
    this.isLoading = true;
    this.error = null;

    // Симуляция аутентификации
    setTimeout(() => {
      if (login && password) {
        this.user = { login, password };
        this.isAuthenticated = true;
        this.rememberMe = rememberMe;

        if (rememberMe) {
          localStorage.setItem('authUser', JSON.stringify({ login, password }));
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('authUser');
          localStorage.removeItem('rememberMe');
        }

        this.isLoading = false;
      } else {
        this.error = 'Введите логин и пароль';
        this.isLoading = false;
      }
    }, 500);
  }

  logout() {
    this.isAuthenticated = false;
    this.user = null;
    this.rememberMe = false;
    localStorage.removeItem('authUser');
    localStorage.removeItem('rememberMe');
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
