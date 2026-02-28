'use client'

import { Product } from '@/types';
import React from 'react';
import ProductTemplate from '../templates/ProductTemplate';
import { CHECKBOX_COL, RATING_COL, TITLE_COL } from '../products.constants';
import RatingTemplate from '../templates/RatingTemplate';
import CheckboxTemplate from '../templates/CheckboxTemplate';

interface CellProps {
  item: Product
  prop: string
  className?: string
}

const Cell: React.FC<CellProps> = ({ item, prop, className = "py-3 px-[9px] first:pl-[18px] last:pl-[18px] align-middle" }) => {
  if (prop === TITLE_COL) {
    return (
      <td className={className}>
        <ProductTemplate item={item} />
      </td>
    );
  }
  if (prop === RATING_COL) {
    return (
      <td className={className}>
        <RatingTemplate item={item} />
      </td>
    
    );
  }

  if (prop === CHECKBOX_COL) {
    return (
      <td className={className}>
        <CheckboxTemplate item={item} />
      </td>
    );
  }

  return (
    <td className={className}>
      {item[prop as keyof Product]}
    </td>
  );
};

export default Cell;