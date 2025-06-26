'use server'

import { revalidateTag } from 'next/cache'

export async function addComment() {
  await revalidateTag(`post-comments`) // Обновляем кеш
}
