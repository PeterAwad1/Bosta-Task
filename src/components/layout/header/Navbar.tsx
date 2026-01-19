import { LogIn, LogOut,ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import Logo from '../sidebar/Logo';

import LanguageForm from './LanguageForm';

import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

import useLocale from '@/i18n/useLocale';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();
  const { isEnglish } = useLocale();
  const cartCount = getTotalItems();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="mx-auto">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="hidden sm:block">
              <LanguageForm />
            </div>

            {/* Cart */}
            <Link to="/cart">
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

            {/* Login/User Menu */}
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

            {/* Mobile Language Switcher */}
            <div className="sm:hidden">
              <LanguageForm />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
