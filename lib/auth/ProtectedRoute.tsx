'use client'

import { useEffect, useState } from 'react'
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
  const [isHydrated, setIsHydrated] = useState(false)
  const [hasRedirected, setHasRedirected] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated || hasRedirected) return
    
    if (!authorizationStore.isAuthenticated) {
      const redirectUrl = `${redirectPath}?redirect=${encodeURIComponent(currentPath)}`
      router.replace(redirectUrl)
      setHasRedirected(true)
    }
  }, [currentPath, redirectPath, router, isHydrated, hasRedirected, authorizationStore.isAuthenticated])

  if (!isHydrated) {
    return null
  }

  if (!authorizationStore.isAuthenticated) {
    return null
  }

  return <>{children}</>
}
