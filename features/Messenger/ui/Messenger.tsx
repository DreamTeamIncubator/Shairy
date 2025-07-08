'use client'

import { Text } from '@radix-ui/themes'
import { InputSearch } from './InputSearch/InputSearch'
import s from './Messenger.module.scss'
import { ContactList } from './ContactList/ContactList'
import { Conversation } from './Conversation/Conversation'
import { User } from '../../users/api/users.types'
import { useState } from 'react'
import Image from 'next/image'
import noImg from '@/assets/icons/noImg.png'

export const Messenger = () => {
  const [receiver, setReceiver] = useState<User | null>(null)
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className={s.container}>
      <Text className={s.title}>Messenger</Text>
      <div className={s.messenger}>
        <div className={s.header}>
          <InputSearch setSearchValue={setSearchValue} />
          {receiver && (
            <div className={s.receiverInfo}>
              <Image
                src={receiver.avatars.length ? receiver.avatars[0].url : noImg}
                alt="avatar"
                width={48}
                height={48}
              />
              <p>
                {receiver.firstName} {receiver.lastName}
              </p>
            </div>
          )}
        </div>
        <div className={s.content}>
          <ContactList setReceiver={setReceiver} searchValue={searchValue} />
          <Conversation receiver={receiver} />
        </div>
      </div>
    </div>
  )
}
