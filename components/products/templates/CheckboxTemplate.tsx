'use client'

import { rootStore } from '@/lib/store/rootStore';
import { Product } from '@/types'
import { observer } from 'mobx-react';
import React from 'react'

interface CheckboxTemplateProps {
  item: Product
}

const CheckboxTemplate: React.FC<CheckboxTemplateProps> =  observer(({ item }) => {
  const { productsStore: store } = rootStore
  const { selectedRows, toggleRowSelection } = store
  console.log('toggleRowSelection ', toggleRowSelection)
  return (
    <input
      type="checkbox"
      className="w-[22px] h-[22px] text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
      checked={selectedRows.includes(item.id)}
      onChange={() => toggleRowSelection(item.id)}
    />
  )
})

export default CheckboxTemplate