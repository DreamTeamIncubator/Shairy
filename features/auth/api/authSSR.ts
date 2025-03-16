export async function me() {
  const response = await fetch('https://inctagram.work/api/v1/auth/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access-token')}`, // Используйте куки, если токен хранится там
    },
  })
  if (response.status === 500) {
    throw new Error('Ошибка сервера: 500')
  }

  if (response.status === 404) {
    throw new Error('Вы не авторизованы')
  }

  if (!response.ok) {
    throw new Error('Не удалось загрузить страницу')
  }
  return await response.json()
}
