import { makeAutoObservable } from 'mobx';
import { Toast, ToastStoreInterface } from './toast.types';

export class ToastsStore implements ToastStoreInterface {
  toasts: Toast[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addToast = (toast: Omit<Toast, 'id' | 'createdAt'>) => {
    const newToast: Toast = {
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
      ...toast,
    };

    this.toasts.push(newToast);

    if (toast.autoClose && toast.duration) {
      setTimeout(() => {
        this.removeToast(newToast.id);
      }, toast.duration);
    }
  };

  removeToast = (id: string) => {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  };

  clearToasts = () => {
    this.toasts = [];
  };
}