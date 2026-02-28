'use client'

import { observer } from 'mobx-react-lite'
import { useQuery } from '@tanstack/react-query'
import { TableStore } from '@/lib/store/productsStore'
import { useState } from 'react'
import { productsConfig } from './config'
import { Product, ProductColumn } from '@/types'
import Cell from './Cell'
import { Pagination } from './Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

// Data fetching function
const fetchTableData = async (params: { page: number; limit: number; search: string }) => {
  console.log('here!', ((params.page - 1) * params.limit).toString());
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
    queryKey: ['tableData', store.page, store.searchQuery],
    queryFn: () => fetchTableData({
      page: store.page,
      limit: store.limit,
      search: store.searchQuery
    }),
  })

  const products: Product[] = data?.products || []
  const total = data?.total || 0
  console.log('>', products)

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

      <div className="relative">
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
        {isLoading && (
          <div className="absolute inset-0 bg-gray-300/50 flex items-center justify-center">
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <FontAwesomeIcon icon={faSpinner} spin />
              <span className="text-lg font-medium">Загрузка результатов...</span>
            </div>
          </div>
        )}
        
        {/* Оверлей для ошибки */}
        {error?.message && (
          <div className="absolute inset-0 bg-red-300/50 bg-opacommand-80 flex items-center justify-center">
            <div className="text-white text-center">
              <h3 className="text-lg font-semibold mb-2">Ошибка загрузки</h3>
              <p className="text-white">{error?.message}</p>
            </div>
          </div>
        )}
      </div>
      <Pagination total={total} store={store} />
    </div>
  )
})