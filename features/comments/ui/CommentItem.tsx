'use client'

import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import s from './CommentItem.module.scss'
import { CommentItem as CommentItemType } from '@/features/comments/api/comments.types'
import { useState } from 'react'
import { useGetCommentAnswersQuery } from '../api/comments'
import AnswerItem from './Answer'
import { useLikeStatus } from '../lib/hooks/useLikeStatus'

type CommentItemProps = {
  postId: number
  comment: CommentItemType
  onClick: (commentId: number, isLiked: boolean) => void
  onAnswerClick: (commentId: number, username: string) => void
}

const CommentItem = ({
  comment: initialComment,
  postId,
  onClick,
  onAnswerClick,
}: CommentItemProps) => {
  const [comment, setComment] = useState(initialComment)
  const { data: answer } = useGetCommentAnswersQuery({ postId, commentId: comment.id })
  const [openAnswers, setOpenAnswers] = useState(false)

  const { isLiked, likeCount, toggleLike } = useLikeStatus({
    initialIsLiked: initialComment.isLiked,
    initialLikeCount: initialComment.likeCount,
    onLikeToggle: (id, newIsLiked) => onClick(id, newIsLiked),
  })

  return (
    <div className={s.comment}>
      <div className={s.avatarCommentWrapper}>
        {comment.from.avatars?.[0]?.url ? (
          <img src={comment.from.avatars[0].url} alt="Avatar" className={s.avatar} />
        ) : (
          <div className={s.defaultAvatar}></div>
        )}
        <div className={s.commentDateLikeAnswer}>
          <div className={s.commentWrapper}>
            <p className={s.text}>
              <span className={s.commentUserName}>{comment.from.username}</span> {comment.content}
            </p>
            <Image
              src={isLiked ? '/redHeart.svg' : '/heart.svg'}
              alt="heart"
              width={16}
              height={16}
              className={s.heart}
              onClick={() => toggleLike(initialComment.id)}
            />
          </div>
          <div>
            <span className={s.date}>
              {comment.createdAt
                ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })
                : ''}
            </span>
            {likeCount > 0 ? <span className={s.like}>Likes: {likeCount}</span> : <></>}
            <span
              className={s.like}
              onClick={() => onAnswerClick(comment.id, comment.from.username)}>
              Answer
            </span>
          </div>
          <div onClick={() => setOpenAnswers((prev) => !prev)}>
            {answer?.items && answer?.items?.length > 0 && (
              <span className={s.showAnswer}>
                {openAnswers
                  ? `Hide answers: (${answer.totalCount})`
                  : `Show answers: (${answer.totalCount})`}
              </span>
            )}
          </div>
          {openAnswers && (
            <div className={s.answerContainer}>
              {answer?.items.map((answer) => (
                <AnswerItem
                  key={answer.id}
                  answer={answer}
                  onLike={() => console.log('Like answer')}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentItem
