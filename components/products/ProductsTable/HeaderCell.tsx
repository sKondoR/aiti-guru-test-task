import { Product } from '@/types';
import React from 'react';
import { ACTIONS_COL, CHECKBOX_COL } from '../products.constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';

interface HeaderCellProps {
  name?: string
  prop: string
  className?: string
}

const HeaderCell: React.FC<HeaderCellProps> = ({ name, prop, className = "py-3 px-4" }) => {
  if (prop !== CHECKBOX_COL && prop !== ACTIONS_COL) {
    return (
      <th className={className}>
        {name as keyof Product}
        <FontAwesomeIcon icon={faCaretUp} className="text-blue-500 hover:text-blue-800 cursor-pointer" />
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