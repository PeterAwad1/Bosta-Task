import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Product } from '@/types';

type Props = {
  product: Product;
  isEnglish: boolean;
  onBack: VoidFunction;
  onAddToCart: VoidFunction;
};

const ProductInfo = ({ product, isEnglish, onBack, onAddToCart }: Props) => {
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        {isEnglish ? 'Back to Products' : 'العودة للمنتجات'}
      </Button>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex items-center justify-center overflow-hidden rounded-lg border border-border bg-neutral-50 p-8">
          <img
            src={product.image}
            alt={product.title}
            className="h-full max-h-[500px] w-full object-contain"
            loading="lazy"
          />
        </div>

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

          <div className="pt-4">
            <Button
              variant="default"
              size="lg"
              onClick={onAddToCart}
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

export default ProductInfo;
