import { toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Product } from '@/types';

import useTranslations from '@/i18n/useTranslations';
import { createProductApi } from '@/services/api-products';

export const useCreateProduct = (): {
  isPending: boolean;
  createProduct: (data: Partial<Product>) => Promise<Product>;
} => {
  const queryClient = useQueryClient();
  const { t } = useTranslations();
  const { mutateAsync: createProduct, isPending } = useMutation({
    mutationFn: (data: Partial<Product>) => createProductApi(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      const message =
        response?.message || t('Product has been created successfully');

      toast.success(message);
    },
    onError: (error: Error) => {
      toast.error(error.message || t('Failed to create product'));
    },
  });

  return { isPending, createProduct };
}
