'use client';

import React, { useState } from 'react';
import { Input } from '@/components/Input/Input';
import { RadixCheckbox } from '@/components/Checkbox/RadixCheckbox';
import { Button } from '@/components/Button/Button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ModalRadix } from '@/components/Modal/ModalRadix';
import s from './Sign-up.module.scss';
import Link from 'next/link';
import { useRegistrationMutation } from '@/app/store/auth/auth';

// link в отдельную константу.

type FormData = {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  termsOfService: boolean;
};

const validationPatterns = {
  username: /^[a-zA-Z0-9_]+$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).*$/,
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    clearErrors,
    setError,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      termsOfService: false,
    },
    mode: 'onBlur',
  });

  const [registration, { isLoading, isError }] = useRegistrationMutation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string | null>(null);
  const isSignUpDisabled = !isValid || !watch('termsOfService') || isLoading || isError;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { userName, email, password } = data;

    try {
      await registration({
        userName,
        email,
        password,
        baseUrl: window.location.origin,
      }).unwrap();
      setEmailValue(email);
      setIsOpen(true);
      reset();
    } catch (error: any) {
      if (error.status === 400 && error.data) {
        const errorMessages = error.data.messages;

        errorMessages.forEach((msg: { field: string; message: string }) => {
          if (msg.field === 'email') {
            setError('email', { type: 'manual', message: msg.message });
          } else if (msg.field === 'userName') {
            setError('userName', { type: 'manual', message: msg.message });
          }
        });
      }
    }
  };

  return (
    <div className={s.container}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete={'on'}>
        <div className={s.inputWrapper}>
          <div className={s.inputGroup}>
            <label htmlFor={'userName'}>Username</label>
            <Input
              type="text"
              id={'userName'}
              placeholder={'Epam11'}
              error={errors.userName?.message}
              {...register('userName', {
                required: 'UserName is required',
                minLength: { value: 6, message: 'Minimum number of characters 6' },
                maxLength: { value: 30, message: 'Maximum number of characters 30' },
                pattern: {
                  value: validationPatterns.username,
                  message: 'UserName can only contain letters, numbers, and underscores',
                },
              })}
              onFocus={() => clearErrors('userName')}
            />
          </div>

          <div className={s.inputGroup}>
            <label htmlFor={'email'}>Email</label>
            <Input
              type="email"
              id={'email'}
              placeholder={'Epam@epam.com'}
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: validationPatterns.email,
                  message: 'The email must match the format example@example.com',
                },
              })}
              onFocus={() => clearErrors('email')}
            />
          </div>
          <div className={s.inputGroup}>
            <label htmlFor={'password'}>Password</label>
            <Input
              type="password"
              id={'password'}
              placeholder={'******************'}
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum number of characters 6' },
                maxLength: { value: 20, message: 'Maximum number of characters 20' },
                pattern: {
                  value: validationPatterns.password,
                  message: 'Password must contain a-z, A-Z, 0-9, and special characters',
                },
              })}
              onFocus={() => clearErrors('password')}
            />
          </div>

          <div className={s.inputGroup}>
            <label htmlFor={'passwordConfirmation'}>Password confirmation</label>
            <Input
              type="password"
              id={'passwordConfirmation'}
              placeholder={'******************'}
              error={errors.passwordConfirmation?.message}
              {...register('passwordConfirmation', {
                required: 'Please confirm your password',
                validate: (value: string) =>
                  value === watch('password') || 'The passwords must match',
              })}
              onFocus={() => clearErrors('passwordConfirmation')}
            />
          </div>
        </div>

        <div className={s.chechboxGroup}>
          <Controller
            name="termsOfService"
            control={control}
            rules={{ required: 'You must agree to the terms' }}
            render={({ field }) => (
              <>
                <div className={s.checkboxWrapper}>
                  <RadixCheckbox checked={!!field.value} onCheckedChange={field.onChange} />
                  <p>
                    I agree to the <Link href={'/auth/terms'}>Terms of Service</Link> and
                    <Link href={'/auth/privacy'}> Privacy Policy</Link>
                  </p>
                </div>

                {errors.termsOfService && <p>{errors.termsOfService.message}</p>}
              </>
            )}
          />
        </div>

        <div className={s.buttonWrapper}>
          <Button type="submit" disabled={isSignUpDisabled}>
            Sign up
          </Button>
          <p>Do you have an account?</p>
          <Link href={'/auth/login'}>
            <Button className={s.signUpBtn} variant="textButton">
              Sign in
            </Button>
          </Link>
        </div>
      </form>

      <ModalRadix
        className={s.emailSent}
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        modalTitle={'Email sent'}>
        <div>
          <p>We have sent a link to confirm your email to {emailValue}</p>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}>
            OK
          </Button>
        </div>
      </ModalRadix>
    </div>
  );
};

export default SignUp;
