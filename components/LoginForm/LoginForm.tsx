'use client'

import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { authorizationStore } from '@/lib/store/authorizationStore'
import { useSearchParams } from "next/navigation";

export const LoginForm: React.FC = observer(() => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const searchParams = useSearchParams();

  useEffect(() => {
    // Проверяем аутентификацию при загрузке
    const checkAuth = async () => {
      await authorizationStore.checkAuth()
      setIsCheckingAuth(false)
    }
    checkAuth()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    authorizationStore.clearError()
    await authorizationStore.login(login, password, rememberMe)
    const redirect = searchParams.get('redirect') || '/';
    window.location.href = redirect || '/';
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked)
  }

  if (isCheckingAuth) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Проверка авторизации...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="login" className="block text-sm font-medium text-gray-700 mb-2">
          Логин
        </label>
        <input
          type="text"
          id="login"
          value={login}
          onChange={handleLoginChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="Введите логин"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Пароль
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="Введите пароль"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={handleRememberMeChange}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
          Запомнить данные
        </label>
      </div>

      {authorizationStore.error && (
        <div className="text-red-500 text-sm">
          {authorizationStore.error}
        </div>
      )}

      <button
        type="submit"
        disabled={authorizationStore.isLoading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed transition font-medium"
      >
        {authorizationStore.isLoading ? 'Вход...' : 'Войти'}
      </button>
    </form>
  )
})
