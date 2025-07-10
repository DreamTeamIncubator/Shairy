import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

// Тип уведомления
interface Notification {
  id: number
  message: string
  isRead: boolean
  notifyAt: string
}

// Опишем типы событий, которые сервер отправляет клиенту
type ServerToClientEvents = {
  notifications: (notification: Notification) => void
}

// Типы событий, которые клиент может отправлять серверу (если нужны)

// Тип данных в handshake.auth
type SocketAuth = {
  token?: string
}

const httpServer = createServer()
const io = new Server<ServerToClientEvents, SocketAuth>(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  },
})

// Middleware для проверки токена
io.use((socket, next) => {
  const token = socket.handshake.auth.token
  if (token) {
    console.log('Клиент аутентифицирован с токеном:', token)
    return next()
  }
  next(new Error('Не авторизован'))
})

io.on('connection', (socket: Socket<ServerToClientEvents>) => {
  console.log('✅ Клиент подключен:', socket.id)

  // Отправка тестового уведомления сразу при подключении
  const initialNotification: Notification = {
    id: 1,
    message: 'Добро пожаловать!',
    isRead: false,
    notifyAt: new Date().toISOString(),
  }
  socket.emit('notifications', initialNotification)

  // Интервал отправки уведомлений
  const notificationInterval = setInterval(() => {
    const notification: Notification = {
      id: Date.now(),
      message: `Новое уведомление ${new Date().toLocaleTimeString()}`,
      isRead: false,
      notifyAt: new Date().toISOString(),
    }
    console.log('Отправка уведомления:', notification)
    socket.emit('notifications', notification)
  }, 5000)

  socket.on('disconnect', (reason) => {
    console.log(`Клиент ${socket.id} отключен. Причина:`, reason)
    clearInterval(notificationInterval)
  })

  socket.on('error', (err) => {
    console.error('Ошибка сокета:', err)
    clearInterval(notificationInterval)
  })
})

httpServer.listen(8080, () => {
  console.log('Socket.IO сервер запущен на порту 8080')
})
