'use client';

import React, {useState} from 'react';
import {Button} from '@/components/Button/Button';
import s from '@/app/auth/registration-email-resending/Registration-email.resending.module.scss';
import {Input} from '@/components/Input/Input';
import {SubmitHandler, useForm} from 'react-hook-form';
import {ModalRadix} from '@/components/Modal/ModalRadix';
import {useRegistrationEmailResendMutation} from '@/store/services/auth/auth';
import {validationPatterns} from '@/utils/utils';
import Image from 'next/image';

type Input = {
    email: string;
}

const RegistrationConfirmation = () => {
    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        setError,
        formState: {errors},
    } = useForm<Input>({mode: 'onBlur'});

    const [registrationEmailResend] = useRegistrationEmailResendMutation();
    const [emailValue, setEmailValue] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onSubmit: SubmitHandler<Input> = async (data) => {
        const {email} = data;

        try {
            await registrationEmailResend({email, baseUrl: window.location.origin}).unwrap();
            setEmailValue(email);
            setIsOpen(true);
            reset();
        } catch (error: any) {
            if (error.status === 400 && error.data) {
                const errorMessages = error.data.messages;

                errorMessages.forEach((msg: { field: string; message: string }) => {
                    if (msg.field === 'email') {
                        setError('email', {type: 'manual', message: msg.message});
                    }
                });
            }
        }
    }

    const onCloseHandler = () => setIsOpen(false)

    return (
        <div className={s.container}>
            <div className={s.textWrapper}>
                <h1>Email verification link expired</h1>
                <p>Looks like the verification link has expired. Not to worry, we can send the link again</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
                <div className={s.inputGroup}>
                <label htmlFor={'email'}>Email</label>
                    <Input
                        type="email"
                        id={'email'}
                        placeholder={'Enter your email'}
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
                    <Button className={s.resendBtn}>Resend verification link</Button>
                </div>
            </form>

            <Image className={s.image} src="/clock.svg" alt="Link expired." width={473} height={352} />

            <ModalRadix
                className={s.emailSent}
                open={isOpen}
                onClose={onCloseHandler}
                modalTitle={'Email sent'}>
                footer={
                <Button onClick={onCloseHandler}> OK </Button>
            }
                <p>We have sent a link to confirm your email to {emailValue}</p>
            </ModalRadix>
        </div>
    );
};

export default RegistrationConfirmation;
