import { getComments } from '@/features/public-posts/comments/api/commentApi';
import { getPost } from '@/features/public-posts/post/api/postApi';
import PostModal from '@/features/public-posts/post/ui/PostModal';
import { notFound } from 'next/navigation';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function PublicPost({ params }: PageProps) {
  const postId = Number(params.id);
  try {
    const [post, comments] = await Promise.all([getPost(postId), getComments(postId)]);

    return <PostModal post={post} comments={comments} />;
  } catch (error) {
    const customError = error as { message: string };
    if (customError.message === 'Пост не найден') {
      return notFound();
    }
    return <div>Что-то пошло не так. Пожалуйста, попробуйте позже.</div>;
  }
}
