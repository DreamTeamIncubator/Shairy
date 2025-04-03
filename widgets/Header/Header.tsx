'use client'

import { redirect } from 'next/navigation'
import { Button } from '../../shared/ui/Button/Button'
import s from './Header.module.scss'

import Link from 'next/link'

import { LanguageSelect } from '@/shared/ui/Select/LanguageSelect/LanguageSelect'
import { useGetMeQuery } from '@/features/auth/api/auth'
import { NotificationMenu } from '../NotificationMenu/NotificationMenu'
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
  // const mockedNotifications: Notification[] = [
  //   {
  //     id: '0',
  //     isNew: true,
  //     message: 'Следующий платеж у вас спишется через 1 день',
  //     notificationTime: '1 час',
  //   },
  //   {
  //     id: '1',
  //     isNew: true,
  //     message: 'Ваша подписка истекает через 7 дней',
  //     notificationTime: '1 день',
  //   },
  //   {
  //     id: '2',
  //     isNew: true,
  //     message: 'Ваша подписка истекает через 7 дней',
  //     notificationTime: '1 день',
  //   },
  //   {
  //     id: '3',
  //     message: 'Ваша подписка истекает через 7 дней',
  //     notificationTime: '1 день',
  //   },
  //   {
  //     id: '4',
  //     message: 'Ваша подписка истекает через 7 дней',
  //     notificationTime: '1 день',
  //   },
  // ]
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
                  Log in
                </Button>
              </Link>
              <Button variant={'primary'} className={s.btn} onClick={SignUpForm}>
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
