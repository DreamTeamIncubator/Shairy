export async function getComments(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/public-posts/${id}/comments`
  );
  if (!response.ok) {
    throw new Error('Не удалось загрузить страницу');
  }
  return await response.json();
}
