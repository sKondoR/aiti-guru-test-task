'use client'

import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import styles from './loginForm.module.css'
import { validateLoginForm } from './loginForm.util'

import { SimpleIcon } from '@/shared/ui/SimpleIcon'
import { authorizationStore } from '@/entities/auth/auth.store'

type ValidationErrors = {
  login?: string;
  password?: string;
}

export const LoginForm: React.FC = observer(() => {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true)
  const [validation, setValidation] = useState<ValidationErrors>({})

  const searchParams = useSearchParams();

  useEffect(() => {
    const checkAuth = async () => {
      await authorizationStore.checkAuth()
      setIsCheckingAuth(false)
    }
    checkAuth()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    authorizationStore.clearError()
    
    const validationCheck = validateLoginForm(login, password)
    setValidation(validationCheck)
    if (validationCheck.login || validationCheck.password) return

    await authorizationStore.login(login, password, rememberMe)
    if (authorizationStore.isAuthenticated) {
        const redirect = searchParams.get('redirect') || '/';
        window.location.href = redirect || '/';        
    }
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidation({})
    setLogin(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidation({})
    setPassword(e.target.value)
  }

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked)
  }

  if (isCheckingAuth) {
    return (
      <div className="text-center py-8">
        <FontAwesomeIcon icon={faSpinner} className="inline mr-2" spin />Проверка авторизации...
      </div>
    )
  }

  const hasErrorMsg = authorizationStore.error || validation.login || validation.password
  const isSubmitDisabled = !login.trim() || !password.trim() || authorizationStore.isLoading
  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-inter">
      <div>
        <label htmlFor="login" className={styles.label}>
          Логин
        </label>
        <div className="relative">
          <input
            type="text"
            id="login"
            value={login}
            onChange={handleLoginChange}
            className={`w-full px-12 py-3 border  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition
              ${validation.login ? 'border-red-500': 'border-gray-300'}
            `}placeholder="Введите логин"
          />
          <SimpleIcon
            src="/user.svg"
            alt="user icon"
            className="absolute top-3 left-3 text-gray-500"
          />
          <SimpleIcon
            src="/cross.svg"
            alt="clear user"
            className="absolute top-3 right-3 text-gray-500 c cursor-pointer"
            onClick={() => setLogin('')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className={styles.label}>
          Пароль
        </label>
        <div className="relative">
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className={`w-full px-12 py-3 border  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition
              ${validation.password ? 'border-red-500': 'border-gray-300'}
            `}
            placeholder="Введите пароль"
          />
          <SimpleIcon
            src="/lock.svg"
            alt="password icon"
            className="absolute top-3 left-3 text-gray-500"
          />
          <SimpleIcon
            src="/eye-off.svg"
            alt="show password icon"
            className="absolute top-3 right-3 text-gray-500"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={handleRememberMeChange}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="rememberMe" className="ml-2 text-md text-gray-400 cursor-pointer">
          Запомнить данные
        </label>
      </div>

      {hasErrorMsg && (
        <div className="text-red-500 text-center text-sm">
          {authorizationStore.error} {validation.login} {validation.password}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitDisabled}
        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-200 disabled:cursor-not-allowed transition"
      >
        {authorizationStore.isLoading ? 'Вход...' : 'Войти'}
      </button>
      <div className="flex relative items-center mt-4 mb-6">
        <div className="flex-1 inset-x-0 h-px bg-gray-300 my-3"></div>
        <div className="mx-2 text-gray-400">или</div>
        <div className="flex-1 inset-x-0 h-px bg-gray-300 my-3"></div>
      </div>
      <div className="text-[18px] text-center mt-8 text-gray-600">
        Нет аккаунта? <a href="/" className="ml-2 font-bold underline underline-offset-4 hover:no-underline">Создать</a>
      </div>
    </form>
  )
})
