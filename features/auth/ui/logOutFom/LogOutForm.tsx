'use client'

import { Button } from '@/shared/ui/Button/Button'
import { useRouter } from 'next/navigation'
import s from './LogOutForm.module.scss'
import { useGetMeQuery, useLogoutMutation } from '../../api/auth'
import { useTranslation } from '@/locales/provider'

type Props = {
  setFalse: () => void
}

export default function LogOutForm({ setFalse }: Props) {
  const router = useRouter()
  const [logout] = useLogoutMutation()
  const { data } = useGetMeQuery()
  const t = useTranslation().common

  const handleLogout = async () => {
    try {
      await logout()
      localStorage.removeItem('access-token')

      router.push('/')
    } catch (err) {
      console.error('Ошибка при выходе:', err)
      if ('status' in err) {
        console.error(`Ошибка API: ${err.status} - ${err.data?.message || 'Unknown error'}`)
      }
    }
  }

  return (
    <section className={s.section}>
      <p>
        {t.logOutModal.description} <b>{data?.userName}</b>?
      </p>
      <div className={s.buttonGroup}>
        <Button variant={'outlined'} onClick={handleLogout}>
          {t.modal.buttonNames.confirm}
        </Button>
        <Button onClick={setFalse}>{t.modal.buttonNames.cancel}</Button>
      </div>
    </section>
  )
}
