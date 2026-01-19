import { Outlet } from 'react-router-dom';

import Navbar from './header/Navbar';
import Footer from './Footer';

import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { GlobalProvider } from '@/context/GlobalContext';

function AppLayout() {
  return (
    <GlobalProvider>
      <AuthProvider>
        <CartProvider>
          <div className="flex min-h-screen flex-col bg-background font-inter">
            <Navbar />
            <main className="flex-1 overflow-y-auto">
              <div className="container mx-auto px-4 py-6 md:px-6 lg:px-[72px]">
                <Outlet />
              </div>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </GlobalProvider>
  );
}

export default AppLayout;
