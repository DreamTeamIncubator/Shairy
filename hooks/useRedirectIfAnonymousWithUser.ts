import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useGetMeQuery } from '@/features/auth/api/auth';

export const useRedirectIfAnonymousWithUser = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const { data, error, isLoading, isFetching } = useGetMeQuery();

  // Массив путей, которые не должны вызывать редирект
  const excludedPaths = [
    '/auth/recovery',
    '/auth/registration-email-resending',
    '/auth/registration-confirmation',
    '/auth/forgotPassword',
    '/auth/sign-up',
    '/auth/callback',
  ];

  // Проверка, является ли текущий путь одним из исключений
  const isExcludedPage = excludedPaths.some((path) => currentPath.includes(path));

  useEffect(() => {
    console.log('data: ' + !!data);
    console.log('isFetching: ' + isFetching);
    if (!data && !isFetching && !isExcludedPage && !isLoading) {
      // If user is not authorized, redirect to login page
      router.replace('/auth/login');
      router.refresh();
    }
  }, [data, isFetching, router, isLoading, currentPath, isExcludedPage]);

  return { data, error, isLoading, isFetching };
};
