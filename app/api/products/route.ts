import { NextRequest, NextResponse } from 'next/server'
import { API_URL } from '@/lib/constants'
import { handleApiError } from '@/lib/errorHandler'

export async function GET(request: NextRequest) {
  console.log('> ', request.nextUrl.searchParams)
  try {
    const searchParams = new URLSearchParams(request.nextUrl.searchParams)
    searchParams.set('select', 'title,brand,sku,rating,price,stock')
    console.log('> ', searchParams)
    const response = await fetch(`${API_URL}/products?${searchParams}`)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return handleApiError(error)
  }
}
