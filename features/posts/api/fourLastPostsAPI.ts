export async function getFourLastPosts() {
  const url = new URL(`https://inctagram.work/api/v1/public-posts/all`)

  url.searchParams.append('pageSize', '4')
  url.searchParams.append('sortDirection', 'desc')

  const response = await fetch(url.toString(), {
    next: { revalidate: 60 },
  })
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
