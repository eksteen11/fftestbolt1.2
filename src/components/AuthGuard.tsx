import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface AuthGuardProps {
  children: React.ReactNode;
  requireSubscription?: boolean;
}

export default function AuthGuard({ children, requireSubscription = false }: AuthGuardProps) {
  const { isAuthenticated, isSubscribed } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireSubscription && !isSubscribed) {
    return <Navigate to="/subscription" />;
  }

  return <>{children}</>;
}