
import type { TableColumn } from '@/types/productConfig';
import { ACTIONS_COL, CHECKBOX_COL, RATING_COL, TITLE_COL } from './products.constants';

export const productsConfig: TableColumn[] = [
    { id: 'col-checkbox', prop: CHECKBOX_COL, width: 38 },
    { id: 'col-0', name: 'Название', prop: TITLE_COL },
    { id: 'col-1', name: 'Вендор', prop: 'brand', width: 200 },
    { id: 'col-2', name: 'Артикул', prop: 'sku', width: 200 },
    { id: 'col-3', name: 'Оценка', prop: RATING_COL, width: 200 },
    { id: 'col-4', name: 'Цена, ₽', prop: 'price', width: 200 },
    { id: 'col-5', name: 'Количество', prop: 'stock', width: 200 },
    { id: 'col-actions', prop: ACTIONS_COL, width: 200 },
];
