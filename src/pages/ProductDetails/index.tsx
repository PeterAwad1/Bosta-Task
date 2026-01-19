import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate,useParams } from 'react-router-dom';

import EmptyCase from '@/components/shared/EmptyCase';
import MainLoader from '@/components/shared/loaders/MainLoader';
import { Button } from '@/components/ui/button';

import { useCart } from '@/context/CartContext';

import { useProduct } from '@/hooks/features/products/useProduct';

import useLocale from '@/i18n/useLocale';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, isLoading, error } = useProduct(id ?? '');
  const { addToCart } = useCart();
  const { isEnglish } = useLocale();

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1);
    }
  };

  if (isLoading) {
    return <MainLoader />;
  }

  if (error || !product) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <EmptyCase
          title={isEnglish ? 'Product Not Found' : 'المنتج غير موجود'}
          text={
            isEnglish
              ? 'The product you are looking for does not exist.'
              : 'المنتج الذي تبحث عنه غير موجود.'
          }
          image="/images/coming.png"
        />
        <Link to="/">
          <Button variant="default">
            {isEnglish ? 'Back to Products' : 'العودة للمنتجات'}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        {isEnglish ? 'Back to Products' : 'العودة للمنتجات'}
      </Button>

      {/* Product Details */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Image */}
        <div className="flex items-center justify-center overflow-hidden rounded-lg border border-border bg-neutral-50 p-8">
          <img
            src={product.image}
            alt={product.title}
            className="h-full max-h-[500px] w-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium text-primary-500">
              {product.category}
            </p>
            <h1 className="mb-4 text-3xl font-bold text-foreground">
              {product.title}
            </h1>
            <p className="text-2xl font-bold text-primary-500">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">
              {isEnglish ? 'Description' : 'الوصف'}
            </h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {isEnglish ? 'Rating:' : 'التقييم:'}
              </span>
              <span className="text-sm text-muted-foreground">
                {product.rating.rate} ({product.rating.count}{' '}
                {isEnglish ? 'reviews' : 'تقييم'})
              </span>
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="pt-4">
            <Button
              variant="default"
              size="lg"
              onClick={handleAddToCart}
              className="w-full"
            >
              {isEnglish ? 'Add to Cart' : 'أضف للسلة'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
