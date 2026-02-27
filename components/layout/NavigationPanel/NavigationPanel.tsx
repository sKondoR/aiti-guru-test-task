'use client'

import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useMobxStore } from '@/lib/store/mobxStore'
import { SearchForm } from '../SearchForm'

export default observer(
function NavigationPanel({ title = '' }: { title?: string }) {
  const [activeTab, setActiveTab] = useState<number>(0)
  const store = useMobxStore()
  const { disciplinesData, isProductsLoading, isOnlyOnline } = store;


  return (<nav className="bg-white p-[30px] flex flex-row align-middle mb-10">
    <h3 className="text-2xl flex-1 mr-5">{title}</h3>
    <SearchForm />
    <div className="flex-1 ml-5"></div>
  </nav>
  )
})