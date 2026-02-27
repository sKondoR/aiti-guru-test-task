import { Product, Group } from '@/types'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

interface UseProductsState {
  data: Product[]
  isLoading: boolean
  error: string | null
}

export default function useFetchProducts() {
  const [state, setState] = useState<UseProductsState>({
    data: [],
    isLoading: false,
    error: null
  })

  const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(`api/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`)
    }
    return response.json()
  }

  const query = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    enabled: true,
    refetchInterval: 10 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
  })

  useEffect(() => {
    if (query.isLoading) {
      setState(prev => ({ ...prev, isLoading: true, error: null }))
    } else if (query.error) {
      console.error('Error in useFetchProducts:', query.error)
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: query.error instanceof Error ? query.error.message : 'Unknown error'
      }))
    } else if (query.data) {
      const { data } = query
      setState({ 
        data, 
        isLoading: false, 
        error: null 
      })
    }
  }, [query.isLoading, query.error, query.data])

  return { 
    ...state, 
    refetch: query.refetch,
    data: state.data,
  }
}