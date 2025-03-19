import { getComments } from '@/features/public-posts/comments/api/commentApi'
import { CommentsType } from '@/features/public-posts/comments/types'
import { getPost } from '@/features/public-posts/post/api/postApi'
import { PostType } from '@/features/public-posts/post/types'
import PostModal from '@/features/public-posts/post/ui/PostModal'
import { notFound } from 'next/navigation'

type PageProps = {
  params: {
    postId: string
  }
}

export default async function PublicPost({ params }: PageProps) {
  const postId = Number(params.postId)
  try {
    const [post, comments]: [PostType, CommentsType] = await Promise.all([
      getPost(postId),
      getComments(postId),
    ])

    return <PostModal post={post} comments={comments} />
  } catch (error) {
    const customError = error as { message: string }
    if (customError.message === 'Пост не найден') {
      return notFound()
    }
    return <div>Что-то пошло не так. Пожалуйста, попробуйте позже.</div>
  }
}
