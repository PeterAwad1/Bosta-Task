import { ReactNode } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import MainLoader from '../shared/loaders/MainLoader';

import { useAuth } from '@/context/AuthContext';

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoggingIn } = useAuth();
  const location = useLocation();


  if (isLoggingIn) return <MainLoader />;


  if (!isAuthenticated) {
    const callbackUrl = `${location.pathname}${location.search}`;

    return (
      <Navigate
        to={`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`}
        replace
        state={{ from: location }}
      />
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute;
