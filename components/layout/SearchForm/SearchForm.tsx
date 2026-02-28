'use client'

import { useEffect, useState } from 'react'
import { useDebounce } from '@/lib/hooks/useDebounce'
import { observer } from 'mobx-react-lite'
import { rootStore } from '@/lib/store/rootStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default observer(
function SearchForm() {
  const { productsStore: store } = rootStore
  const [inputValue, setInputValue] = useState('')
  const debouncedSearchQuery = useDebounce(inputValue)

  useEffect(() => {
    store.setSearchQuery(debouncedSearchQuery.trim())
  }, [debouncedSearchQuery, store])

  const handleClear = () => {
    setInputValue('')
    store.setSearchQuery('')
  }

  return (
    <div className="w-[300px] md:w-[1000px] relative">
      <input
        type="text"
        className="bg-gray3 border border-gray3 rounded px-5 py-2 w-full"
        placeholder="Найти"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {inputValue.trim() && <FontAwesomeIcon
        icon={faTimes}
        className="text-gray-500 hover:text-[var(--color-primary)] absolute top-3 right-3 cursor-pointer"
        onClick={handleClear}
      />}
    </div>
  )
})