'use client'

import {Input} from '@/shared/ui/Input/Input';
import {SubmitHandler, useForm} from 'react-hook-form';
import s from './GeneralSettings.module.scss';
import {RadixSelect} from '@/shared/ui/Select/RadixSelect';
import {Button} from '@/shared/ui/Button/Button';

type FormData = {
    userName: string
    firstName: string
    lastName: string
    dateOfBirth: string
    selectCountry: string
    selectCity: string
    aboutMe: string
}

// опции для селекта
const selectOptions = {
    country: [
        { value: 'Russia', label: 'Russia' },
        { value: 'Belarus', label: 'Belarus' },
        { value: 'Canada', label: 'Canada' },
    ],
    city: [
        { value: 'Moscow', label: 'Moscow' },
        { value: 'Minsk', label: 'Minsk' },
        { value: 'Toronto', label: 'Toronto' },
    ]
}

// Регулярки
const patterns = {
    username: /^[a-zA-Z0-9_-]+$/,
    name: /^[a-zA-Zа-яА-ЯёЁ]+$/,
    date: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.\d{4}$/,
}

// Ошибки
const errorMessages = {
    required: (field: string) => `${field} is required`,
    minLength: (field: string, min: number) => `${field} must be at least ${min} characters`,
    maxLength: (field: string, max: number) => `${field} must not exceed ${max} characters`,
    invalidPattern: (field: string) => `Invalid ${field} format`,
}

// Валидация
const validationRules = {
    userName: {
        required: errorMessages.required('Username'),
        minLength: {
            value: 6,
            message: errorMessages.minLength('Username', 6)
        },
        maxLength: {
            value: 30,
            message: errorMessages.maxLength('Username', 30)
        },
        pattern: {
            value: patterns.username,
            message: 'Only letters, numbers, underscore and hyphen are allowed'
        }
    },
    firstName: {
        required: errorMessages.required('First name'),
        minLength: {
            value: 1,
            message: errorMessages.minLength('First name', 1)
        },
        maxLength: {
            value: 50,
            message: errorMessages.maxLength('First name', 50)
        },
        pattern: {
            value: patterns.name,
            message: 'Only letters are allowed'
        }
    },
    lastName: {
        required: errorMessages.required('Last name'),
        minLength: {
            value: 1,
            message: errorMessages.minLength('Last name', 1)
        },
        maxLength: {
            value: 50,
            message: errorMessages.maxLength('Last name', 50)
        },
        pattern: {
            value: patterns.name,
            message: 'Only letters are allowed'
        }
    },
    dateOfBirth: {
        validate: (value: string) => {
            if (!value) return true;
            return patterns.date.test(value) || errorMessages.invalidPattern('date (dd.mm.yyyy)')
        }
    },
    selectCountry: {
        required: errorMessages.required('Country')
    },
    selectCity: {
        required: errorMessages.required('City')
    },
    aboutMe: {
        maxLength: {
            value: 200,
            message: errorMessages.maxLength('About me', 200)
        }
    }
}

export const GeneralSettings = () => {

    const {
        register,
        handleSubmit,
        reset,
        control,
        watch,
        clearErrors,
        setError,
        trigger,
        formState: {errors},
    } = useForm<FormData>({
        defaultValues: {
            userName: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
        },
        mode: 'onBlur',
    })

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        const { userName, firstName, lastName, dateOfBirth, selectCountry, selectCity, aboutMe } = data
        console.log('Form submitted:', data)
        // логика отправки данных
        alert('Your settings are saved!')
    }

    return (
        <div className={s.formWrapper}>
            <h2>Добавление фото профиля</h2>
            <div>
                <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.inputGroup}>
                        <label htmlFor={'userName'}>Username*</label>
                        <Input
                            value={''}
                            type="text"
                            id={'userName'}
                            placeholder={'Enter your Username'}
                            {...register('userName', validationRules.userName)}
                        />
                        {errors.userName && <span className={s.error}>{errors.userName.message}</span>}
                    </div>
                    <div className={s.inputGroup}>
                        <label htmlFor={'userName'}>First Name*</label>
                        <Input
                            value={''}
                            type="text"
                            id={'firstName'}
                            placeholder={'Enter your First Name'}
                            {...register('firstName', validationRules.firstName)}
                        />
                        {errors.firstName && <span className={s.error}>{errors.firstName.message}</span>}
                    </div>
                    <div className={s.inputGroup}>
                        <label htmlFor={'userName'}>Last Name*</label>
                        <Input
                            value={''}
                            type="text"
                            id={'lastName'}
                            placeholder={'Enter your Last Name'}
                            {...register('lastName', validationRules.lastName)}
                        />
                        {errors.lastName && <span className={s.error}>{errors.lastName.message}</span>}
                    </div>
                    <div className={s.inputGroup}>
                        <label htmlFor={'userName'}>Date of birth</label>
                        <Input
                            value={''}
                            type="text"
                            id={'dateOfBirth'}
                            placeholder={'Enter your Last Name'}
                            {...register('dateOfBirth', validationRules.dateOfBirth)}
                        />
                        {errors.dateOfBirth && <span className={s.error}>{errors.dateOfBirth.message}</span>}
                    </div>
                    <div className={s.selectContainer}>
                        <div className={s.selectGroup}>
                            <label htmlFor={'selectCountry'}>Select your country</label>
                            <RadixSelect
                                className={s.select}
                                id={'selectCountry'}
                                options={selectOptions.country}
                                onValueChange={() => {}}
                                {...register('selectCountry', validationRules.selectCountry)}
                            />
                            {errors.selectCountry && <span className={s.error}>{errors.selectCountry.message}</span>}
                        </div>
                        <div className={s.selectGroup}>
                            <label htmlFor={'selectCity'}>Select your city</label>
                            <RadixSelect
                                className={s.select}
                                id={'selectCity'}
                                options={selectOptions.city}
                                onValueChange={() => {}}
                                {...register('selectCity', validationRules.selectCity)}
                            />
                            {errors.selectCity && <span className={s.error}>{errors.selectCity.message}</span>}
                        </div>
                    </div>
                    <div className={s.textareaContainer}>
                        <label htmlFor={'aboutMe'}>About Me</label>
                        <textarea
                            className={s.textarea}
                            id={'aboutMe'}
                            value={''}
                            {...register('aboutMe', validationRules.aboutMe)}
                        />
                        {errors.aboutMe && <span className={s.error}>{errors.aboutMe.message}</span>}
                    </div>
                    <Button className={s.submitBtn} variant={'primary'} type="submit">Save changes</Button>
                </form>
            </div>
        </div>
    );
};
