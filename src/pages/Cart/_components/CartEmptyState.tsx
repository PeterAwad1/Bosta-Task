import { Link } from 'react-router-dom';

import EmptyCase from '@/components/shared/EmptyCase';
import { Button } from '@/components/ui/button';

import useLocale from '@/i18n/useLocale';

const CartEmptyState = () => {
  const { isEnglish } = useLocale();

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
};

export default CartEmptyState;
