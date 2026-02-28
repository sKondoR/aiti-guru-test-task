'use client'

import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { rootStore } from '@/lib/store/rootStore'

export default observer(
function SearchForm() {
  const [inputValue, setInputValue] = useState('')
  const { productsStore } = rootStore

  useEffect(() => {
    const timer = setTimeout(() => {
      productsStore.setSearchQuery(inputValue)
    }, 500)

    return () => clearTimeout(timer)
  }, [inputValue, productsStore])

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