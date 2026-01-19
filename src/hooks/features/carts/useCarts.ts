import { useQuery } from '@tanstack/react-query';

import { getCartsApi } from '@/services/api-carts';

export const useCarts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['carts'],
    queryFn: () => getCartsApi(),
  });

  return {
    carts: data,
    isLoading,
    error,
  };
};
