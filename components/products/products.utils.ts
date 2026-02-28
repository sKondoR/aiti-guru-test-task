import { Product } from '@/types';

export function getEmptyProducts(limit: number): Product[]  {
  return Array(limit).fill({})
}