export type NotificationItem = {
  id: string
  isRead: boolean
  clientId: string
  message: string
  notifyAt: string
  createdAt: string
}
export type NotificationsResponse = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: NotificationItem[]
}

export type GetNotificationResponse = {
  statusCode: number
  messages: Array<{
    message: string
    field: string | null
  }>
  error: string
}
