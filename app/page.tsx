import ProductsPageContent from '@/components/products/ProductsPageContent'

import { ProtectedRoute } from '@/lib/auth/ProtectedRoute'

export default function HomePage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen py-5">
        <ProductsPageContent />
      </main>
    </ProtectedRoute>
  )
}