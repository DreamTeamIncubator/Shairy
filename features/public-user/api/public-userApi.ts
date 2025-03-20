export async function getProfilePublicUser(profileId: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/public-user/profile/${profileId}`
  )
  if (response.status === 500) {
    throw new Error('Ошибка сервера: 500')
  }

  if (response.status === 404) {
    throw new Error('Пост не найден')
  }

  if (!response.ok) {
    throw new Error('Не удалось загрузить страницу')
  }
  return await response.json()
}
