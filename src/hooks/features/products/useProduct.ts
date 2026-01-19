import { useQuery } from '@tanstack/react-query';

import { getProductByIdApi } from '@/services/api-products';

export const useProduct = (productId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductByIdApi(productId),
    enabled: !!productId,
  });

  return {
    product: data,
    isLoading,
    error,
  };
};
