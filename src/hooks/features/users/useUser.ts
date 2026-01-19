import { useQuery } from '@tanstack/react-query';

import { getUserByIdApi } from '@/services/api-users';

export const useUser = (userId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserByIdApi(userId),
    enabled: !!userId,
  });

  return {
    user: data,
    isLoading,
    error,
  };
};
