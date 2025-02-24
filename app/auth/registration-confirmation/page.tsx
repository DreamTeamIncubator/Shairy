'use client';

import React, {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useRegistrationConfirmationMutation} from '@/app/store/auth/auth';
import Link from 'next/link';
import {Button} from '@/components/Button/Button';

const RegistrationConfirmation = () => {

    const searchParams = useSearchParams();
    const confirmationCode = searchParams.get('code');
    const [registrationConfirmation, {isLoading, isSuccess}] = useRegistrationConfirmationMutation();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter()

    useEffect(() => {
        if (!confirmationCode || isLoading) {
            setErrorMessage('Код подтверждения отсутствует.')
            return;
        }

        registrationConfirmation({confirmationCode})
            .unwrap()
            .catch((error) => {
                router.push('/auth/registration-email-resending')
            })

    }, [confirmationCode, registrationConfirmation]);

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
