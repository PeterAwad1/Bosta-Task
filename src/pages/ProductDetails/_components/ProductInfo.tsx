import { ArrowLeft, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Product } from '@/types';

import { cn } from '@/lib/utils';

type Props = {
  product: Product;
  isEnglish: boolean;
  onBack: VoidFunction;
  onAddToCart: VoidFunction;
};

const ProductInfo = ({ product, isEnglish, onBack, onAddToCart }: Props) => {
  const hasRating = !!product.rating;

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="gap-2 rounded-xl"
      >
        <ArrowLeft className="h-4 w-4" />
        {isEnglish ? 'Back to Products' : 'العودة للمنتجات'}
      </Button>

      <div className="grid gap-8 lg:grid-cols-2">
        <div
          className={cn(
            'relative overflow-hidden rounded-2xl border border-border bg-card',
            'shadow-sm',
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-transparent to-background/40" />
          <div className="flex items-center justify-center p-6 sm:p-10">
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              className="h-full max-h-[520px] w-full object-contain drop-shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {product.category}
            </span>

            {hasRating && (
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-foreground">
                  {product.rating!.rate.toFixed(1)}
                </span>
                <span className="text-muted-foreground">
                  ({product.rating!.count} {isEnglish ? 'reviews' : 'تقييم'})
                </span>
              </span>
            )}
          </div>

          <h1 className="mb-3 text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            {product.title}
          </h1>

          <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <h2 className="mb-2 text-base font-semibold text-foreground">
              {isEnglish ? 'Description' : 'الوصف'}
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-card p-4 sm:p-5">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-xs text-muted-foreground">
                  {isEnglish ? 'Price' : 'السعر'}
                </p>
                <p className="text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <p className="text-xs text-muted-foreground">
                {isEnglish ? 'Incl. taxes' : 'شامل الضريبة'}
              </p>
            </div>

            <Button
              variant="default"
              size="lg"
              onClick={onAddToCart}
              className="h-12 w-full rounded-xl text-base"
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
