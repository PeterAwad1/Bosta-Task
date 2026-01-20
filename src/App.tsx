import { RouterProvider } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import useLocalizeDocumentAttributes from './i18n/useLocalizeDocumentAttributes';
import { removeAuthCookies } from './utils/cookies';
import { router } from './routes';

const handleError = (error: Error) => {
  // Always check if we're on auth pages first - let component error handlers deal with it
  const isAuthPage = window.location.pathname === '/signin' || window.location.pathname === '/signup';
  if (isAuthPage) {
    // If on auth page, let the component's error handler show the toast
    // Don't redirect or show global error toast - component will handle it
    return;
  }

  if (error.message?.includes('Invalid account type')) {
    toast.error('Your account has been suspended');
    removeAuthCookies();
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
    return;
  }
  
  if (error.message?.includes('401')) {
    // Don't redirect if callbackUrl already points to signin (prevents loops)
    const urlParams = new URLSearchParams(window.location.search);
    const callbackUrl = urlParams.get('callbackUrl');
    if (callbackUrl && callbackUrl.includes('/signin')) {
      return;
    }
    
    // Only redirect if not on auth page and callbackUrl doesn't point to signin
    removeAuthCookies();
    const currentPath = window.location.pathname + window.location.search;
    // Clean up any existing callbackUrl to prevent nested redirects
    const cleanPath = currentPath.split('?')[0]; // Remove query params to avoid nested callbackUrls
    window.location.href = `/signin?callbackUrl=${encodeURIComponent(cleanPath)}`;
    return;
  }

  if (error.message?.includes('500')) {
    toast.error('Oops! Something went wrong. Please try again later.');
    return;
  }

  toast.error(error.message);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20 * 60 * 1000,
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    onError: handleError,
  }),
  mutationCache: new MutationCache({
    onError: handleError,
  }),
});

function App() {
  useLocalizeDocumentAttributes();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
      <Toaster
        richColors={true}
        position='top-center'
        duration={5000}
        closeButton
      />
    </QueryClientProvider>
  );
}

export default App;
