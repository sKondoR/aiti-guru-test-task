'use client'

import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useMobxStore } from '@/lib/store/mobxStore'

export default observer(
function SearchForm() {
  const [activeTab, setActiveTab] = useState<number>(0)
  const store = useMobxStore()
  const { disciplinesData, isProductsLoading, isOnlyOnline } = store;


  return (
    <div className="w-[1000px]">
      <input
        type="text"
        className="bg-gray3 border border-gray3 rounded px-5 py-2 w-full"
        placeholder="Найти"
      />
    </div>
  )
})