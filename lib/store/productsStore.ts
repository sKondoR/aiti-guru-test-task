import { makeAutoObservable, runInAction } from 'mobx'
import { Product, ProductsResponse } from '@/types'
import { QueryClient, QueryObserver } from '@tanstack/react-query'

export type SortOrder = 'asc' | 'desc'

export class ProductsStore {
  private queryClient: QueryClient

  page = 1
  limit = 5
  searchQuery = ''
  selectedRows: string[] = []
  sortBy = ''
  order = 'asc' as SortOrder
  

  products: Product[] = []
  total = 0
  isLoading = false
  error: string | null = null

  private productsQueryObserver: QueryObserver<ProductsResponse>

  constructor(queryClient: QueryClient) {
    this.queryClient = queryClient
    makeAutoObservable(this)

    const searchParams = new URLSearchParams({
      skip: ((this.page - 1) * this.limit).toString(),
      limit: this.limit.toString(),
    })

    this.productsQueryObserver = new QueryObserver<ProductsResponse, Error>(this.queryClient, {
      queryKey: ['products'],
      queryFn: async (): Promise<ProductsResponse> => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
        const response = await fetch(`${baseUrl}/api/products?${searchParams}`)
        if (!response.ok) throw new Error('Failed to fetch products')
        return response.json()
      },
    })

    // Subscribe to query changes
    this.setupQuerySubscription()
  }

  private async setupQuerySubscription() {
    // Subscribe to query updates
    this.productsQueryObserver.subscribe((result) => {
      runInAction(() => {
        console.log('runInAction: ', result)
        this.products = result?.data?.products || []
        this.total = result?.data?.total || 0
        this.isLoading = result.isLoading
        this.error = result.error?.message || null
      })
    })
  }

  // Method to manually refetch
  async refetchProducts() {
    await this.queryClient.refetchQueries({ queryKey: ['products'] })
  }

  // Method to invalidate cache
  invalidateProducts() {
    this.queryClient.invalidateQueries({ queryKey: ['products'] })
  }

  // Cleanup
  destroy() {
    this.productsQueryObserver.destroy()
  }

  setPage(page: number) {
    this.page = page
  }

  setSearchQuery(query: string) {
    this.searchQuery = query
    this.page = 1
  }

  toggleRowSelection(id: string) {
    if (this.selectedRows.includes(id)) {
      this.selectedRows = this.selectedRows.filter(rowId => rowId !== id)
    } else {
      this.selectedRows.push(id)
    }
  }
}