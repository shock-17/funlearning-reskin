import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireRole?: 'parent' | 'child';
};

export function ProtectedRoute({
  children,
  requireRole = 'parent'
}: ProtectedRouteProps) {
  const {
    user,
    isLoading
  } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center bg-[#f7f7f5]">
        <div className="text-[#000000] text-xl font-bold">Loading...</div>
      </div>
    );
  }

  // Validate that user is authenticated, has valid identity structure, and meets role criteria
  if (!user || !user.id || !user.email || (requireRole && user.role !== requireRole)) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location
        }}
        replace
      />
    );
  }

  return <>{children}</>;
}
