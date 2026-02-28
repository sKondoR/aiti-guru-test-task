import { observer } from 'mobx-react-lite'
import { ProductsStore } from '@/lib/store/productsStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export const Pagination = observer(({ total, store }: { total: number; store: ProductsStore }) => {
  const firstItem = store.page * store.limit - store.limit + 1
  const lastItem = Math.min(store.page * store.limit, total)
  const pagesCount = Math.ceil(total / store.limit)

  const handlePageChange = (page: number) => {
    store.setPage(page)
  }
  return (
    <div className="flex justify-between align-middle text-font4">
      <div>Показано {firstItem}-{lastItem} из {total}</div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => store.setPage(store.page - 1)}
          disabled={store.page === 1}
          className="px-3 py-1 disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-blue-500 hover:text-blue-800 cursor-pointer" />
        </button>
        <div className="flex space-x-2">
          {Array.from({ length: Math.min(5, pagesCount) }, (_, i) => {
            const startPage = Math.max(1, Math.min(store.page - 2, pagesCount - 4));
            const pageNumber = startPage + i;
            if (pageNumber <= pagesCount) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 border rounded ${
                    store.page === pageNumber ? 'bg-gray-300' : ''
                  }`}
                >
                  {pageNumber}
                </button>
              );
            }
            return null;
          }).filter(Boolean)}
        </div>
        <button
          onClick={() => store.setPage(store.page + 1)}
          disabled={false}
          className="px-3 py-1 disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-blue-500 hover:text-blue-800 cursor-pointer" />
        </button>
      </div>
    </div>
  )
})