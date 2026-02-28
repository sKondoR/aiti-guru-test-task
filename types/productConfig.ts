import type { Product } from './product';
import { ACTIONS_COL, CHECKBOX_COL } from '@/components/products/products.constants';

export interface ProductColumn {
  name: string
  prop: keyof Product
  id: string
  width?: number
}

export interface BasicColumn {
  name?: string
  prop: typeof CHECKBOX_COL |  typeof ACTIONS_COL
  id: string
  width?: number
}

export type TableColumn = ProductColumn | BasicColumn;