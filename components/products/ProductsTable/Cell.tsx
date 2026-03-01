'use client'

import { Product } from '@/types'
import React from 'react';
import { BRAND_COL, CHECKBOX_COL, RATING_COL, TITLE_COL } from '../../../entities/product/products.constants'
import ProductTemplate from '../templates/ProductTemplate';
import RatingTemplate from '../templates/RatingTemplate';
import SelectTemplate from '../templates/SelectTemplate';

interface CellProps {
  item: Product
  prop: string
  className?: string
}

const Cell: React.FC<CellProps> = ({ item, prop, className = "py-3 px-[9px] first:pl-[14px] last:pl-[18px] align-middle" }) => {
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
        <SelectTemplate item={item} />
      </td>
    );
  }

  const boldClass = [BRAND_COL].includes(prop) ? 'font-bold' : ''
  return (
    <td className={`${className} ${boldClass}`}>
      {item[prop as keyof Product]}
    </td>
  );
};

export default Cell;