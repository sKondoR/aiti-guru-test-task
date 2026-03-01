import PageContent from '@/components/layout/PageContent'
import { ProtectedRoute } from '@/lib/auth/ProtectedRoute'

export default function HomePage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen py-5">
        <PageContent />
      </main>
    </ProtectedRoute>
  )
}