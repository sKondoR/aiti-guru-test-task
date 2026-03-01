'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { authorizationStore } from '@/entities/auth/auth.store'
import React from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectPath?: string
}

export function ProtectedRoute({ children, redirectPath = '/login' }: ProtectedRouteProps) {
  const router = useRouter()
  const currentPath = usePathname()

  useEffect(() => {
    if (!authorizationStore.isAuthenticated) {
      const redirectUrl = `${redirectPath}?redirect=${encodeURIComponent(currentPath)}`
      router.replace(redirectUrl)
    }
    console.log('isAuthenticated > ', authorizationStore.isAuthenticated);
  }, [authorizationStore.isAuthenticated, redirectPath, router])

  if (!authorizationStore.isAuthenticated) {
    return null
  }

  return <>{children}</>
}

// export function useRequireAuth() {
//   const router = useRouter()
//   const currentPath = usePathname()

//   if (!authorizationStore.isAuthenticated) {
//     const redirectUrl = `/login?redirect=${encodeURIComponent(currentPath)}`
//     router.replace(redirectUrl)
//   }
// }

// export function withAuth(WrappedComponent: React.ComponentType) {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   return function AuthenticatedComponent(props: any) {
//     const router = useRouter()
//     const currentPath = usePathname()

//     if (!authorizationStore.isAuthenticated) {
//       // Сохраняем URL, на который хотели попасть
//       const redirectUrl = `/login?redirect=${encodeURIComponent(currentPath)}`
//       router.replace(redirectUrl)
//       return null
//     }

//     return <WrappedComponent {...props} />
//   }
// }