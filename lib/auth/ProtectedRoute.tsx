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
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    
    if (!authorizationStore.isAuthenticated) {
      const redirectUrl = `${redirectPath}?redirect=${encodeURIComponent(currentPath)}`
      router.replace(redirectUrl)
      setShouldRedirect(true)
    }
  }, [authorizationStore.isAuthenticated, currentPath, redirectPath, router, isHydrated])

  // Wait for hydration and redirect check
  if (!isHydrated || shouldRedirect) {
    return null
  }

  // If not authenticated after redirect check, show null
  if (!authorizationStore.isAuthenticated) {
    return null
  }

  return <>{children}</>
}
