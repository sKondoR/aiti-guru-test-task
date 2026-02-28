import { Product } from '@/types';
import React from 'react';

interface ProductTemplateProps {
  item: Product;
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ item }) => {
  const proxyUrl = item.thumbnail?.replace('https://cdn.dummyjson.com', '/api/dummy-image');
  // console.log('proxyUrl: ', proxyUrl);
  return (
    <div className="flex">
      <div className="w-12 h-12 bg-gray6 border border-gray7 rounded-lg overflow-hidden mr-4">
        {proxyUrl && <img src={proxyUrl} className="w-12 h-12 object-cover" alt={item.title} />}
      </div>
      <div>
        <div className="text-primary text-base font-bold">{item.title}</div>
        <div className="text-gray8 text-sm">{item.category}</div>
      </div>
      
    </div>
  );
};

export default ProductTemplate;