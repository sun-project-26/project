import { useState, useCallback } from 'react';

let globalAddToast = null;

export function useNotifications() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  globalAddToast = addToast;

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}

export const notify = (msg, type = 'info') => {
  if (globalAddToast) {
    globalAddToast(msg, type);
  } else {
    console.log(`[Notification ${type}] ${msg}`);
  }
};
