'use client'

import { Button } from '@/shared/ui/Button/Button'
import { useRouter } from 'next/navigation'
import s from './LogOutForm.module.scss'
import { useLogoutMutation } from '../../api/auth'

export default function LogOutForm() {
  const router = useRouter()
  const [logout] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      const response = await logout()
      console.log('Logout response:', response)

      localStorage.removeItem('access-token')

      router.push('/')
    } catch (err) {
      console.error('Ошибка при выходе:', err)
      if ('status' in err) {
        console.error(`Ошибка API: ${err.status} - ${err.data?.message || 'Unknown error'}`)
      }
    }
  }

  const handleClose = () => {
    router.back()
  }

  return (
    <section className={s.section}>
      <p>
        Are you really want to log out of your account <b>“Epam@epam.com”</b>?
      </p>
      <div className={s.buttonGroup}>
        <Button variant={'outlined'} onClick={handleLogout}>
          Yes
        </Button>
        <Button onClick={handleClose}>No</Button>
      </div>
    </section>
  )
}
