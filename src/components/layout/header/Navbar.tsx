import { LogIn, LogOut, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import LanguageForm from './LanguageForm';
import Logo from './Logo';

import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

import useLocale from '@/i18n/useLocale';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems: cartCount } = useCart();
  const { isEnglish } = useLocale();

  const handleLogout = () => logout();

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="mx-auto">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Logo />
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <LanguageForm />
              </div>

         
              <Link to="/cart" className="hidden sm:block">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  aria-label={isEnglish ? 'Shopping Cart' : 'سلة التسوق'}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              {isAuthenticated && user ? (
                <div className="flex items-center gap-2">
                  <span className="hidden font-bold text-primary-500 md:inline">
                    {user.username}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden md:inline">
                      {isEnglish ? 'Logout' : 'تسجيل الخروج'}
                    </span>
                  </Button>
                </div>
              ) : (
                <Link to="/signin">
                  <Button variant="default" size="sm" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    <span>{isEnglish ? 'Login' : 'تسجيل الدخول'}</span>
                  </Button>
                </Link>
              )}

              <div className="sm:hidden">
                <LanguageForm />
              </div>
            </div>
          </div>
        </div>
      </nav>

   
      <Link
        to="/cart"
        className="fixed bottom-5 right-5 z-[60] sm:hidden"
        aria-label={isEnglish ? 'Shopping Cart' : 'سلة التسوق'}
      >
        <Button
          size="icon"
          className="relative h-12 w-12 rounded-full shadow-lg"
        >
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-xs text-white">
              {cartCount}
            </span>
          )}
        </Button>
      </Link>
    </>
  );
};

export default Navbar;
