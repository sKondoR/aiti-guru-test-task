
import type { TableColumn } from '@/types/productConfig';
import { ACTIONS_COL, CHECKBOX_COL, RATING_COL, TITLE_COL } from './products.constants';

export const productsConfig: TableColumn[] = [
    { id: CHECKBOX_COL, prop: CHECKBOX_COL },
    { id: 'col-0', name: 'Название', prop: TITLE_COL },
    { id: 'col-1', name: 'Вендор', prop: 'brand' },
    { id: 'col-2', name: 'Артикул', prop: 'sku' },
    { id: 'col-3', name: 'Оценка', prop: RATING_COL },
    { id: 'col-4', name: 'Цена, ₽', prop: 'price' },
    { id: 'col-5', name: 'Количество', prop: 'stock' },
    { id: ACTIONS_COL, prop: ACTIONS_COL },
];
