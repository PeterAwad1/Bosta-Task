import { useQuery } from '@tanstack/react-query';

import { getProductCategoriesApi } from '@/services/api-products';

export const useGetCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product-categories'],
    queryFn: () => getProductCategoriesApi(),
  });

  return {
    categories: data,
    isLoading,
    error,
  };
};
