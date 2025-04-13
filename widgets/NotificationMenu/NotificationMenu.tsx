import styles from './NotificationMenu.module.scss'

import { useState } from 'react'

import OutlinedBell from '@/assets/icons/bell.svg'
import DropdownArrow from '@/assets/icons/dropdown-arrow.svg'
import FilledBell from '@/assets/icons/filled-bell.svg'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import { formatTimeAgo } from '@/utils/utils'
import {
  useGetNotificationsQuery,
  useMarkAsReadOnServerMutation,
} from '@/features/notifications/notificationApi'
import { useWebSocket } from '@/hooks/useWebSocket'
import { NotificationsResponse } from '@/features/notifications/types'
import { useTranslation } from '@/locales/provider'
import { useParams } from 'next/navigation'

export const NotificationMenu = () => {
  const [open, setOpen] = useState(false)

  const { lang: localPath } = useParams<{ lang: 'en' | 'ru' }>()
  const t = useTranslation().notificationMenu

  const handleOpen = () => {
    setOpen(!open)
  }
  const { data: notificationData } = useGetNotificationsQuery({})

  useWebSocket({
    notifications: (data) => {
      console.log('New notification:', data)
    },
    error: (err) => console.error('WebSocket error:', err),
  })

  const [markAsReadOnServer] = useMarkAsReadOnServerMutation<NotificationsResponse>()

  const markAsRead = (id: string, isRead: boolean) => {
    if (isRead) {
      return
    }
    markAsReadOnServer([+id])
  }

  return (
    <DropdownMenu.Root onOpenChange={handleOpen} open={open}>
      <DropdownMenu.Trigger asChild>
        <button aria-label={'Notifications button'} className={styles.DropdownMenuButton}>
          <Image
            alt={'Notifications bell'}
            className={styles.notifications}
            src={open ? FilledBell : OutlinedBell}
          />

          {notificationData?.notReadCount ? (
            <span style={{ backgroundColor: 'red' }}>
              {notificationData.notReadCount < 10 ? notificationData.notReadCount : '9+'}
            </span>
          ) : null}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        align={'end'}
        alignOffset={-12}
        className={styles.DropdownMenuContent}
        sideOffset={6}>
        <DropdownMenu.Item>{t.notifications}</DropdownMenu.Item>
        {notificationData?.items.map((notification) => (
          <div
            onMouseEnter={() => markAsRead(notification?.id, notification.isRead)}
            key={notification.id}>
            <DropdownMenu.Separator className={styles.DropdownMenuSeparator} />
            <DropdownMenu.Item className={styles.DropdownMenuItem}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <h2>{t.notifications}</h2>
                {notification.isRead || <span className={styles.NewNotification}>{t.new}</span>}
              </div>
              <span className={styles.NotificationMessage}>{notification.message}</span>
              <div className={styles.NotificationDate}>
                {notification.notifyAt
                  ? formatTimeAgo(notification.notifyAt, localPath)
                  : formatTimeAgo(notification.createdAt, localPath)}{' '}
                {t.ago}
              </div>
            </DropdownMenu.Item>
          </div>
        ))}
        <Image src={DropdownArrow} alt={'Arrow down'} className={styles.DropdownMenuArrow} />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
