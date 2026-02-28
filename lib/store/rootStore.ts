import { QueryClient } from '@tanstack/react-query';
import { ProductsStore } from './productsStore'

export class RootStore {
  queryClient: QueryClient;
  productsStore: ProductsStore;

  constructor() {
    this.queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000, // 5 minutes
          retry: 3,
        },
      },
    });

    this.productsStore = new ProductsStore(this.queryClient);
  }

  destroy() {
    this.productsStore.destroy();
  }
}

export const rootStore = new RootStore();