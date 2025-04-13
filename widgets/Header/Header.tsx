'use client'

import { redirect } from 'next/navigation'
import { Button } from '../../shared/ui/Button/Button'
import s from './Header.module.scss'

import Link from 'next/link'

import { LanguageSelect } from '@/shared/ui/Select/LanguageSelect/LanguageSelect'
import { useGetMeQuery } from '@/features/auth/api/auth'
import { NotificationMenu } from '../NotificationMenu/NotificationMenu'
import { useTranslation } from '@/locales/provider'
export type Notification = {
  id: string
  isNew?: boolean
  message: string
  notificationTime: string
}
export const Header = () => {
  const { data } = useGetMeQuery()
  const SignUpForm = () => {
    redirect('/auth/sign-up')
  }
  const t = useTranslation().auth

  return (
    <div className={s.header}>
      <div className={s.content}>
        <h2 className={s.text}>Shairy</h2>
        <div className={s.navigate}>
          {data ? <NotificationMenu /> : null}
          <LanguageSelect />
          {data ? null : (
            <div>
              <Link href="/auth/login">
                <Button variant={'textButton'} className={s.btn}>
                  {t.signUpPage.signIn}
                </Button>
              </Link>
              <Button variant={'primary'} className={s.btn} onClick={SignUpForm}>
                {t.signUpPage.signUp}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
