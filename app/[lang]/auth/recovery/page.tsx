'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import s from './Recovery.module.scss'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import { useNewPasswordMutation } from '@/features/auth/api/auth'
import { Input } from '@/shared/ui/Input/Input'
import { useTranslationData } from '@/hooks/useTranslationData'

type Inputs = {
  password: string
  confirmPassword: string
}

const RecoveryPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const searchParams = useSearchParams()
  const [code, setCode] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { localeData } = useTranslationData()

  useEffect(() => {
    const queryCode = searchParams.get('code')
    if (queryCode) {
      setCode(queryCode)
    }
  }, [searchParams])

  const [newPassword] = useNewPasswordMutation()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      newPassword({ newPassword: data.password, recoveryCode: code })
      router.push('/auth/login')
    } catch (err) {
      console.log(`Произошла ошибка ${err}`)
    }
  }

  const handleShowPassword = () => setShowPassword((prev) => !prev)

  return (
    <div className={s.content}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <h2 className={s.title}>{localeData?.auth.passwordResetPage.title}</h2>
        <label className={s.label}>
          <div className={s.password}>
            <span className={s.text}>{localeData?.auth.passwordResetPage.newPassword}</span>
            <Input
              onIconClick={handleShowPassword}
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-[\]{};:'",.<>/?`~]).{6,20}$/,
                  message: `${localeData?.auth.passwordResetPage.passwordRefineZod}`,
                },
                minLength: {
                  value: 6,
                  message: `${localeData?.auth.passwordResetPage.passwordMinZod}`,
                },
                maxLength: {
                  value: 20,
                  message: `${localeData?.auth.passwordResetPage.passwordMaxZod}`,
                },
              })}
              type={showPassword ? 'text' : 'password'}
            />
            <span className={s.eyeIcon} onClick={handleShowPassword}>
              <Image
                src={showPassword ? '/eyeOpen.svg' : '/eyeClosed.svg'}
                alt="Eye Icon"
                width={24}
                height={24}
              />
            </span>
          </div>
          {errors.password && <span className={s.error}>{errors.password.message}</span>}
        </label>
        <label>
          <div className={s.password}>
            <span className={s.text}>
              {localeData?.auth.passwordResetPage.passwordConfirmation}
            </span>
            <Input
              onIconClick={handleShowPassword}
              {...register('confirmPassword', {
                required: 'Password confirmation is required',
                validate: (value) =>
                  value === watch('password') ||
                  `${localeData?.auth.passwordResetPage.PasswordsDoNotMatch}`,
              })}
              type={showPassword ? 'text' : 'password'}
            />
            <span className={s.eyeIcon} onClick={handleShowPassword}>
              <Image
                src={showPassword ? '/eyeOpen.svg' : '/eyeClosed.svg'}
                alt="Eye Icon"
                width={24}
                height={24}
              />
            </span>
          </div>
          {errors.confirmPassword && (
            <span className={s.error}>{errors.confirmPassword.message}</span>
          )}
        </label>

        <span className={s.text}>{localeData?.auth.passwordResetPage.message}</span>

        <Button className={s.button} type="submit">
          {localeData?.auth.passwordResetPage.textLink}
        </Button>
      </form>
    </div>
  )
}

export default RecoveryPage
