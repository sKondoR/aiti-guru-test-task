'use client'

import { observer } from 'mobx-react-lite';
import { rootStore } from 'lib/store/rootStore';
import Toast from './Toast';

const ToastContainer: React.FC = () => {
  const { toastsStore } = rootStore;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3">
      {toastsStore.toasts.map((toast) => (
        <Toast key={toast.id} toast={toast}  onClose={() => toastsStore.removeToast(toast.id)}/>
      ))}
    </div>
  );
};

export default observer(ToastContainer);
