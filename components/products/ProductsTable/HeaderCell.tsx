import { Product } from '@/types';
import React from 'react';
import { ACTIONS_COL, CHECKBOX_COL } from '../products.constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { SortOrder } from '@/lib/store/productsStore';
import { rootStore } from '@/lib/store/rootStore';
import { observer } from 'mobx-react';

interface HeaderCellProps {
  name?: string
  prop: string
  className?: string
}

const HeaderCell: React.FC<HeaderCellProps> = observer(({ name, prop, className = "py-3 px-4"}) => {

  const { productsStore: store } = rootStore;


  if (prop !== CHECKBOX_COL && prop !== ACTIONS_COL) {
    const { sortBy, order } = store
    const isSorted = sortBy === prop
    const isAsc = order === 'asc'
    const handleSortClick = () => {
      if (prop !== CHECKBOX_COL && prop !== ACTIONS_COL) {
        store.setSortBy(prop)
      }
    }
    return (
      <th
        className={className}
        onClick={handleSortClick}
        style={{ cursor: 'pointer' }}
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
    <th className={className}>
      {name}
    </th>
  );
});

export default HeaderCell;