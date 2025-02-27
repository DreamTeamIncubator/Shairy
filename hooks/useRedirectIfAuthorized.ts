import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useGetMeQuery } from './../store/services/auth/auth';

export const useRedirectIfAuthorized = (redirecTo = '/home') => {
  const router = useRouter();

  const { data, isFetching } = useGetMeQuery();

  useEffect(() => {
    if (data && !isFetching) {
      // If user is not authorized, redirect to login page
      router.replace(redirecTo);
    }
  }, [data, isFetching]);
};
