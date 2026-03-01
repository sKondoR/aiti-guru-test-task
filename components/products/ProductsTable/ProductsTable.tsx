'use client'

import { observer } from 'mobx-react-lite'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { productsConfig } from '../products.config'
import HeaderCell from './HeaderCell'
import Cell from './Cell'
import { Pagination } from './Pagination'

import { rootStore } from '@/lib/store/rootStore'
import { TableColumn } from '@/entities/product/productConfig.types'
import { Product } from '@/entities/product/product.types'
import { getEmptyProducts } from '@/entities/product/products.utils'

export const ProductsTable = observer(() => {
  const { productsStore: store } = rootStore;

  const products: Product[] = store.isLoading ? getEmptyProducts(store.limit) : store.products;
  return (
    <>
      <div className="relative">
        <table className="min-w-full">
          <thead>
            <tr className="border-b-2 border-t-transparent border-r-transparent border-b-gray border-l-4 border-l-transparent">
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
                className={`border-b-2 border-t-transparent border-r-transparent border-b-gray border-l-4 
                  ${store.selectedRows.includes(product.id) ? 'border-l-[var(--primary-blue-color)]' : 'border-l-transparent'}
                `}
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
          <div className="absolute inset-0 bg-gray-300/30 flex items-center justify-center">
            <div className="flex items-center justify-center space-x-2 text-gray-500 text-xl">
              <FontAwesomeIcon icon={faSpinner} spin />
              <span className="text-lg font-medium">Загрузка результатов...</span>
            </div>
          </div>
        )}
        
        {/* Оверлей для ошибки */}
        {store.error && (
          <div className="absolute inset-0 bg-red-300/30 bg-opacommand-80 flex items-center justify-center">
            <div className="text-white text-center">
              <h3 className="text-xl font-semibold mb-2">Ошибка загрузки</h3>
              <p className="text-white">{store.error}</p>
            </div>
          </div>
        )}
      </div>
      <Pagination total={store.total} store={store} />
    </>
  )
})

