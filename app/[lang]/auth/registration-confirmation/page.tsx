'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/shared/ui/Button/Button';
import s from './Registration-confirmation.module.scss';
import { paths } from '@/utils/utils';
import Image from 'next/image';
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
            setErrorMessage('Код подтверждения отсутствует.')
            return;
        }

        registrationConfirmation({ confirmationCode })
            .unwrap()
            .catch((error) => {
                router.push('/auth/registration-email-resending');
            });
    }, [confirmationCode, errorMessage, isLoading, registrationConfirmation, router]);

    return (
        <>
            {isLoading && <p>Подтверждаем регистрацию...</p>}

            {isSuccess && (
                <div className={s.container}>
                    <h1>Congratulations!</h1>
                    <p>Your email has been confirmed</p>
                    <Link className={s.signInBtn} href={paths.auth.login}>
                        <Button>Sign in</Button>
                    </Link>
                    <Image className={s.image} src={'/sign-up-confirmation.svg'} alt={''} width={432} height={300}/>
                </div>
            )}
        </>
    )
}

export default RegistrationConfirmation;
