import { ShoppingBag } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useCart } from '@/context/CartContext';

import useLocale from '@/i18n/useLocale';

const OrderSummary = () => {
  const { totalPrice } = useCart();
  const { isEnglish } = useLocale();

  return (
    <div className="sticky top-6 rounded-lg border border-border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold text-foreground">
        {isEnglish ? 'Order Summary' : 'ملخص الطلب'}
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {isEnglish ? 'Subtotal' : 'المجموع الفرعي'}
          </span>
          <span className="font-medium">${totalPrice.toFixed(2)}</span>
        </div>

        <div className="border-t border-border pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>{isEnglish ? 'Total' : 'الإجمالي'}</span>
            <span className="text-primary-500">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Button variant="default" className="mt-6 w-full" size="lg">
        <ShoppingBag className="mr-2 h-4 w-4" />
        {isEnglish ? 'Proceed to Checkout' : 'المتابعة للدفع'}
      </Button>
    </div>
  );
};

export default OrderSummary;
