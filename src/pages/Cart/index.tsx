import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import CartEmptyState from './_components/CartEmptyState';
import CartItemRow from './_components/CartItemRow';
import OrderSummary from './_components/OrderSummary';

import { useCart } from '@/context/CartContext';

import useLocale from '@/i18n/useLocale';

const Cart = () => {
  const { cartItems, clearCart } = useCart();
  const { isEnglish } = useLocale();

  if (cartItems.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          {isEnglish ? 'Shopping Cart' : 'سلة التسوق'}
        </h1>

        <Button
          variant="link"
          onClick={clearCart}
          className="text-error-500 hover:text-error-600"
        >
          {isEnglish ? 'Clear Cart' : 'مسح السلة'}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Items */}
        <div className="space-y-4 lg:col-span-2">
          {cartItems.map((item) => (
            <CartItemRow key={item.product.id} item={item} />
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <OrderSummary />
          <Link to="/" className="mt-4 block">
            <Button variant="link" className="w-full rounded-lg">
              {isEnglish ? 'Continue Shopping' : 'متابعة التسوق'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
