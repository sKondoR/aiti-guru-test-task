
import type { ProductColumn } from '@/types/productConfig';

export const TITLE_COL = 'title'

export const productsConfig: ProductColumn[] = [
    { id: 'col-0', name: 'Название', prop: TITLE_COL },
    { id: 'col-1', name: 'Вендор', prop: 'brand' },
    { id: 'col-2', name: 'Артикул', prop: 'sku' },
    { id: 'col-3', name: 'Оценка', prop: 'rating' },
    { id: 'col-4', name: 'Цена, ₽', prop: 'price' },
    { id: 'col-5', name: 'Количество', prop: 'stock' },
];
