import { useEffect, useState } from 'react'
import s from './Conversation.module.scss'
import { useConversationSocket } from '../../hooks/useConversationSocket'
import { useGetDialogsByUserIdQuery } from '../../api/messenger'
import { User } from '@/features/users/api/users.types'
import { formatMessageDate } from '@/utils/formatMessageDate'
import jackdaw from '@/assets/icons/jackdaw.svg'
import doubleJackdaw from '@/assets/icons/doubleJackdaw.svg'
import Image from 'next/image'

type ConversationProps = {
  receiver: User | null
}

export const Conversation = ({ receiver }: ConversationProps) => {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const { data, refetch } = useGetDialogsByUserIdQuery({ dialoguePartnerId: receiver?.id })

  console.log(data)

  useEffect(() => {
    const token = localStorage.getItem('access-token')
    setAccessToken(token)
  }, [])

  const { sendMessage } = useConversationSocket(accessToken ?? '', (msg) =>
    setMessages((prev) => [...prev, msg.messageText])
  )

  console.log(receiver)

  const handleSend = () => {
    if (!input.trim()) return

    sendMessage(input, receiver?.id)

    refetch()

    setInput('')
  }

  return (
    <div className={s.container}>
      {receiver ? (
        <div className={s.content}>
          <div className={s.messagesBlock}>
            {data?.items.map((item) => {
              const statusMessage = item.status === 'SENT' ? jackdaw : doubleJackdaw
              return (
                <div key={item.id} className={s.message}>
                  <p>{item.messageText}</p>
                  <div className={s.messageInfo}>
                    <Image src={statusMessage} alt="statusMessage" width={14} height={14} />
                    <p>{formatMessageDate(item.createdAt)}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={s.inputContainer}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type Message..."
              className={s.input}
            />
            <button className={s.sendButton} onClick={handleSend}>
              Send message
            </button>
          </div>
        </div>
      ) : (
        <p className={s.plug}>Choose who you would like to talk to</p>
      )}
    </div>
  )
}
