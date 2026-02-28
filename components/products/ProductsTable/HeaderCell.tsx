import { Product } from '@/types';
import React from 'react';
import { ACTIONS_COL, CHECKBOX_COL } from '../products.constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { SortOrder } from '@/lib/store/productsStore';

interface HeaderCellProps {
  name?: string
  prop: string
  className?: string
  sortBy?: string
  order?: SortOrder
  onSort?: (column: string) => void
}

const HeaderCell: React.FC<HeaderCellProps> = ({ name, prop, className = "py-3 px-4", sortBy, order, onSort }) => {
  const isSorted = sortBy === prop
  const isAsc = order === 'asc'

  const handleSortClick = () => {
    if (prop !== CHECKBOX_COL && prop !== ACTIONS_COL && onSort) {
      onSort(prop)
    }
  }

  if (prop !== CHECKBOX_COL && prop !== ACTIONS_COL) {
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
        {!isSorted && (
          <FontAwesomeIcon
            icon={faCaretUp}
            className="text-gray-400 hover:text-blue-500 ml-1"
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
};

export default HeaderCell;