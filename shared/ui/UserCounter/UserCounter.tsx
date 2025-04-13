'use client'
import s from './UserCounter.module.scss'
import { useTranslation } from '@/locales/provider'

type Props = {
  users: number
}

const makeTotalUserArray = (users: number) => {
  return ('00' + users).split('')
}
export const UserCounter = ({ users }: Props) => {
  const t = useTranslation().publicPage

  return (
    <div className={s.usersInfo}>
      <p>{t.registeredUsers}:</p>
      <div className={s.userCounterBlock}>
        {makeTotalUserArray(users).map((item, index) => (
          <div className={s.countItem} key={index}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
