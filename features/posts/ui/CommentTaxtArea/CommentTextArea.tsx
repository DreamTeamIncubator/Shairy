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

  useEffect(() => {
    console.log(content)

    if (content.length < 1) {
      setError('required')
    } else {
      setError('')
    }
    if (content.length > 300) {
      setError('max length is 300')
    }
  }, [content])

  const onButClick = async (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim().length === 0) {
      setError('required')
    }
    try {
      await handleAddCommentOrAnswer()
      await addComment()
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  return (
    <form onSubmit={onButClick}>
      <div className={error ? s.textCommentAreaWithError : s.textCommentArea}>
        <TextArea
          onClick={() => setError('')}
          showError={!!error}
          error={error}
          disabled={isLoading}
          className={s.commentTextArea}
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
          placeholder={isReplying ? 'Add an answer...' : 'Add a comment...'}
        />
        <Button disabled={isLoading} type="submit" className={s.buttonPublish} variant="textButton">
          Publish
        </Button>
      </div>
    </form>
  )
}
