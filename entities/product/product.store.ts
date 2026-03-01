import { makeAutoObservable, runInAction } from 'mobx'
import { Product, ProductsResponse } from '@/types'
import { QueryClient, QueryObserver } from '@tanstack/react-query'
import { isArraysEqualUnordered } from '@/shared/utils'

export type SortOrder = 'asc' | 'desc'

export class ProductsStore {
  private queryClient: QueryClient

  page = 1
  limit = 5
  searchQuery = ''
  sortBy = ''
  order = 'asc' as SortOrder

  products: Product[] = []
  total = 0
  isLoading = false
  error: string | null = null
  
  isAllSelected: boolean = false
  selectedRows: number[] = []

  private productsQueryObserver: QueryObserver<ProductsResponse>

  constructor(queryClient: QueryClient) {
    this.queryClient = queryClient
    makeAutoObservable(this)

    // if (typeof window !== 'undefined') {
    //   const saved = localStorage.getItem('sortState');
    //   if (saved) {
    //     const { sortBy, order } = JSON.parse(saved);
    //     this.sortBy = sortBy || '';
    //     this.order = order || 'asc';
    //   }
    // }
    
    this.productsQueryObserver = new QueryObserver<ProductsResponse, Error>(this.queryClient, {
      queryKey: ['products'],
      queryFn: async (): Promise<ProductsResponse> => {
        const searchParams = new URLSearchParams({
          skip: ((this.page - 1) * this.limit).toString(),
          limit: this.limit.toString(),
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
        this.isAllSelected = !!this.selectedRows.length && !!this.products.length && isArraysEqualUnordered(this.selectedRows, this.products.map(item => item.id))
      })
    })
  }

  // Method to manually refetch
  async refetchProducts() {
    this.updateQuery()
    await this.queryClient.refetchQueries({ queryKey: ['products'] })
  }

  private updateQuery() {
    this.isAllSelected = false
    this.productsQueryObserver.setOptions({
      queryKey: ['products', this.page, this.sortBy, this.order, this.searchQuery],
      queryFn: async (): Promise<ProductsResponse> => {  
        const searchParams = new URLSearchParams({
          skip: ((this.page - 1) * this.limit).toString(),
          limit: this.limit.toString(),
          q: this.searchQuery,
          sortBy: this.sortBy,
          order: this.order,
        })

        console.log('queryFn', searchParams, this.searchQuery);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
        const response = await fetch(`${baseUrl}/api/products?${searchParams}`)
        if (!response.ok) throw new Error('Failed to fetch products')
        return response.json()
      },
    })
  }

  invalidateProducts() {
    this.updateQuery()
    this.queryClient.invalidateQueries({ queryKey: ['products'] })
  }

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

  toggleSelectAll() {
    const ids = this.products.map(item => item.id)
    if (!this.isAllSelected) {
      this.selectedRows = [...this.selectedRows, ...ids]
      this.isAllSelected = true
    } else {
      const ids = this.products.map(item => item.id)
      this.selectedRows = this.selectedRows.filter(rowId => !ids.includes(rowId))
      this.isAllSelected = false
    }
  }

  toggleRowSelection(id: number) {
    if (this.selectedRows.includes(id)) {
      this.selectedRows = this.selectedRows.filter(rowId => rowId !== id)
    } else {
      this.selectedRows.push(id)
    }
    this.isAllSelected = isArraysEqualUnordered(this.selectedRows, this.products.map(item => item.id))
  }

  setSortBy(column: string) {
    if (this.sortBy === column) {
      this.order = this.order === 'asc' ? 'desc' : 'asc'
    } else {
      this.sortBy = column
      this.order = 'asc'
    }
    // if (typeof window !== 'undefined') {
    //   localStorage.setItem('sortState', JSON.stringify({ sortBy: this.sortBy, order: this.order }));
    // }
    this.updateQuery()
  }
}