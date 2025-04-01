'use client'

import {Input} from '@/shared/ui/Input/Input';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import s from './ProfileSettings.module.scss';
import {RadixSelect} from '@/shared/ui/Select/RadixSelect';
import {Button} from '@/shared/ui/Button/Button';
import {useGetMeQuery} from '@/features/auth/api/auth';
import React, {useEffect} from 'react';
import {validateAge} from '@/features/profile/ui/ProfileSettings/validate-age';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import type {UpdateProfileRequest} from '@/features/profile/api/profileTypes';
import {useUpdateProfileMutation} from '@/features/profile/api/profileApi';
import {DatePicker} from '@/shared/ui/DatePicker/DatePicker';
import {parseDateString, validationForProfileSettingsForm} from '@/utils/utils';
import {useGetProfileQuery, useUpdateProfileMutation} from '@/features/profile/api/profileApi';


export type FormData = {
    userName: string
    firstName: string
    lastName: string
    dateOfBirth?: string
    country?: string
    city?: string
    aboutMe?: string
}

type APIError = {
    statusCode: number
    messages: [
        {
            message: string
            field: string
        }
    ]
    error: string
}

const initialData = {
    userName: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: 'Country',
    city: 'City',
    aboutMe: '',
}

// опции для селекта
const selectOptions = {
    country: [
        {value: 'Russia', label: 'Russia'},
        {value: 'USA', label: 'USA'},
        {value: 'Germany', label: 'Germany'},
    ],
    city: [
        {value: 'Moscow', label: 'Moscow'},
        {value: 'New York', label: 'New York'},
        {value: 'Berlin', label: 'Berlin'},
    ]
}

export const ProfileSettings = () => {

    const {
        register,
        handleSubmit,
        reset,
        control,
        setError,
        getValues,
        formState: {errors},
    } = useForm<FormData>({
        defaultValues: initialData,
        mode: 'onBlur',
    })

    //const {data: user} = useGetMeQuery()
    const {data: user} = useGetProfileQuery()
    const [updateProfile] = useUpdateProfileMutation()
    const router = useRouter()

    useEffect(() => {
        if (user) {
            reset({
                userName: user.userName || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                dateOfBirth: user.dateOfBirth || '',
                country: user.country || '',
                city: user.city || '',
                aboutMe: user.aboutMe || '',
            })
        }
    }, [user, reset])

    const privacyClickHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        sessionStorage.setItem('profileFormData', JSON.stringify(getValues()))
        router.push('/auth/privacy')
    };

    useEffect(() => {
        const handleBeforeUnload = () => {
            // Сохраняем данные при закрытии/обновлении страницы
            sessionStorage.setItem('profileFormData', JSON.stringify(getValues()));
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Восстанавливаем данные при загрузке
        const savedData = sessionStorage.getItem('profileFormData');
        if (savedData) {
            reset(JSON.parse(savedData));
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [reset, getValues]);

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        try {
            // 1. Проверяем возраст через Server Action
            const ageValidationResult = await validateAge(data.dateOfBirth)

            if (!ageValidationResult.isValid) {
                setError('dateOfBirth', {
                    message: ageValidationResult.message,
                    type: 'manual',
                });
                return;
            }

            // 2. Отправка данных профиля
            const formattedDateOfBirth = data.dateOfBirth ? parseDateString(data.dateOfBirth)?.toISOString() : undefined;

            const profileData: UpdateProfileRequest = {
                userName: data.userName,
                firstName: data.firstName,
                lastName: data.lastName,
                city: data.city || '',
                country: data.country || '',
                region: '',
                dateOfBirth: formattedDateOfBirth || '',
                aboutMe: data.aboutMe || '',
            };

            await updateProfile(profileData).unwrap();
            reset();
            alert('Your settings are saved!');
        } catch (error) {
            const apiError = error as APIError;
            if (apiError.statusCode === 400) {
                alert(apiError.messages[0]?.message || 'Invalid data');
            } else if (apiError.statusCode === 401) {
                alert('Unauthorized: Please log in again.');
            } else {
                console.error('Ошибка при обновлении профиля:', error);
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className={s.formWrapper}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.inputGroup}>
                    <label htmlFor={'userName'}>Username*</label>
                    <Input
                        type="text"
                        id={'userName'}
                        placeholder={'Enter your Username'}
                        {...register('userName', validationForProfileSettingsForm.userName)}
                    />
                    {errors.userName && <span className={s.error}>{errors.userName.message}</span>}
                </div>
                <div className={s.inputGroup}>
                    <label htmlFor={'userName'}>First Name*</label>
                    <Input
                        type="text"
                        id={'firstName'}
                        placeholder={'Enter your First Name'}
                        {...register('firstName', validationForProfileSettingsForm.firstName)}
                    />
                    {errors.firstName && <span className={s.error}>{errors.firstName.message}</span>}
                </div>
                <div className={s.inputGroup}>
                    <label htmlFor={'userName'}>Last Name*</label>
                    <Input
                        type="text"
                        id={'lastName'}
                        placeholder={'Enter your Last Name'}
                        {...register('lastName', validationForProfileSettingsForm.lastName)}
                    />
                    {errors.lastName && <span className={s.error}>{errors.lastName.message}</span>}
                </div>
                <div className={s.inputGroup}>
                    <label htmlFor={'userName'}>Date of birth</label>
                    <Controller
                        name="dateOfBirth"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                value={field.value || ''}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    {errors.dateOfBirth && (
                        <div className={s.error}>
                            {errors.dateOfBirth.message}
                            {errors.dateOfBirth.type === 'manual' && (
                                <Link
                                    className={s.link}
                                    href="/auth/privacy"
                                    onClick={privacyClickHandler}
                                >
                                    Privacy Policy
                                </Link>
                            )}
                        </div>
                    )}
                </div>
                <div className={s.selectContainer}>
                    <div className={s.selectGroup}>
                        <label htmlFor={'selectCountry'}>Select your country</label>
                        <div id="selectCountry">
                            <RadixSelect
                                className={s.select}
                                id={'selectCountry'}
                                options={selectOptions.country}
                                onValueChange={() => {
                                }}
                                {...register('country', validationForProfileSettingsForm.country)}
                            />
                            {errors.country && <span className={s.error}>{errors.country.message}</span>}
                        </div>
                    </div>
                    <div className={s.selectGroup}>
                        <label htmlFor={'selectCity'}>Select your city</label>
                        <RadixSelect
                            className={s.select}
                            id={'selectCity'}
                            options={selectOptions.city}
                            onValueChange={() => {
                            }}
                            {...register('city', validationForProfileSettingsForm.city)}
                        />
                        {errors.city && <span className={s.error}>{errors.city.message}</span>}
                    </div>
                </div>
                <div className={s.textareaContainer}>
                    <label htmlFor={'aboutMe'}>About Me</label>
                    <textarea
                        className={s.textarea}
                        id={'aboutMe'}
                        {...register('aboutMe', validationForProfileSettingsForm.aboutMe)}
                    />
                    {errors.aboutMe && <span className={s.error}>{errors.aboutMe.message}</span>}
                </div>
                <Button className={s.submitBtn} variant={'primary'}>Save changes</Button>
            </form>
        </div>
    );
};
