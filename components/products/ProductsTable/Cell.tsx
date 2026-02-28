import { Product } from '@/types';
import React from 'react';
import ProductTemplate from '../templates/ProductTemplate';
import { RATING_COL, TITLE_COL } from '../products.constants';
import RatingTemplate from '../templates/RatingTemplate';

interface CellProps {
  item: Product
  prop: string
  className?: string
}

const Cell: React.FC<CellProps> = ({ item, prop, className = "py-3 px-4" }) => {
  if (prop === TITLE_COL) {
    return (
      <td className={className}>
        <ProductTemplate item={item} />
      </td>
    );
  }
  if (prop === RATING_COL) {
    return (
      <td className={className + (item.rating < 3 ? ' text-red-500' : '')}>
        {item[prop]}
      </td>
    );
  }

  if (prop === 'checkbox') {
    return (
      <td className={className}>
        <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
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