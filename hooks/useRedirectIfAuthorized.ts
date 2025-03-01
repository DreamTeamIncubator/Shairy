import { useGetMeQuery } from '@/features/auth/api/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useRedirectIfAuthorized = (redirecTo = '/home') => {
  const router = useRouter();

  const { data, isFetching } = useGetMeQuery();

  useEffect(() => {
    if (data && !isFetching) {
      // If user is not authorized, redirect to login page
      router.push(redirecTo);
    }
  }, [data, isFetching, redirecTo, router]);
};
