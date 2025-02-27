'use client';

import { Input } from '@/components/Input/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import s from './Recovery.module.scss';
import { useNewPasswordMutation } from '@/store/services/auth/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/Button/Button';

type Inputs = {
  password: string;
  confirmPassword: string;
};

const RecoveryPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const searchParams = useSearchParams();
  const [code, setCode] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const queryCode = searchParams.get('code');
    if (queryCode) {
      setCode(queryCode);
    }
  }, [searchParams]);

  const [newPassword] = useNewPasswordMutation();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      newPassword({ newPassword: data.password, recoveryCode: code });
      router.push('/login');
    } catch (err) {
      console.log(`Произошла ошибка ${err}`);
    }
  };

  return (
    <div className={s.content}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <h2 className={s.title}>Recovery password</h2>
        <label className={s.label}>
          <span className={s.text}>New password</span>
          <Input
            onIconClick={() => setShowPassword((prev) => !prev)}
            showIcon
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-[\]{};:'",.<>/?`~]).{6,20}$/,
                message:
                  'Password must contain at least 1 uppercase letter, 1 number, and 1 special character',
              },
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
              maxLength: {
                value: 20,
                message: 'Password must be at most 20 characters',
              },
            })}
            type={showPassword ? 'text' : 'password'}
          />
          {errors.password && <span className={s.error}>{errors.password.message}</span>}
        </label>
        <label>
          <span className={s.text}>Password confirmation</span>
          <Input
            onIconClick={() => setShowPassword((prev) => !prev)}
            showIcon
            {...register('confirmPassword', {
              required: 'Password confirmation is required',
              validate: (value) => value === watch('password') || 'The passwords must match',
            })}
            type={showPassword ? 'text' : 'password'}
          />
        </label>
        {errors.confirmPassword && (
          <span className={s.error}>{errors.confirmPassword.message}</span>
        )}

        <span className={s.text}>Your password must be between 6 and 20 characters</span>

        <Button className={s.button} type="submit">
          Create new password
        </Button>
      </form>
    </div>
  );
};

export default RecoveryPage;
