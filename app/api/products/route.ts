import { NextRequest, NextResponse } from 'next/server'

import { handleApiError } from '@/lib/errorHandler'
import { API_URL } from '@/shared/constants'
import { ProductsQueryParams, ProductsResponse } from '@/entities/product/product.types'

export async function GET(request: NextRequest) {
  try {
    const searchParams = new URLSearchParams(request.nextUrl.searchParams)
    const queryParams: ProductsQueryParams = {
      q: searchParams.get('q') || undefined,
      select: 'title,brand,sku,rating,price,stock,category,thumbnail'
    }

    let url = `${API_URL}/products`
    if (queryParams.q) {
      url += '/search'
    }
    
    const params = new URLSearchParams()
    if (queryParams.q) {
      params.set('q', queryParams.q)
    }
    if (queryParams.select) {
      params.set('select', queryParams.select)
    }
    
    const response = await fetch(`${url}?${params}`)
    const data: ProductsResponse = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return handleApiError(error)
  }
}
