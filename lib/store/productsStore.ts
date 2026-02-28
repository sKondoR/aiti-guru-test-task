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

    this.productsQueryObserver = new QueryObserver<ProductsResponse, Error>(this.queryClient, {
      queryKey: ['products'],
      queryFn: async (): Promise<ProductsResponse> => {
        const searchParams = new URLSearchParams({
          skip: ((this.page - 1) * this.limit).toString(),
          limit: this.limit.toString(),
          search: this.searchQuery,
        })
        
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
        console.log('runInAction: ')
        this.products = result?.data?.products || []
        this.total = result?.data?.total || 0
        this.isLoading = result.isLoading
        this.error = result.error?.message || null
      })
    })
  }

  // Method to manually refetch
  async refetchProducts() {
    this.updateQuery()
    await this.queryClient.refetchQueries({ queryKey: ['products'] })
  }

  // Method to update query parameters
  private updateQuery() {
    console.log('updateQuery');
    this.productsQueryObserver.setOptions({
      queryKey: ['products', this.page, this.sortBy, this.order],
      queryFn: async (): Promise<ProductsResponse> => {
        const searchParams = new URLSearchParams({
          skip: ((this.page - 1) * this.limit).toString(),
          limit: this.limit.toString(),
          search: this.searchQuery,
          sortBy: this.sortBy,
          order: this.order,
        })
        
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
        const response = await fetch(`${baseUrl}/api/products?${searchParams}`)
        if (!response.ok) throw new Error('Failed to fetch products')
        return response.json()
      },
    })
  }

  // Method to invalidate cache
  invalidateProducts() {
    this.updateQuery()
    this.queryClient.invalidateQueries({ queryKey: ['products'] })
  }

  // Cleanup
  destroy() {
    this.productsQueryObserver.destroy()
  }

  setPage(page: number) {
    this.page = page
    this.updateQuery()
  }

  setSearchQuery(query: string) {
    this.searchQuery = query
    this.page = 1
    this.updateQuery()
  }

  toggleRowSelection(id: string) {
    if (this.selectedRows.includes(id)) {
      this.selectedRows = this.selectedRows.filter(rowId => rowId !== id)
    } else {
      this.selectedRows.push(id)
    }
  }

  setSortBy(column: string) {
    console.log('setSortBy ', column);
    if (this.sortBy === column) {
      // Toggle order if same column is clicked
      this.order = this.order === 'asc' ? 'desc' : 'asc'
    } else {
      // Set new column and default to asc
      this.sortBy = column
      this.order = 'asc'
    }
    this.updateQuery()
  }
}