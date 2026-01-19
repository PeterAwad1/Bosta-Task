import { lazy, Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import AppLayout from './components/layout/AppLayout';
import AuthLayout from './components/layout/AuthLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import MainLoader from './components/shared/loaders/MainLoader';
import NotFoundError from './pages/404';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const CreateProduct = lazy(() => import('./pages/CreateProduct'));
const Cart = lazy(() => import('./pages/Cart'));

// Auth pages
const SignIn = lazy(() => import('./pages/Auth/SignIn'));
const SignUp = lazy(() => import('./pages/Auth/SignUp'));


export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<MainLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'products/:id',
        element: (
          <Suspense fallback={<MainLoader />}>
            <ProductDetails />
          </Suspense>
        ),
      },
      {
        path: 'create-product',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<MainLoader />}>
              <CreateProduct />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'cart',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<MainLoader />}>
              <Cart />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/signin',
        element: (
          <Suspense fallback={<MainLoader />}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: '/signup',
        element: (
          <Suspense fallback={<MainLoader />}>
            <SignUp />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundError />,
  },
]);
