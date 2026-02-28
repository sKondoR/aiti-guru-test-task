import { Product } from '@/types';
import React from 'react';

interface CheckboxTemplateProps {
  item: Product;
}

const CheckboxTemplate: React.FC<CheckboxTemplateProps> = ({ item }) => {
  return (
    <input
      type="checkbox"
      className="w-[22px] h-[22px] text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
    />
  );
};

export default CheckboxTemplate;