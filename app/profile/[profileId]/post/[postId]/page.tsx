import { getComments } from '@/features/public-posts/comments/api/commentApi'
import { getPost } from '@/features/public-posts/post/api/postApi'
import PostModal from '@/features/public-posts/post/ui/PostModal'
import { notFound } from 'next/navigation'
import { CommentsType } from '@/features/public-posts/comments/types'
import { PostType } from '@/features/public-posts/post/types'

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

    return (
      <div>
        <PostModal post={post} comments={comments} />
      </div>
    )
  } catch (error) {
    const customError = error as { message: string }
    if (customError.message === 'Пост не найден') {
      return notFound()
    }
    return <div>Что-то пошло не так. Пожалуйста, попробуйте позже.</div>
  }
}
