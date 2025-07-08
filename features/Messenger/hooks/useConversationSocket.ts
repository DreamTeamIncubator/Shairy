import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'

const WS_URL = 'https://inctagram.work'

export const useConversationSocket = (accessToken: string, onReceive: (msg: any) => void) => {
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    const socket = io(WS_URL, {
      query: { accessToken },
      transports: ['websocket'],
    })

    socketRef.current = socket

    socket.on('message-send', (data) => {
      onReceive(data)

      socket.emit('receive-message', {
        message: data.messageText,
        receiverId: data.ownerId,
      })
      console.log('send')
      console.log(data)
    })

    socket.on('receive-message', (data) => {
      onReceive(data)
      console.log('recieved')
    })

    socket.on('error', (err) => {
      console.error('Socket error:', err)
    })

    return () => {
      socket.disconnect()
    }
  }, [accessToken, onReceive])

  const sendMessage = (message: string, receiverId?: number) => {
    socketRef.current?.emit('receive-message', {
      message,
      receiverId,
    })
  }

  return { socket: socketRef.current, sendMessage }
}
