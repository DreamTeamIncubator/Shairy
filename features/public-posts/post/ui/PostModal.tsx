'use client';

import * as Dialog from '@radix-ui/react-dialog';
import s from './PostModal.module.scss';
import { PostType } from '../types';
import { CommentsType } from '../../comments/types';
import { useState } from 'react';
import Post from './Post';

type PostModalProps = {
  post: PostType;
  comments: CommentsType;
};

const PostModal = ({ post, comments }: PostModalProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.Overlay} />
        <Dialog.Content className={s.Content}>
          <Dialog.Title></Dialog.Title>
          <Post post={post} comments={comments} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PostModal;
