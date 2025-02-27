import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useGetMeQuery } from './../store/services/auth/auth';

export const useRedirectIfAnonymousWithUser = () => {
  const router = useRouter();
  const currentPath = usePathname();

  // Массив путей, которые не должны вызывать редирект
  const excludedPaths = [
    '/auth/recovery',
    '/auth/registration-email-resending',
    '/auth/registration-confirmation',
    '/auth/forgotPassword',
    '/auth/sign-up',
  ];

  // Проверка, является ли текущий путь одним из исключений
  const isExcludedPage = excludedPaths.some((path) => currentPath.includes(path));

  const { data, error, isLoading, isFetching } = useGetMeQuery();
  useEffect(() => {
    console.log('data: ' + !!data);
    console.log('isFetching: ' + isFetching);
    if (!data && !isExcludedPage) {
      // If user is not authorized, redirect to login page
      router.replace('/auth/login');
      router.refresh();
    }
  }, [data, isFetching, router]);

  return { data, error, isLoading, isFetching };
};
