'use client'

import * as Dialog from '@radix-ui/react-dialog'
import s from './PostModal.module.scss'
import { PostType } from '../types'
import { CommentsType } from '../../comments/types'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { PublicPost } from './Public-post'

type PostModalProps = {
  post: PostType
  comments: CommentsType
}

const PostModal = ({ post, comments }: PostModalProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isOpen) {
      router.replace(`/public-profile/${post.ownerId}`, { scroll: false })
    }
  }, [isOpen, router, post.ownerId])

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={isOpen ? s.Overlay : ''} />
        <Dialog.Content className={s.Content}>
          <Dialog.Close asChild>
            <Image
              className={s.CloseButton}
              src="/close.svg"
              alt="close edit"
              width={24}
              height={24}
            />
          </Dialog.Close>
          <Dialog.Title></Dialog.Title>
          <PublicPost post={post} comments={comments} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default PostModal
