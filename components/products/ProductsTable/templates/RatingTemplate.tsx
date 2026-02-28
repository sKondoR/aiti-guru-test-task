import { Product } from '@/types';
import React from 'react';

interface RatingTemplateProps {
  item: Product;
}

const RatingTemplate: React.FC<RatingTemplateProps> = ({ item }) => {
  return (
    <span className={item.rating < 3 ? 'color-red' : ''}>
    </span>
  );
};

export default RatingTemplate;