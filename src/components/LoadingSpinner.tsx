import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-gray-200 rounded-lg px-4 py-2 rounded-bl-none">
        <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
      </div>
    </div>
  );
};