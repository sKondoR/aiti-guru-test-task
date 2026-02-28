'use client'

import { rootStore } from '@/lib/store/rootStore';
import { Product } from '@/types'
import { observer } from 'mobx-react';
import React from 'react'

interface SelectTemplateProps {
  item?: Product
  isSelectAll?: boolean
}

const SelectTemplate: React.FC<SelectTemplateProps> =  observer(({ item, isSelectAll = false }) => {
  const { productsStore: store } = rootStore
  const isChecked = item ?
    store.selectedRows.includes(item.id) :
    store.isAllSelected

  const handleClick = (id: number | undefined) => {
    if (item && !isSelectAll) {
      store.toggleRowSelection(id as number)
    } else {
      store.toggleSelectAll()
    }
  }
  
  return (
    <div 
      className={`w-[22px] h-[22px] border-2 border-gray-300 rounded cursor-pointer
        ${isChecked ? ' bg-[var(--primary-blue-color)]' : 'bg-white'}
      `}
      onClick={() => handleClick(item?.id)}
    >
      <input
        type="checkbox"
        className="w-[22px] h-[22px] hidden"
        defaultChecked={isChecked}
      />
    </div>
  )
})

export default SelectTemplate