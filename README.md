# Boston Task - E-commerce Application

A modern, full-featured e-commerce application built with React, TypeScript, and Vite. This project demonstrates best practices in React development, including state management, routing, internationalization, and API integration.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Architecture & Code Logic](#architecture--code-logic)
- [Key Components](#key-components)
- [State Management](#state-management)
- [API Services](#api-services)
- [Routing](#routing)
- [Internationalization](#internationalization)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)

## Project Overview

This is a comprehensive e-commerce web application that provides:
- Product browsing with filtering, sorting, and pagination
- User authentication (sign in/sign up)
- Shopping cart functionality
- Product management (create, edit, delete)
- Multi-language support (English & Arabic)
- Responsive design with modern UI

## Tech Stack

### Frontend Framework
- **React 19.2.0** - UI library with concurrent features
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.1.12** - Fast build tool and dev server

### UI & Styling
- **Tailwind CSS 3.4.10** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Lucide React** - Icon library
- **Class Variance Authority (CVA)** - Component variant management
- **Tailwind Merge** - Tailwind class merging utility

### State Management & Data Fetching
- **TanStack Query (React Query) 5.90.5** - Data fetching and caching
- **React Context API** - Global state management
- **Zod 3.23.8** - Schema validation

### Routing & Navigation
- **React Router DOM 6.27.0** - Client-side routing

### Form Handling
- **React Hook Form 7.65.0** - Form state management
- **@hookform/resolvers** - Form validation integration

### Internationalization
- **i18next 25.6.0** - Internationalization framework
- **react-i18next 16.2.1** - React bindings for i18next

### Additional Libraries
- **Date-fns** - Date manipulation
- **Sonner** - Toast notifications
- **React Dropzone** - File upload
- **Recharts** - Data visualization
- **XLSX** - Excel export functionality

## Key Features

### 🛍️ Product Management
- Browse products with category filtering
- Sort by price or category
- Paginated product listing (10 items per page)
- View detailed product information
- Create, edit, and delete products (authenticated users)

### 👤 User Authentication
- Sign up with username, email, and password
- Sign in with session management
- Protected routes for authenticated users
- Logout confirmation dialog
- Token-based authentication with cookie storage

### 🛒 Shopping Cart
- Add products to cart
- Update product quantities
- Remove items from cart
- Persistent cart storage using localStorage
- Real-time cart total calculation

### 🌍 Internationalization
- English (en) and Arabic (ar) language support
- RTL support for Arabic
- Currency, number, and date formatters
- Language switching without page reload

### 🎨 Modern UI/UX
- Responsive design for all screen sizes
- Dark/Light theme support
- Loading states and error handling
- Toast notifications for user feedback
- Smooth transitions and animations

## Project Structure

```
src/
├── App.tsx                      # Main application component with QueryClient setup
├── main.tsx                     # Application entry point
├── routes.tsx                   # Route definitions with lazy loading
├── index.css                    # Global styles
├── styles.scss                  # Additional SCSS styles
│
├── assets/                      # Static assets (GIFs, images)
├── components/                  # Reusable components
│   ├── data-table/             # Data table components
│   │   ├── CustomTable.tsx    # Reusable table with pagination
│   │   ├── SearchBar.tsx      # Search functionality
│   │   ├── FilterByType.tsx   # Type filtering
│   │   ├── ColumnsVisibility.tsx
│   │   ├── CustomExportCSVButton.tsx
│   │   ├── CustomExportXLSX.tsx
│   │   ├── AddButton.tsx
│   │   ├── EditButton.tsx
│   │   ├── DeleteManyButton.tsx
│   │   └── ...
│   │
│   ├── layout/                 # Layout components
│   │   ├── AppLayout.tsx      # Main app layout with providers
│   │   ├── AuthLayout.tsx     # Authentication pages layout
│   │   ├── ProtectedRoute.tsx # Route protection wrapper
│   │   ├── Footer.tsx         # Footer component
│   │   └── header/            # Header components
│   │       ├── Navbar.tsx     # Main navigation bar
│   │       ├── Logo.tsx       # Application logo
│   │       ├── LanguageForm.tsx # Language switcher
│   │       └── LogOutDialog.tsx # Logout confirmation
│   │
│   ├── shared/                 # Shared/common components
│   │   ├── loaders/           # Loading indicators
│   │   ├── EmptyCase.tsx      # Empty state component
│   │   ├── Error.tsx          # Error boundary component
│   │   └── [72 component files]
│   │
│   └── ui/                     # UI primitives (Radix UI wrappers)
│       └── [48 UI component files]
│
├── context/                    # React Context providers
│   ├── AuthContext.tsx        # Authentication state management
│   ├── CartContext.tsx        # Shopping cart state
│   ├── GlobalContext.tsx      # Global application state
│   ├── CalendarProvider.tsx    # Calendar functionality
│   ├── DiscardChangesContext.tsx
│   └── StackRoutesContext.tsx
│
├── constants/                  # Application constants
│   └── index.tsx
│
├── data/                       # Mock data files
│   ├── user-data-table.json
│   ├── financial-data.json
│   ├── trainee-data.json
│   └── ...
│
├── hooks/                      # Custom React hooks
│   ├── features/              # Feature-specific hooks
│   │   ├── auth/
│   │   │   ├── useLogin.ts   # Login mutation hook
│   │   │   └── useSignUp.ts  # Sign up mutation hook
│   │   ├── products/
│   │   │   └── useProducts.ts # Products query hook
│   │   ├── users/
│   │   │   ├── useUser.ts    # Single user query
│   │   │   └── useUsers.ts   # Users list query
│   │   ├── gategory/
│   │   │   └── useGetCategories.ts
│   │   └── carts/
│   │       └── [cart hooks]
│   ├── use-media-query.ts    # Media query hook
│   ├── use-mobile.ts         # Mobile device detection
│   ├── useDataTable.tsx      # Table management hook
│   ├── useEditor.ts           # Editor functionality
│   ├── useLocalStorageState.ts
│   ├── useScrollToTop.ts      # Scroll to top on route change
│   ├── useTableSearchParams.ts
│   ├── useWindowSize.ts       # Window size tracking
│   ├── use-toast.ts           # Toast notifications
│   ├── useAutoCloseSheet.ts
│   └── useCloseSheet.ts
│
├── i18n/                       # Internationalization configuration
│   ├── config.ts             # i18next setup
│   ├── formatters.tsx        # Custom formatters (number, currency, date)
│   ├── LocaleSwitcher.tsx    # Language switcher component
│   ├── Localized.tsx         # Localized text component
│   ├── localizedCountry.ts   # Country localization
│   ├── useLocale.tsx         # Locale hook
│   └── useLocalizeDocumentAttributes.ts
│
├── pages/                      # Page components
│   ├── Home/                 # Home page (product listing)
│   │   ├── index.tsx        # Main home component
│   │   └── _components/     # Home page subcomponents
│   │       ├── ProductHeader.tsx
│   │       ├── ProductFilters.tsx
│   │       ├── ProductsGrid.tsx
│   │       └── ProductPagination.tsx
│   │
│   ├── ProductDetails/       # Product details page
│   │   ├── index.tsx
│   │   └── _components/
│   │
│   ├── CreateProduct/        # Create product page (protected)
│   │   └── index.tsx
│   │
│   ├── Cart/                 # Shopping cart page (protected)
│   │   ├── index.tsx
│   │   └── _components/
│   │
│   ├── Auth/                 # Authentication pages
│   │   ├── SignIn/
│   │   │   └── index.tsx
│   │   └── SignUp/
│   │       └── index.tsx
│   │
│   └── 404.tsx              # Not found page
│
├── services/                   # API service layer
│   ├── api-auth.ts          # Authentication API calls
│   ├── api-products.ts      # Products API calls
│   ├── api-carts.ts         # Cart API calls
│   └── api-users.ts         # Users API calls
│
├── types/                      # TypeScript type definitions
│   └── index.ts              # Shared interfaces and types
│
└── utils/                      # Utility functions
    ├── index.ts              # Main utility functions
    ├── cookies.ts            # Cookie management
    └── schemas.ts            # Validation schemas
```

## Architecture & Code Logic

### Application Flow

1. **Initialization** (`main.tsx`)
   - Mounts React app with StrictMode
   - Loads i18n translations with Suspense fallback
   - Renders App component wrapped in Suspense

2. **Root Component** (`App.tsx`)
   - Sets up QueryClient with 20-minute cache and 0 retries
   - Configures global error handling via QueryCache and MutationCache
   - Wraps app with RouterProvider for routing
   - Includes ReactQueryDevtools for development
   - Sets up global Toaster for notifications

3. **Routing** (`routes.tsx`)
   - Uses React Router's createBrowserRouter
   - Implements lazy loading for all routes (code splitting)
   - Route structure:
     - Public routes: Home, Product Details, Sign In, Sign Up
     - Protected routes: Create Product, Cart
     - 404 page for unmatched routes

### Error Handling Strategy

Global error handling in `App.tsx`:

```typescript
const handleError = (error: Error) => {
  // 1. Check if on auth page - let component handle errors
  const isAuthPage = window.location.pathname === '/signin' || 
                     window.location.pathname === '/signup';
  if (isAuthPage) return;

  // 2. Handle specific error types
  - Invalid account type → Show toast, remove cookies, redirect to home
  - 401 Unauthorized → Remove auth cookies, redirect to sign in
  - 500 Server Error → Show error toast
  - Other errors → Show error message toast
};
```

### Component Hierarchy

```
App (with QueryClient)
└── RouterProvider
    ├── AppLayout (with providers)
    │   ├── GlobalProvider
    │   ├── AuthProvider
    │   └── CartProvider
    │       ├── Navbar
    │       ├── Main Content (Outlet)
    │       │   ├── Home
    │       │   ├── ProductDetails
    │       │   ├── CreateProduct (ProtectedRoute)
    │       │   └── Cart (ProtectedRoute)
    │       └── Footer
    │
    └── AuthLayout
        ├── SignIn
        └── SignUp
    └── NotFound
```

## Key Components

### AuthContext (`context/AuthContext.tsx`)

Manages authentication state and operations:

**State:**
- `user`: User object with username and token
- `showLogoutDialog`: Controls logout confirmation dialog

**Functions:**
- `login(credentials)`: Authenticates user and stores credentials
- `logout()`: Shows logout confirmation dialog
- `confirmLogout()`: Clears user data and cookies

**Implementation:**
```typescript
const login = async (credentials: LoginCredentials) => {
  const response: LoginResponse = await loginApi(credentials);
  const userData = {
    username: credentials.username,
    token: response.token,
  };
  setUser(userData);
  setUserCookie(userData);
  setToken(response.token);
};
```

### CartContext (`context/CartContext.tsx`)

Manages shopping cart functionality with localStorage persistence:

**Features:**
- Lazy initialization from localStorage
- Automatic persistence on cart changes
- Memoized totals for performance
- Stable context value to prevent unnecessary re-renders

**Functions:**
- `addToCart(product, quantity)`: Add item or increment quantity
- `removeFromCart(productId)`: Remove item from cart
- `updateQuantity(productId, quantity)`: Update item quantity
- `clearCart()`: Empty the entire cart

**Derived Values:**
- `totalItems`: Sum of all item quantities
- `totalPrice`: Sum of all item prices × quantities

### Home Page (`pages/Home/index.tsx`)

Main product listing page with filtering and pagination:

**Features:**
- Fetches products via React Query
- Category filtering (extracts unique categories)
- Sorting (price ascending/descending, alphabetical by category)
- Pagination (10 items per page)
- Loading and error states

**Implementation:**
```typescript
// Category extraction
const categories = useMemo(() => {
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)))
    .filter((c) => c && c.trim().length > 0);
  return uniqueCategories as string[];
}, [products]);

// Filtering and sorting
const filteredAndSortedProducts = useMemo(() => {
  let filtered = products;
  
  // Filter by category
  if (selectedCategory !== 'all') {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }
  
  // Sort
  const sorted = [...filtered];
  if (sortOption === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  }
  
  return sorted;
}, [products, sortOption, selectedCategory]);

// Pagination
const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
const endIndex = startIndex + PRODUCTS_PER_PAGE;
const paginatedProducts = filteredAndSortedProducts.slice(startIndex, endIndex);
```

### AppLayout (`components/layout/AppLayout.tsx`)

Main application layout wrapper:

**Responsibilities:**
- Wraps application with all context providers
- Provides consistent page structure (header, main, footer)
- Implements scroll-to-top behavior on route changes
- Applies responsive container with padding

**Provider Stack:**
```
GlobalProvider
  └── AuthProvider
      └── CartProvider
          └── Layout Components
```

### ProtectedRoute (`components/layout/ProtectedRoute.tsx`)

Route protection wrapper for authenticated pages:

- Checks if user is authenticated via `useAuth()`
- Redirects to sign-in page if not authenticated
- Preserves current URL for post-login redirect

## State Management

### React Query (TanStack Query)

Configuration in `App.tsx`:

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20 * 60 * 1000, // 20 minutes
      retry: 0,
    },
  },
  queryCache: new QueryCache({ onError: handleError }),
  mutationCache: new MutationCache({ onError: handleError }),
});
```

**Benefits:**
- Automatic caching and background refetching
- Global error handling
- Optimistic updates support
- DevTools for debugging

### React Context

Used for global state that doesn't require server synchronization:
- **AuthContext**: User authentication state
- **CartContext**: Shopping cart state
- **GlobalContext**: Application-wide settings

## API Services

### Service Layer Architecture

Located in `src/services/`:

```typescript
// api-products.ts
export async function getProductsApi() {
  const res = await getAllData('/products', { method: 'GET' });
  return res;
}

export async function createProductApi(data: Partial<Product>) {
  const res = await postData('products', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res;
}
```

### Utility Functions (`utils/index.ts`)

**API Helpers:**
- `getAllData(endpoint, options)`: GET requests
- `postData(endpoint, options)`: POST requests
- `putData(endpoint, options)`: PUT requests
- `deleteData(endpoint, options)`: DELETE requests
- `getAllDataParallel(endpoints, options)`: Parallel requests

**URL Management:**
- `updateSearchParams(key, value)`: Update query params
- `deleteSearchParams(paramName, paramValue)`: Remove query params

**Utilities:**
- `slugify(text)`: Convert text to URL-friendly slug

## Routing

### Route Configuration (`routes.tsx`)

**Public Routes:**
- `/`: Home (product listing)
- `/products/:id`: Product details
- `/signin`: Sign in page
- `/signup`: Sign up page

**Protected Routes:**
- `/create-product`: Create new product
- `/cart`: Shopping cart

**Special Routes:**
- `*`: 404 Not Found page

### Lazy Loading

All pages are lazy-loaded for optimal bundle size:

```typescript
const Home = lazy(() => import('./pages/Home'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
// ...
```

## Internationalization

### i18next Configuration (`i18n/config.ts`)

**Supported Languages:**
- English (en) - Default
- Arabic (ar)

**Features:**
- Language detection from browser
- HTTP backend for loading translation files
- Custom formatters for numbers, currency, and dates
- XSS protection (handled by React, disabled in i18next)

**Custom Formatters:**
```typescript
i18n.services.formatter?.add('number', number);
i18n.services.formatter?.add('currency', currency);
i18n.services.formatter?.add('datetime', datetime);
```

### Translation Files

Located in `public/locales/`:
- `/locales/en/translation.json`
- `/locales/ar/translation.json`

### Usage in Components

```typescript
import { useTranslations } from '@/i18n/useTranslations';
const t = useTranslations();
const title = t('welcome.title'); // Returns translated string
```

### Locale Context

`useLocale()` hook provides:
- `locale`: Current language code
- `isEnglish`: Boolean for English language
- `isArabic`: Boolean for Arabic language

## Installation & Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Task-Assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_BASE_URL=https://fakestoreapi.com
   VITE_DATABASE_URL=<your-database-url>
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BASE_URL` | Base URL for API calls | `https://fakestoreapi.com` |
| `VITE_DATABASE_URL` | Database connection URL | `https://your-api.com/api` |

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code linting |
| `npm run sort:import` | Sort imports automatically |

## Development Features

### Code Quality Tools

- **ESLint**: Code linting with React and TypeScript rules
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **Simple Import Sort**: Automatic import sorting

### UI Component Library

Based on **Radix UI** with custom styling:
- Accessible by default
- Unstyled components for full customization
- Comprehensive component set (48+ components)

### Custom Hooks

Feature-specific hooks for reusable logic:
- `useProducts`: Fetch and cache products
- `useLogin`: Handle user login
- `useSignUp`: Handle user registration
- `useDataTable`: Manage table state
- `useScrollToTop`: Scroll to top on route change

## Performance Optimizations

1. **Code Splitting**: Lazy-loaded routes reduce initial bundle size
2. **Memoization**: Used extensively in components and contexts
3. **React Query Caching**: 20-minute cache for API responses
4. **Lazy Initialization**: Context state initialized lazily
5. **Derived Values**: Computed values memoized to avoid recalculations

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features required
- Responsive design for all screen sizes

## License

This project is private and confidential.

## Contributing

Contributions are not accepted for this private project.

---

**Built with ❤️ using React, TypeScript, and Vite**
