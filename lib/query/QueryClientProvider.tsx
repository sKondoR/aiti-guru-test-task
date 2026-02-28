'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { rootStore } from '../store/rootStore'

export default function QueryClientProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
     <QueryClientProvider client={rootStore.queryClient}>
      {children}
    </QueryClientProvider>
  )
}