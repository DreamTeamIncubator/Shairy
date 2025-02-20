'use client';

import React, { useState } from 'react';
import { Button } from '@/components/Button/Button';
import s from '@/app/auth/sign-up/Sign-up.module.scss';
import { Input } from '@/components/Input/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRegistrationEmailResendMutation } from '@/app/store/auth/auth';
import { ModalRadix } from '@/components/Modal/ModalRadix';

const validationPatterns = {
  username: /^[a-zA-Z0-9_]+$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).*$/,
};

type Input = {
  email: string;
};
const RegistrationConfirmation = () => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<Input>({ mode: 'onBlur' });

  const [registrationEmailResend] = useRegistrationEmailResendMutation();
  const [emailValue, setEmailValue] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Input> = async (data) => {
    const { email } = data;

    try {
      await registrationEmailResend({ email, baseUrl: window.location.origin }).unwrap();
      setEmailValue(email);
      setIsOpen(true);
      reset();
    } catch (error: any) {
      if (error.status === 400 && error.data) {
        const errorMessages = error.data.messages;

        errorMessages.forEach((msg: { field: string; message: string }) => {
          if (msg.field === 'email') {
            setError('email', { type: 'manual', message: msg.message });
          }
        });
      }
    }
  };

  return (
    <div>
      <h1>Email verification link expired</h1>
      <p>Looks like the verification link has expired. Not to worry, we can send the link again</p>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
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
        <div>
          <Button>Resend verification link</Button>
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

export default RegistrationConfirmation;
