import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import s from './AnswerItem.module.scss'
import { CommentAnswerItem } from '@/features/comments/api/comments.types'
import { useLikeStatus } from '../lib/hooks/useLikeStatus'

type AnswerProps = {
  answer: CommentAnswerItem
  onLike: (answerId: number, isLiked: boolean) => void
}

const AnswerItem = ({ answer, onLike }: AnswerProps) => {
  const { isLiked, likeCount, toggleLike } = useLikeStatus({
    initialIsLiked: answer.isLiked,
    initialLikeCount: answer.likeCount,
    onLikeToggle: (id, newIsLiked) => onLike(id, newIsLiked),
  })

  return (
    <div className={s.answer}>
      <div className={s.avatarCommentWrapper}>
        {answer.from.avatars?.[0]?.url ? (
          <Image
            src={answer.from.avatars[0].url}
            alt="Avatar"
            width={36}
            height={36}
            className={s.avatar}
          />
        ) : (
          <div className={s.defaultAvatar}></div>
        )}
        <div className={s.answerContent}>
          <p className={s.text}>
            <span className={s.answerUserName}>{answer.from.username}</span> {answer.content}
          </p>
          <Image
            src={isLiked ? '/redHeart.svg' : '/heart.svg'}
            alt="heart"
            width={16}
            height={16}
            className={s.heart}
            onClick={() => toggleLike(answer.id)}
          />
        </div>
      </div>
      <div className={s.dateLikeContainer}>
        <span className={s.date}>
          {answer.createdAt
            ? formatDistanceToNow(new Date(answer.createdAt), { addSuffix: true })
            : ''}
        </span>
        {likeCount > 0 && <span className={s.like}>Likes: {likeCount}</span>}
        <span className={s.like}>Answer</span>
      </div>
    </div>
  )
}

export default AnswerItem
