'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import s from './ForgotPasswordForm.module.scss';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { useForgotPasswordMutation } from '@/store/services/auth/auth';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { ReCaptcha } from '@/components/ReCaptcha/ReCaptcha';
import { ModalRadix } from '@/components/Modal/ModalRadix';

type Inputs = {
  email: string;
};

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { email: '' },
  });

  const [isCaptchaCompleted, setIsCaptchaCompleted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [captchaResponse, setCaptchaResponse] = useState<string | null>(null);
  const [forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const baseUrl = window.location.origin;

    try {
      forgotPassword({ email: data.email, recaptcha: captchaResponse as string, baseUrl });
      setUserEmail(data.email);
      setIsOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={s.content}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <h2 className={s.title}>Forgot Password</h2>
        <label>
          <span className={s.text}>Email</span>
          <Input
            placeholder="Enter your email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Incorrect email address',
              },
            })}
          />
          <span className={s.text}>
            Enter your email address and we will send you further instructions{' '}
          </span>
        </label>
        {errors.email && <span>This field is required</span>}

        <Button type="submit" disabled={!isCaptchaCompleted}>
          Send Link
        </Button>
        <Button
          variant={'textButton'}
          type={'button'}
          onClick={() => {
            router.push('/auth/login');
          }}>
          Back to Sing In
        </Button>
        <div className={s.reCaptcha}>
          <ReCaptcha
            sitekey="6LdHxG4qAAAAAPKRxEHrlV5VvLFHIf2BO5NMI8YM"
            changeCaptchaStatus={setIsCaptchaCompleted}
            onCaptchaResponse={setCaptchaResponse}
          />
        </div>
      </form>

      <ModalRadix
        open={isOpen}
        onClose={handleClose}
        modalTitle="Email sent"
        size="md"
        footer={<Button onClick={handleClose}>OK</Button>}>
        <p>{`We have sent a link to confirm your email to ${userEmail}`}</p>
      </ModalRadix>
    </div>
  );
};

export default ForgotPassword;
