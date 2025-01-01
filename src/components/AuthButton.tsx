import React from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { redirectToAuth, useAuthStore } from '../services/auth';

export const AuthButton: React.FC = () => {
  const { isAuthenticated, logout } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <button
        onClick={redirectToAuth}
        className="p-2 text-white hover:bg-green-600 rounded-full transition-colors flex items-center gap-2"
        title="Se connecter"
      >
        <LogIn className="w-6 h-6" />
        <span>Se connecter</span>
      </button>
    );
  }

  return (
    <button
      onClick={logout}
      className="p-2 text-white hover:bg-green-600 rounded-full transition-colors flex items-center gap-2"
      title="Se déconnecter"
    >
      <LogOut className="w-6 h-6" />
      <span>Se déconnecter</span>
    </button>
  );
};