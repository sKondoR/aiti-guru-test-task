import { Product } from '@/types';
import React from 'react';

interface RatingTemplateProps {
  item: Product;
}
const WARNING_RATING = 3;
const RatingTemplate: React.FC<RatingTemplateProps> = ({ item }) => {
  if (!item.rating) return ''
  return (
    <div>
      <span className={item.rating < WARNING_RATING ? 'text-red-500' : ''}>{item.rating}</span>
      /5
    </div>    
  );
};

export default RatingTemplate;