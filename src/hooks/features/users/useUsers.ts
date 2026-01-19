import { useQuery } from '@tanstack/react-query';

import { getUsersApi } from '@/services/api-users';

export const useUsers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsersApi(),
  });

  return {
    users: data,
    isLoading,
    error,
  };
};
