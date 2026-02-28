'use client'

import { observer, useLocalStore } from 'mobx-react-lite'
import { ProductsStore } from '@/lib/store/productsStore'
import { useState, useEffect } from 'react'
import { productsConfig } from './config'
import { Product, ProductColumn } from '@/types'
import Cell from './Cell'
import { Pagination } from './Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { rootStore } from '@/lib/store/rootStore'

export const ProductsTable = observer(() => {
  const { productsStore: store } = rootStore;

  const products: Product[] = store.isLoading ? getEmptyProducts(store.limit) : store.products;
  const total = store.total

  return (
    <div>
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
            {products?.map((item: Product) => (
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
        {store.isLoading && (
          <div className="absolute inset-0 bg-gray-300/50 flex items-center justify-center">
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <FontAwesomeIcon icon={faSpinner} spin />
              <span className="text-lg font-medium">Загрузка результатов...</span>
            </div>
          </div>
        )}
        
        {/* Оверлей для ошибки */}
        {store.error && (
          <div className="absolute inset-0 bg-red-300/50 bg-opacommand-80 flex items-center justify-center">
            <div className="text-white text-center">
              <h3 className="text-lg font-semibold mb-2">Ошибка загрузки</h3>
              <p className="text-white">{store.error}</p>
            </div>
          </div>
        )}
      </div>
      <Pagination total={total} store={store} />
    </div>
  )
})

function getEmptyProducts(limit: number): Product[]  {
  return Array(limit).fill({})
}
