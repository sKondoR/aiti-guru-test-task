import { QueryClient } from '@tanstack/react-query';
import { ProductsStore } from './productsStore'
import { AuthorizationStore } from './authorizationStore'

export class RootStore {
  queryClient: QueryClient;
  productsStore: ProductsStore;
  authorizationStore: AuthorizationStore;

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
    this.authorizationStore = new AuthorizationStore();
  }

  destroy() {
    this.productsStore.destroy();
    this.authorizationStore.logout();
  }
}

export const rootStore = new RootStore();