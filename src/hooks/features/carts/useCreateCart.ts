import { toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Cart, CartProduct } from '@/types';

import useTranslations from '@/i18n/useTranslations';
import { createCartApi } from '@/services/api-carts';

export const useCreateCart = (): {
  isPending: boolean;
  createCart: (data: { userId: number; products: CartProduct[] }) => Promise<Cart>;
} => {
  const queryClient = useQueryClient();
  const { t } = useTranslations();
  const { mutateAsync: createCart, isPending } = useMutation({
    mutationFn: (data: { userId: number; products: CartProduct[] }) =>
      createCartApi(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
      const message =
        response?.message || t('Cart has been created successfully');

      toast.success(message);
    },
    onError: (error: Error) => {
      toast.error(error.message || t('Failed to create cart'));
    },
  });

  return { isPending, createCart };
}
