'use client'
import { useTranslationData } from '@/hooks/useTranslationData'
import s from './UserCounter.module.scss'

type Props = {
  users: number
}

const makeTotalUserArray = (users: number) => {
  return ('00' + users).split('')
}
export const UserCounter = ({ users }: Props) => {
  const { localeData } = useTranslationData()
  return (
    <div className={s.usersInfo}>
      <p>{localeData?.publicPage.registeredUsers}:</p>
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
