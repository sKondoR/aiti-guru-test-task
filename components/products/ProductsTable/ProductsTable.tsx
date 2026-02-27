'use client'

import { observer } from 'mobx-react-lite'
import { useQuery } from '@tanstack/react-query'
import { TableStore } from '@/lib/store/productsStore'
import { useState } from 'react'

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

      {/* Table */}
      <table className="min-w-full border">
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Name</th>
            {/* Other columns */}
          </tr>
        </thead>
        <tbody>
          {/* {data?.items.map((item: any) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={store.selectedRows.includes(item.id)}
                  onChange={() => store.toggleRowSelection(item.id)}
                />
              </td>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          ))} */}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => store.setPage(store.page - 1)}
          disabled={store.page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {store.page}</span>
        <button
          onClick={() => store.setPage(store.page + 1)}
          disabled={!data?.hasNextPage}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
})