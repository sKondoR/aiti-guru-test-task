import type { Product } from './product';

export interface ProductColumn {
  name: string;
  prop: keyof Product;
  id: string;
}