import { useQuery } from '@tanstack/react-query';

import { getProductsApi } from '@/services/api-products';

export const useProducts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProductsApi(),
  });

  return {
    products: data,
    isLoading,
    error,
  };
};
