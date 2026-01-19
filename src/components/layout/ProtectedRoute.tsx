import { ReactNode, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import MainLoader from '../shared/loaders/MainLoader';

import { useAuth } from '@/context/AuthContext';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoggingIn } = useAuth();

  // 2. If there is NO authenticated user, redirect to the /signin
  // But don't redirect if we're already on an auth page or if callbackUrl points to signin
  useEffect(
    function () {
      const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';
      
      // Don't redirect if already on auth page
      if (isAuthPage) {
        return;
      }
      
      // Don't redirect if callbackUrl in current location points to signin (prevents loops)
      const searchParams = new URLSearchParams(location.search);
      const callbackUrl = searchParams.get('callbackUrl');
      if (callbackUrl) {
        try {
          const decodedCallback = decodeURIComponent(callbackUrl);
          if (decodedCallback.includes('/signin') || decodedCallback.includes('/signup')) {
            return;
          }
        } catch {
          // If decoding fails, check the raw value
          if (callbackUrl.includes('/signin') || callbackUrl.includes('/signup')) {
            return;
          }
        }
      }
      
      // Only redirect if not authenticated and not already going to signin
      if (!isAuthenticated) {
        // Clean pathname to avoid nested callbackUrls
        const cleanPath = location.pathname;
        navigate(`/signin?callbackUrl=${encodeURIComponent(cleanPath)}`);
      }
    },
    [isAuthenticated, navigate, location.pathname, location.search],
  );

   // 3. While loading, show a spinner
   if (isLoggingIn) return <MainLoader />;

   // 4. If there IS a user, render the app
   if (isAuthenticated) return children;

  return null;
}

export default ProtectedRoute;
