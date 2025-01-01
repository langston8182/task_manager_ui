import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { ErrorNotification } from '../types';

interface ErrorToastProps {
  error: ErrorNotification;
  onDismiss: (id: string) => void;
}

export const ErrorToast: React.FC<ErrorToastProps> = ({ error, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(error.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [error.id, onDismiss]);

  return (
    <div className="fixed top-4 right-4 max-w-[90vw] md:max-w-md bg-red-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm md:text-base">
      <span>{error.message}</span>
      <button
        onClick={() => onDismiss(error.id)}
        className="p-1 hover:bg-red-600 rounded"
      >
        <X className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </div>
  );
};