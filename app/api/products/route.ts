import { NextRequest, NextResponse } from 'next/server'
import { ProductsResponse } from '@/types/product'
import { API_URL } from '@/lib/constants'
import { handleApiError } from '@/lib/errorHandler'

export async function GET(request: NextRequest) {
  try {
    const searchParams = new URLSearchParams(request.nextUrl.searchParams)
    searchParams.set('select', 'title,brand,sku,rating,price,stock,category,thumbnail')
    const response = await fetch(`${API_URL}/products?${searchParams}`)
    const data: ProductsResponse = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return handleApiError(error)
  }
}
