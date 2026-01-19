import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { useCart } from '@/context/CartContext';

import { Product } from '@/types';

import useLocale from '@/i18n/useLocale';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { isEnglish } = useLocale();


  const handleAddToCart = () => {
    addToCart(product, 1);
  };


  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
   
      {/* Product Image */}
      <Link to={`/products/${product.id}`} className="relative aspect-square w-full overflow-hidden bg-neutral-50 cursor-pointer">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-4 transition-transform group-hover:scale-105"
        />
      </Link>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
        <p className="mb-2 text-xs font-medium text-primary-500">
          {product.category}
        </p>
        {product.rating && (
          <div className="mb-2 flex items-center gap-1">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-card-foreground">
                {product.rating.rate.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.rating.count})
            </span>
          </div>
        )}
        </div>
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-card-foreground">
          {product.title}
        </h3>
        
        {/* Rating */}
       
        
        <p className="mb-4 text-lg font-bold text-primary-500">
          ${product.price.toFixed(2)}
        </p>

        {/* Actions */}
        <div className="mt-auto flex gap-2">
          <Link to={`/products/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              {isEnglish ? 'View Details' : 'عرض التفاصيل'}
            </Button>
          </Link>
          <Button
            variant="default"
            onClick={handleAddToCart}
            className="flex-1"
          >
            {isEnglish ? 'Add to Cart' : 'أضف للسلة'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
