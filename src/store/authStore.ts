import { create } from 'zustand';
import { User } from '../types/user';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  isSubscribed: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isSubscribed: false,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isSubscribed: user?.isSubscribed || false,
    }),
}));