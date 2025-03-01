'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import s from './Login.module.scss';
import { Button } from '../../../shared/ui/Button/Button';
import Image from 'next/image';
import { useState } from 'react';

import { useRedirectIfAuthorized } from '@/hooks/useRedirectIfAuthorized';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/features/auth/api/auth';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });

  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLoginMutation();
  const router = useRouter();

  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI as string;

  useRedirectIfAuthorized();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await login(data).unwrap();
      console.log('Успешный вход', response.accessToken);
      router.push('/home');
    } catch (error) {
      console.error('Ошибка входа:', JSON.stringify(error, null));
      setLoginError('The email or password is incorrect. Try again please');
    }
  };

  const handleGitHubLogin = () => {
    const redirectUrl = `${window.location.origin}/auth/callback`;
    const loginUrl = `https://inctagram.work/api/v1/auth/github/login?redirect_url=${encodeURIComponent(
      redirectUrl
    )}`;
    router.push(loginUrl);
  };

  const handleGoogleLogin = () => {
    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${GOOGLE_CLIENT_ID}&` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&response_type=code` +
      `&scope=openid email profile`;

    router.push(authUrl);
  };

  return (
    <div className={s.container}>
      <div className={s.formContainer}>
        <span className={s.title}>Sign In</span>
        <div className={s.iconContainer}>
          <div onClick={handleGoogleLogin} style={{ cursor: 'pointer' }}>
            <Image src="/googleGithub/google.svg" alt="Google" width={36} height={36} />
          </div>
          <div onClick={handleGitHubLogin} style={{ cursor: 'pointer' }}>
            <Image src="/googleGithub/github.svg" alt="GitHub" width={36} height={36} />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={s.formGroup}>
            <label className={s.label}>Email</label>
            <input
              placeholder="Epam@epam.com"
              className={s.input}
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Incorrect email address',
                },
              })}
            />
            {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
          </div>
          <div className={s.formGroup}>
            <label className={s.label}>Password</label>
            <div className={s.passwordContainer}>
              <input
                className={s.input}
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 5,
                    message: 'Password is incorrect. Try again please',
                  },
                })}
              />
              <span className={s.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                <Image
                  src={showPassword ? '/eyeOpen.svg' : '/eyeClosed.svg'}
                  alt="Eye Icon"
                  width={24}
                  height={24}
                />
              </span>
            </div>
            {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}
            {!errors.password && loginError && <span className={s.errorMessage}>{loginError}</span>}
          </div>
          <div className={s.buttonContainer}>
            <Link href="/auth/forgotPassword" className={s.forgotPasswordText}>
              Forgot password
            </Link>
            <Button type="submit" variant={'primary'} className={s.btn} disabled={!isValid}>
              Sign In
            </Button>
          </div>
          <span className={s.text}>{`Don't have an account?`}</span>
          <Link href="/auth/sign-up">
            <Button type="button" variant={'textButton'} className={s.btn}>
              Sign Up
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
