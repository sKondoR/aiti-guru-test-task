import type { Product } from './product';
import { ACTIONS_COL, CHECKBOX_COL } from '@/components/products/products.constants';

export interface ProductColumn {
  name: string;
  prop: keyof Product
  id: string;
}

export interface BasicColumn {
  prop: typeof CHECKBOX_COL |  typeof ACTIONS_COL
  name?: string;
  id: string;
}

export type TableColumn = ProductColumn | BasicColumn;