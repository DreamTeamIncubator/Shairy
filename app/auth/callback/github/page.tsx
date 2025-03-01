'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGitHubLoginMutation } from '@/features/auth/api/auth';

const GitHubAuthCallback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [gitHubLogin] = useGitHubLoginMutation();

  useEffect(() => {
    const code = searchParams.get('code');
    const accessToken = searchParams.get('accessToken');

    if (accessToken) {
      localStorage.setItem('access-token', accessToken);
      router.push('/home');
      return;
    }

    if (code) {
      gitHubLogin({ redirect_url: `${window.location.origin}/auth/callback/github` })
        .unwrap()
        .then((response) => {
          localStorage.setItem('access-token', response.accessToken);
          router.push('/home');
        })
        .catch((error) => {
          console.error('Ошибка аутентификации (GitHub)', error);
          router.push('/auth/login');
        });
    }
  }, [searchParams, gitHubLogin, router]);
};

export default GitHubAuthCallback;
