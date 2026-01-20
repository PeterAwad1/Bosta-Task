import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import QuantityControl from './QuantityControl';

import { useCart } from '@/context/CartContext';

import { Product } from '@/types';

type CartItem = {
  product: Product;
  quantity: number;
};

type CartItemRowProps = {
  item: CartItem;
};

const CartItemRow = ({ item }: CartItemRowProps) => {
  const { removeFromCart, updateQuantity } = useCart();

  const { product, quantity } = item;
  const itemTotal = product.price * quantity;

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row">
      {/* Image */}
      <div className="flex-shrink-0">
        <div className="h-24 w-24 overflow-hidden rounded-lg bg-neutral-50 sm:h-32 sm:w-32">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-2"
          />
        </div>
      </div>

      {/* Details + actions */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link
            to={`/products/${product.id}`}
            className="text-lg font-semibold text-card-foreground hover:text-primary-500"
          >
            {product.title}
          </Link>

          <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>

          <p className="mt-2 text-lg font-bold text-primary-500">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <QuantityControl
            quantity={quantity}
            onDecrease={() => updateQuantity(product.id, quantity - 1)}
            onIncrease={() => updateQuantity(product.id, quantity + 1)}
          />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeFromCart(product.id)}
            className="text-error-500 hover:text-error-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Total */}
      <div className="flex flex-col items-end justify-between sm:items-end">
        <p className="text-lg font-bold text-foreground">
          ${itemTotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartItemRow;
