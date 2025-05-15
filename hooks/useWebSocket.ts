import { useEffect } from 'react'
import { Socket, io } from 'socket.io-client'
// import { io,Socket } from 'Socket.IO-client'
type SocketEvents = {
  'receive-message': (data: any) => void
  'update-message': (data: any) => void
  'message-deleted': (data: any) => void
  'message-sent': (data: any) => void
  notifications: (notification: any) => void
  error: (err: Error) => void
}

export const useWebSocket = (eventHandlers: Partial<SocketEvents>) => {
  useEffect(() => {
    const token = localStorage.getItem('access-token')
    const socket: Socket<SocketEvents> = io('https://inctagram.work', {
      query: { accessToken: token },
      transports: ['websocket'],
      reconnectionAttempts: 5,
      withCredentials: true,
    })

    // Общие обработчики

    socket.on('connect_error', (err) =>
      console.error('❌ Connection error если что починю:', err.message)
    )

    // Кастомные обработчики из пропсов
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      socket.on(event as keyof SocketEvents, handler)
    })

    return () => {
      socket.offAny()
      socket.disconnect()
    }
  }, [eventHandlers])
}
