'use client'

import { Button } from '@/shared/ui/Button/Button'
import { useRouter } from 'next/navigation'
import s from './LogOutForm.module.scss'
import { useGetMeQuery, useLogoutMutation } from '../../api/auth'
import { useTranslationData } from '@/hooks/useTranslationData'

type Props = {
  setFalse: () => void
}

export default function LogOutForm({ setFalse }: Props) {
  const router = useRouter()
  const [logout] = useLogoutMutation()
  const { data } = useGetMeQuery()
  const { localeData } = useTranslationData()
  const handleLogout = async () => {
    try {
      await logout()
      localStorage.removeItem('access-token')

      router.push('/')
    } catch (err: unknown) {
      console.error('Ошибка при выходе:', err)

      if (typeof err === 'object' && err !== null && 'status' in err) {
        const errorWithStatus = err as { status: number; data?: { message?: string } }
        console.error(
          `Ошибка API: ${errorWithStatus.status} - ${
            errorWithStatus.data?.message || 'Unknown error'
          }`
        )
      }
    }
  }

  return (
    <section className={s.section}>
      <p>
        {localeData?.common.logOutModal.description} <b>{data?.userName}</b>?
      </p>
      <div className={s.buttonGroup}>
        <Button variant={'outlined'} onClick={handleLogout}>
          {localeData?.common.modal.buttonNames.confirm}
        </Button>
        <Button onClick={setFalse}>{localeData?.common.modal.buttonNames.cancel}</Button>
      </div>
    </section>
  )
}
