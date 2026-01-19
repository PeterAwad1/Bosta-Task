import { toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Cart } from '@/types';

import useTranslations from '@/i18n/useTranslations';
import { updateCartApi } from '@/services/api-carts';

export const useEditCart = (): {
  isPending: boolean;
  editCart: (data: { cartId: number; data: Partial<Cart> }) => Promise<Cart>;
} => {
  const queryClient = useQueryClient();
  const { t } = useTranslations();
  const { mutateAsync: editCart, isPending } = useMutation({
    mutationFn: ({ cartId, data }: { cartId: number; data: Partial<Cart> }) =>
      updateCartApi(cartId, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });

      const message =
        response?.message || t('Cart has been updated successfully');

      toast.success(message);
    },
    onError: (error: Error) => {
      toast.error(error.message || t('Failed to update cart'));
    },
  });

  return { isPending, editCart };
}
