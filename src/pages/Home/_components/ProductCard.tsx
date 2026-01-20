import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { useCart } from '@/context/CartContext';

import { Product } from '@/types';

import useLocale from '@/i18n/useLocale';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { isEnglish } = useLocale();

  const handleAddToCart = () => addToCart(product, 1);

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-lg',
        'focus-within:ring-2 focus-within:ring-primary/30',
        className,
      )}
    >
      <Link
        to={`/products/${product.id}`}
        className="relative block aspect-square w-full overflow-hidden bg-muted/40"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-110"
        />

      
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* top meta */}
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            {product.category}
          </span>

          {product.rating && (
            <div className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-foreground">
                {product.rating.rate.toFixed(1)}
              </span>
              <span className="text-muted-foreground">
                ({product.rating.count})
              </span>
            </div>
          )}
        </div>

        <Link to={`/products/${product.id}`} className="outline-none">
          <h3
            className={cn(
              'mb-3 line-clamp-2 text-base font-semibold text-foreground',
              'transition-colors group-hover:text-primary',
            )}
          >
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto">
          <div className="mb-4 flex items-end justify-between">
            <p className="text-xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">
              {isEnglish ? 'Incl. taxes' : 'شامل الضريبة'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link to={`/products/${product.id}`}>
              <Button
                variant="outline"
                className="h-11 w-full rounded-xl"
              >
                {isEnglish ? 'Details' : 'التفاصيل'}
              </Button>
            </Link>

            <Button
              variant="default"
              onClick={handleAddToCart}
              className="h-11 w-full rounded-xl sm:hidden"
            >
              {isEnglish ? 'Add to Cart' : 'أضف للسلة'}
            </Button>

            <Button
              variant="default"
              onClick={handleAddToCart}
              className="hidden h-11 w-full rounded-xl sm:flex"
            >
              {isEnglish ? 'Add to Cart' : 'أضف للسلة'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
