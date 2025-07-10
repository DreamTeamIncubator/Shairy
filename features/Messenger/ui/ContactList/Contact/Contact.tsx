'use client'
import { User } from '@/features/users/api/users.types'
import s from './Contact.module.scss'
import Image from 'next/image'
import noImg from '@/assets/icons/noImg.png'

type ContactProps = {
  user: User
  setReceiver: (receiver: User) => void
}

export const Contact = ({ user, setReceiver }: ContactProps) => {
  const handleClick = () => {
    setReceiver(user)
  }

  return (
    <div className={s.container} onClick={handleClick}>
      <Image
        src={user.avatars.length ? user.avatars[0].url : noImg}
        alt="avatar"
        width={48}
        height={48}
        className={s.avatar}
      />
      <div className={s.info}>
        <p className={s.name}>
          {user.firstName ? user.firstName : user.userName} {user.lastName}
        </p>
        <p className={s.text}>Нажмите что бы начать общаться</p>
      </div>
    </div>
  )
}
