'use client'

import { useEffect, useState } from 'react'
import { useDebounce } from '@/lib/hooks/useDebounce'
import { observer } from 'mobx-react-lite'
import { rootStore } from '@/lib/store/rootStore'

export default observer(
function SearchForm() {
  const { productsStore: store } = rootStore
  const [inputValue, setInputValue] = useState('')
  const debouncedSearchQuery = useDebounce(inputValue)

  useEffect(() => {
    store.setSearchQuery(debouncedSearchQuery)
  }, [debouncedSearchQuery, store])

  return (
    <div className="w-[1000px]">
      <input
        type="text"
        className="bg-gray3 border border-gray3 rounded px-5 py-2 w-full"
        placeholder="Найти"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  )
})