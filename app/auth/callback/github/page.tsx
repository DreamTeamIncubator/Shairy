'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGitHubLoginMutation, useGetMeQuery } from '@/features/auth/api/auth';

const GitHubAuthCallback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [gitHubLogin] = useGitHubLoginMutation();
  const [token, setToken] = useState<string | null>(null);

  const { data: user, isSuccess } = useGetMeQuery(undefined, { skip: !token });

  useEffect(() => {
    const code = searchParams.get('code');
    const accessToken = searchParams.get('accessToken');

    if (accessToken) {
      console.log('✅ Токен найден в URL:', accessToken);
      localStorage.setItem('access-token', accessToken);
      setToken(accessToken);
      return;
    }

    if (code) {
      console.log('🔄 Отправляем код на сервер:', code);
      gitHubLogin({ redirect_url: `${window.location.origin}/auth/callback/github` })
        .unwrap()
        .then((response) => {
          console.log('✅ Токен получен от сервера:', response.accessToken);
          localStorage.setItem('access-token', response.accessToken);
          console.log('Google login response:', response);
          setToken(response.accessToken);
        })
        .catch((error) => {
          console.error('❌ Ошибка аутентификации (GitHub)', error);
          router.push('/auth/login');
        });
    }
  }, [searchParams, gitHubLogin]);

  useEffect(() => {
    if (isSuccess && user) {
      console.log('✅ Пользователь успешно загружен:', user);
      router.push('/home');
    }
  }, [isSuccess, user, router]);

  return <div>Авторизация через GitHub...</div>;
};

export default GitHubAuthCallback;
