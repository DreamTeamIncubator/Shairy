import { Button } from '@/shared/ui/Button/Button'
import { TextArea } from '@/shared/ui/TextArea/TextArea'
import s from './CommentTextAreaWithSubmit.module.scss'
import { addComment } from '@/app/actions/comments.actions'
import { useCommentActions } from '../../hooks/useCommentActions'
import { useEffect, useState } from 'react'

type Props = {
  postId: number
}

export const CommentTextAreaWithSubmit = ({ postId }: Props) => {
  const { content, setContent, isReplying, handleAddCommentOrAnswer, isLoading } =
    useCommentActions(postId)
  const [error, setError] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  useEffect(() => {
    if (!isTouched) return // Не показываем ошибки до первого взаимодействия

    if (content.trim().length === 0) {
      setError('Comment is required')
    } else if (content.length > 300) {
      setError('Max length is 300 characters')
    } else {
      setError('')
    }
  }, [content, isTouched])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isTouched) setIsTouched(true)
    setContent(e.currentTarget.value)
  }

  const onButClick = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsTouched(true) // Помечаем как "тронутое" при отправке

    if (content.trim().length === 0) {
      setError('Comment is required')
      return
    }

    if (content.length > 300) {
      setError('Max length is 300 characters')
      return
    }

    try {
      await handleAddCommentOrAnswer()
      await addComment()
    } catch (error) {
      console.error('Error submitting comment:', error)
    }
  }

  return (
    <form onSubmit={onButClick}>
      <div className={error ? s.textCommentAreaWithError : s.textCommentArea}>
        <TextArea
          showError={!!error && isTouched}
          error={error}
          disabled={isLoading}
          className={s.commentTextArea}
          value={content}
          onChange={handleChange}
          onBlur={() => setIsTouched(true)}
          placeholder={isReplying ? 'Add an answer...' : 'Add a comment...'}
        />
        <Button
          disabled={isLoading || (isTouched && !!error)}
          type="submit"
          className={s.buttonPublish}
          variant="textButton">
          Publish
        </Button>
      </div>
    </form>
  )
}
