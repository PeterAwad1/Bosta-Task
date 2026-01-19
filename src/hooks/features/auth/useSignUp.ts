import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useMutation } from '@tanstack/react-query';

import { FakeStoreUser, SignUpCredentials } from '@/types';

import useTranslations from '@/i18n/useTranslations';
import { signupApi } from '@/services/api-auth';

export const useSignUp = (): {
  isSigningUp: boolean;
  signUp: (credentials: SignUpCredentials) => Promise<FakeStoreUser>;
} => {
  const { t } = useTranslations();
  const navigate = useNavigate();

  const { mutateAsync: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: async (credentials: SignUpCredentials) => {
      const response = await signupApi(credentials);
      return response;
    },
    onSuccess: () => {
      toast.success(t('Sign up successful'));
      navigate('/signin');
    },
   
  });

  return { isSigningUp, signUp };
};
