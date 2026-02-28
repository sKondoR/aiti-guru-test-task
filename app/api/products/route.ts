import { NextRequest, NextResponse } from 'next/server'
import { ProductsResponse } from '@/types/product'
import { API_URL } from '@/lib/constants'
import { handleApiError } from '@/lib/errorHandler'

export async function GET(request: NextRequest) {
  try {
    const searchParams = new URLSearchParams(request.nextUrl.searchParams)
    searchParams.set('select', 'title,brand,sku,rating,price,stock,category,thumbnail')
    let url = `${API_URL}/products`
    if (searchParams.get('q')) {
      url += '/search';
    }
    const response = await fetch(`${url}?${searchParams}`)
    const data: ProductsResponse = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return handleApiError(error)
  }
}
