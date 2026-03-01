import { QueryClient } from '@tanstack/react-query';
import { ProductsStore } from '../../entities/product/product.store'
import { AuthorizationStore } from '../../entities/auth/auth.store'
import { ToastsStore } from '@/entities/toast/toast.store';

export class RootStore {
  queryClient: QueryClient;
  productsStore: ProductsStore;
  authorizationStore: AuthorizationStore;
  toastsStore: ToastsStore;

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
    this.toastsStore = new ToastsStore();
  }

  destroy() {
    this.productsStore.destroy();
    this.authorizationStore.logout();
  }
}

export const rootStore = new RootStore();