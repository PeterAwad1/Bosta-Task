import { useCallback } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import MainLoader from '@/components/shared/loaders/MainLoader';

import ProductInfo from './_components/ProductInfo';
import ProductNotFound from './_components/ProductNotFound';

import { useCart } from '@/context/CartContext';

import { useProduct } from '@/hooks/features/products/useProduct';

import useLocale from '@/i18n/useLocale';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isEnglish } = useLocale();

  const { product, isLoading, error } = useProduct(id ?? '');
  const { addToCart } = useCart();

  const handleBack = useCallback(() => navigate(-1), [navigate]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addToCart(product, 1);
  }, [addToCart, product]);

  if (isLoading) return <MainLoader />;

  if (error || !product) {
    return <ProductNotFound isEnglish={isEnglish} />;
  }

  return (
    <ProductInfo
      product={product}
      isEnglish={isEnglish}
      onBack={handleBack}
      onAddToCart={handleAddToCart}
    />
  );
};

export default ProductDetails;
