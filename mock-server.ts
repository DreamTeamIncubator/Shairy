const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // Укажите ваш клиентский URL
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

io.on('connection', (socket) => {
  console.log('✅ Клиент подключен:', socket.id)

  // Отправка тестового уведомления сразу при подключении
  socket.emit('notifications', {
    id: 1,
    message: 'Добро пожаловат1ь!',
    isRead: false,
    notifyAt: new Date().toISOString(),
  })

  // Установка интервала для отправки уведомлений каждые 5 секунд
  const notificationInterval = setInterval(() => {
    const notification = {
      id: Date.now(), // Используем timestamp как уникальный ID
      message: `Новое уведомление ${new Date().toLocaleTimeString()}`,
      isRead: false,
      notifyAt: new Date().toISOString(),
    }

    console.log('Отправка уведомления:', notification)
    socket.emit('notifications', notification)
  }, 5000) // 5000 мс = 5 секунд

  // Обработка отключения
  socket.on('disconnect', (reason) => {
    console.log(`Клиент ${socket.id} отключен. Причина:`, reason)
    clearInterval(notificationInterval) // Очищаем интервал при отключении
  })

  // Обработка ошибок
  socket.on('error', (err) => {
    console.error('Ошибка сокета:', err)
    clearInterval(notificationInterval) // Очищаем интервал при ошибке
  })
})

httpServer.listen(8080, () => {
  console.log('Socket.IO сервер запущен на порту 8080')
})
