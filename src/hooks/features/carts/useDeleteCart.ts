import { toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import useTranslations from '@/i18n/useTranslations';
import { deleteCartApi } from '@/services/api-carts';

export const useDeleteCart = (): {
  isPending: boolean;
  deleteCart: (cartId: number) => Promise<void>;
} => {
  const queryClient = useQueryClient();
  const { t } = useTranslations();
  const { mutateAsync: deleteCart, isPending } = useMutation({
    mutationFn: deleteCartApi,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });

      const message =
        response?.message || t('Cart has been deleted successfully');

      toast.success(message);
    },
    onError: (error: Error) => {
      toast.error(error.message || t('Failed to delete cart'));
    },
  });

  return { isPending, deleteCart };
}
