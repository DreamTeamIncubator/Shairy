'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Link from 'next/link';
import { Button } from '@/shared/ui/Button/Button';
import { useRegistrationConfirmationMutation } from '@/features/auth/api/auth';

const RegistrationConfirmation = () => {
  const searchParams = useSearchParams();
  const confirmationCode = searchParams.get('code');
  const [registrationConfirmation, { isLoading, isSuccess }] =
    useRegistrationConfirmationMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!confirmationCode || isLoading) {
      setErrorMessage('Код подтверждения отсутствует.');
      console.log(errorMessage);
      return;
    }

    registrationConfirmation({ confirmationCode })
      .unwrap()
      .catch((error) => {
        router.push('/auth/registration-email-resending');
        console.log(error);
      });
  }, [confirmationCode, errorMessage, isLoading, registrationConfirmation, router]);

  return (
    <div className="container">
      {isLoading && <p>Подтверждаем регистрацию...</p>}

      {isSuccess && (
        <div>
          <h1>Congratulations!</h1>
          <div>
            <p>Your email has been confirmed</p>
            <Link href={'/auth/login'}>
              <Button variant="secondary">Sign in</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationConfirmation;
