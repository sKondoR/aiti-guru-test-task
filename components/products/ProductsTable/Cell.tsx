import { Product } from '@/types';
import React from 'react';
import ProductTemplate from './templates/ProductTemplate';
import { RATING_COL, TITLE_COL } from './config';
import RatingTemplate from './templates/RatingTemplate';

interface CellProps {
  item: Product;
  prop: string;
  id: string;
  className?: string;
}

const Cell: React.FC<CellProps> = ({ item, prop, id, className = "py-3 px-4" }) => {
  if (prop === TITLE_COL) {
    return (
      <td key={id} className={className}>
        <ProductTemplate item={item} />
      </td>
    );
  }
  if (prop === RATING_COL) {
    return (
      <td key={id} className={className + (item.rating < 3 ? ' text-red-500' : '')}>
        {item[prop]}
      </td>
    );
  }

//   if (prop === 'checkbox') {
//     return (
//       <td key={id} className={className}>
//         <Template2 checked={item[prop as keyof Product]} />
//       </td>
//     );
//   }

  return (
    <td key={id} className={className}>
      {item[prop as keyof Product]}
    </td>
  );
};

export default Cell;