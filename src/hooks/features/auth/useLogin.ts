import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/context/AuthContext';

import { LoginCredentials, LoginResponse } from '@/types';

import useTranslations from '@/i18n/useTranslations';
import { loginApi } from '@/services/api-auth';

export const useLogin = (): {
  isLoggingIn: boolean;
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
} => {
  const { t } = useTranslations();
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  
  const { mutateAsync: login, isPending: isLoggingIn } = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await loginApi(credentials);
      await authLogin(credentials);
      return response;
    },
    onSuccess: () => {
      toast.success(t('Login successful') );
      navigate('/');
    },
    onError: (error: Error) => {
      toast.error(
        error.message || t('Failed to login')
      );
    },
  });

  return { isLoggingIn, login };
}
