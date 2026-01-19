import { Minus, Plus, ShoppingBag,Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import EmptyCase from '@/components/shared/EmptyCase';
import { Button } from '@/components/ui/button';

import { useCart } from '@/context/CartContext';

import useLocale from '@/i18n/useLocale';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCart();
  const { isEnglish } = useLocale();

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <EmptyCase
          title={isEnglish ? 'Your Cart is Empty' : 'سلة التسوق فارغة'}
          text={
            isEnglish
              ? 'Add some products to your cart to get started.'
              : 'أضف بعض المنتجات إلى سلة التسوق للبدء.'
          }
          image="/images/404.png"
        />
        <Link to="/" className="mt-6">
          <Button variant="default">
            {isEnglish ? 'Continue Shopping' : 'متابعة التسوق'}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          {isEnglish ? 'Shopping Cart' : 'سلة التسوق'}
        </h1>
        <Button
          variant="outline"
          onClick={clearCart}
          className="text-error-500 hover:text-error-600"
        >
          {isEnglish ? 'Clear Cart' : 'مسح السلة'}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row"
            >
    
              <div className="flex-shrink-0">
                <div className="h-24 w-24 overflow-hidden rounded-lg bg-neutral-50 sm:h-32 sm:w-32">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
              </div>

      
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    to={`/products/${item.product.id}`}
                    className="text-lg font-semibold text-card-foreground hover:text-primary-500"
                  >
                    {item.product.title}
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.product.category}
                  </p>
                  <p className="mt-2 text-lg font-bold text-primary-500">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>


                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-lg border border-border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="min-w-[3rem] text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-error-500 hover:text-error-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

           
              <div className="flex flex-col items-end justify-between sm:items-end">
                <p className="text-lg font-bold text-foreground">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              {isEnglish ? 'Order Summary' : 'ملخص الطلب'}
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {isEnglish ? 'Subtotal' : 'المجموع الفرعي'}
                </span>
                <span className="font-medium">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>

              <div className="border-t border-border pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>{isEnglish ? 'Total' : 'الإجمالي'}</span>
                  <span className="text-primary-500">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="default"
              className="mt-6 w-full"
              size="lg"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              {isEnglish ? 'Proceed to Checkout' : 'المتابعة للدفع'}
            </Button>

            <Link to="/" className="mt-4 block">
              <Button variant="outline" className="w-full">
                {isEnglish ? 'Continue Shopping' : 'متابعة التسوق'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
