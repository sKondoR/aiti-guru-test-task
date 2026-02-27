import { makeAutoObservable, configure } from 'mobx'
import { DEFAULT_CITY } from '../constants'
import { createContext, useContext } from 'react'
import type { Product } from '../../types/disciplines';

// Configure MobX for SSR compatibility
configure({
  safeDescriptors: true,
});

export class MobxStore {
  // code: string = ''
  // command: string = DEFAULT_CITY
  // isCommandFilterEnabled: boolean = false
  // isOnlyOnline: boolean = false
  isProductsLoading: boolean = false
  products: Product[] | null = null

  constructor(initialCode?: string) {
    makeAutoObservable(this)
  }

  setIsProductsLoading(enabled: boolean) {
    this.isProductsLoading = enabled
  }

  setProducts(data: Product[] | null) {
    this.products = data
  }

  reset() {
    this.isProductsLoading = false
    this.products = null
  }
}

// Create a function to initialize the store
let store: MobxStore | null = null

export function initializeStore() {
  if (typeof window === 'undefined') {
    return new MobxStore()
  } else {
    if (store === null) {
      store = new MobxStore()
    }
    return store
  }
}

export const MobxStoreContext = createContext<MobxStore | undefined>(undefined)

export const useMobxStore = () => {
  const context = useContext(MobxStoreContext)
  if (!context) {
    // Fallback to initializing store if context is not available
    return initializeStore()
  }
  return context
};

// Export the store instance as well for direct access when needed
// For direct access to the store instance
export function mobxStore() {
  return initializeStore()
}