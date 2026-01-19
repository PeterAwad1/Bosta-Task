import { useQuery } from '@tanstack/react-query';

import { getCartByIdApi } from '@/services/api-carts';

export const useCart = (cartId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['cart', cartId],
    queryFn: () => getCartByIdApi(cartId),
    enabled: !!cartId,
  });

  return {
    cart: data,
    isLoading,
    error,
  };
};
