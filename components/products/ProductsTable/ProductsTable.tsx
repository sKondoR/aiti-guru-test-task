'use client'

import { observer } from 'mobx-react-lite'
import { useQuery } from '@tanstack/react-query'
import { TableStore } from '@/lib/store/productsStore'
import { useState } from 'react'
import { productsConfig } from './config'
import { Product, ProductColumn } from '@/types'
import Cell from './Cell'
import { Pagination } from './Pagination'

// Data fetching function
const fetchTableData = async (params: { page: number; limit: number; search: string }) => {
  const searchParams = new URLSearchParams({
    skip: ((params.page - 1) * params.limit).toString(),
    limit: params.limit.toString(),
    // ...(params.search && { search: params.search }),
  });
  
  const response = await fetch(`/api/products?${searchParams}`)
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};

export const ProductsTable = observer(() => {
  // Initialize store (only once)
  const [store] = useState(() => new TableStore())

  // Use React Query for data fetching
  const { data, isLoading, error } = useQuery({
    queryKey: ['tableData', store.queryParams], // Store params drive the query
    queryFn: () => fetchTableData(store.queryParams),
  })

  console.log('data: ', data);
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const { products, total } = data

  return (
    <div>
      {/* Search Input - updates MobX store */}
      <input
        type="text"
        placeholder="Search..."
        value={store.searchQuery}
        onChange={(e) => store.setSearchQuery(e.target.value)}
        className="mb-4 p-2 border rounded"
      />

      <table className="min-w-full">
        <thead>
          <tr className="border-b-2 border-gray5">
            <th key="checkbox" className="py-3 px-4">x</th>
            {productsConfig.map(({ name, id }: ProductColumn) => (
              <th key={id} className="py-3 px-4">
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((item: Product) => (
            <tr key={item.id} className="border-b-2 border-gray5">
              <td key="checkbox" className="py-3 px-4">x</td>
              {productsConfig.map(({ prop, id }: ProductColumn) => (
                <Cell 
                  key={`${item.id}-${id}`}
                  item={item}
                  prop={prop}
                  id={`${item.id}-${id}`}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination total={total} />
    </div>
  )
})