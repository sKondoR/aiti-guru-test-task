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

  useEffect(() => {
    setIsHydrated(true)
    if (!authorizationStore.isAuthenticated) {
      const redirectUrl = `${redirectPath}?redirect=${encodeURIComponent(currentPath)}`
      router.replace(redirectUrl)
    }
  }, [currentPath, redirectPath, router])

  if (!isHydrated) {
    return null
  }

  if (!authorizationStore.isAuthenticated) {
    return null
  }

  return <>{children}</>
}
