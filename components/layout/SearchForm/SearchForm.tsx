'use client'

import { useState } from 'react'
import { observer } from 'mobx-react-lite'

export default observer(
function SearchForm() {
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