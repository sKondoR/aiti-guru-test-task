'use client'

import { observer } from 'mobx-react-lite'
import { productsConfig } from '../products.config'
import { Product } from '@/types'
import Cell from './Cell'
import { Pagination } from './Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { rootStore } from '@/lib/store/rootStore'
import { getEmptyProducts } from '../products.utils'
import { TableColumn } from '@/types/productConfig'
import dynamic from 'next/dynamic'

const HeaderCell = dynamic(
  () => import('./HeaderCell'),
  { ssr: false }
)

export const ProductsTable = observer(() => {
  const { productsStore: store } = rootStore;

  const products: Product[] = store.isLoading ? getEmptyProducts(store.limit) : store.products;
  const { total, selectedRows } = store
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
            <tr className="border-b-2 border-gray5s">
              {productsConfig.map((col: TableColumn) => (
                <HeaderCell
                  key={`${col.id}`}
                  col={col}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {products?.map((product: Product, rowIndex) => (
              <tr
                key={product.id ?? `${rowIndex}-empty`}
                className={`border-b-2 border-gray ${selectedRows.includes(product.id) ? 'border-l-2 border-l-[#3C538E]' : ''}`}
              >
                {productsConfig.map(({ prop, id }: TableColumn) => (
                  <Cell
                    key={`${product.id || rowIndex}-${id}`}
                    item={product}
                    prop={prop}
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

