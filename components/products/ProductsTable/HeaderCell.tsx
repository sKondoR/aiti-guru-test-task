'use client'

import { Product } from '@/types';
import React from 'react';
import { ACTIONS_COL, CHECKBOX_COL } from '../products.constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { rootStore } from '@/lib/store/rootStore';
import { observer } from 'mobx-react';
import { TableColumn } from '@/types/productConfig';

interface HeaderCellProps {
  col: TableColumn
  className?: string
}

const HeaderCell: React.FC<HeaderCellProps> = observer(({ col, className = "py-3 px-[9px] text-gray8 font-bold first:pl-[18px] last:pl-[18px]"}) => {

  const { productsStore: store } = rootStore
  const { prop, name, width } = col

  if (prop !== CHECKBOX_COL && prop !== ACTIONS_COL) {
    const isSorted = store.sortBy === prop
    const isAsc = store.order === 'asc'
    const handleSortClick = () => {
        store.setSortBy(prop)
    }

    return (
      <th
        className={`${className} cursor-pointer`}
        onClick={handleSortClick}
        style={{ width: width ?? `${width}px` }}
      >
        {name as keyof Product}
        {isSorted && (
          <FontAwesomeIcon
            icon={isAsc ? faCaretUp : faCaretDown}
            className="text-blue-500 ml-1"
          />
        )}
      </th>
    );
  }

  return (
    <th
      className={`${className}`}
      style={{ width: width ?? `${width}px` }}
    >
      {name}
    </th>
  );
});

export default HeaderCell;