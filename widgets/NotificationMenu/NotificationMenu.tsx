import styles from './NotificationMenu.module.scss'

import { useEffect, useState } from 'react'

import OutlinedBell from '@/assets/icons/bell.svg'
import DropdownArrow from '@/assets/icons/dropdown-arrow.svg'
import FilledBell from '@/assets/icons/filled-bell.svg'
// import { useTranslation } from '@/shared/hooks/useTranslation'
// import { Typography } from '@/shared/ui/typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import { io } from 'Socket.IO-client'
import { formatTimeAgo } from '@/utils/utils'
import { useTranslationData } from '@/hooks/useTranslationData'
import { useGetNotificationsQuery } from '@/features/notifications/api'

export type Notification = {
  id: string
  isRead?: boolean
  clientId: string
  message: string
  notifyAt: string
  createdAt: string
}
export const NotificationMenu = () => {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  // const [nnotifications, setNNotifications] = useState<Notification[]>([])
  const { localPath, localeData } = useTranslationData()
  const handleOpen = () => {
    setOpen(!open)
  }
  const { data } = useGetNotificationsQuery({})
  useEffect(() => {
    if (data) {
      console.log(data)
      setNotifications(data.items)
    }
  }, [data])
  //inctagram.work/api/v1/api/v1/notifications/2469?sortBy=notifyAt&sortDirection=desc
  https: useEffect(() => {
    const token = localStorage.getItem('access-token')

    const newSocket = io('https://inctagram.work', {
      // Уберите query, используйте auth
      query: {
        accessToken: token,
      },
      // Явно укажите версию протокола
      transports: ['websocket'],
      upgrade: false,
      reconnectionAttempts: 5,
      // Отключите механизм опроса (polling)
      withCredentials: true,
      forceNew: true,
    })

    newSocket.onAny((event, ...args) => {
      console.log(`🔹 ${event}`, args)
    })

    // Обработчики в правильном порядке
    newSocket.on('connect', () => {
      console.log('✅ Соединение установлено, ID:', newSocket.id)
    })

    newSocket.on('connect_error', (err) => {
      console.error('❌ Ошибка:', {
        message: err.message,
      })
    })

    newSocket.on('error', (err) => {
      console.error('❌ вторая ошибка на просто эррор:', {
        message: err.message,
      })
    })

    newSocket.on('notifications', (data) => {
      console.log('📨 Данные получены:', data)
      setNotifications((prevNotifications) => [...prevNotifications, data])
    })

    return () => {
      newSocket.disconnect()
    }
  }, [])

  return (
    <DropdownMenu.Root onOpenChange={handleOpen} open={open}>
      <DropdownMenu.Trigger asChild>
        <button aria-label={'Notifications button'} className={styles.DropdownMenuButton}>
          <Image
            alt={'Notifications bell'}
            className={styles.notifications}
            src={open ? FilledBell : OutlinedBell}
          />

          {notifications.length ? (
            <span style={{ backgroundColor: 'red' }}>
              {notifications.length < 10 ? notifications.length : '9+'}
            </span>
          ) : null}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        align={'end'}
        alignOffset={-12}
        className={styles.DropdownMenuContent}
        sideOffset={6}>
        <DropdownMenu.Item>{localeData?.notificationMenu.notifications}</DropdownMenu.Item>
        {notifications.map((notification) => (
          <div key={notification.id}>
            <DropdownMenu.Separator className={styles.DropdownMenuSeparator} />
            <DropdownMenu.Item className={styles.DropdownMenuItem}>
              <div>
                <h2>{localeData?.notificationMenu.notifications}</h2>
                {notification.isRead && (
                  <span className={styles.NewNotification}>{localeData?.notificationMenu.new}</span>
                )}
              </div>
              <span className={styles.NotificationMessage}>{notification.message}</span>
              <div className={styles.NotificationDate}>
                {notification.notifyAt
                  ? formatTimeAgo(notification.notifyAt, localPath)
                  : formatTimeAgo(notification.createdAt, localPath)}{' '}
                {localeData?.notificationMenu.ago}
              </div>
            </DropdownMenu.Item>
          </div>
        ))}
        <Image src={DropdownArrow} alt={'Arrow down'} className={styles.DropdownMenuArrow} />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
