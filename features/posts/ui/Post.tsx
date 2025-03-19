'use client';

import React, { useState, useEffect } from 'react';
import {useGetPostQuery, useGetPostLikesQuery, useUpdatePostMutation, useDeleteUserPostMutation} from '../api/post';
import { useGetCommentsQuery, useUpdateCommentLikeStatusMutation } from '@/features/comments/api/comments';
import { CommentItem as CommentItemType } from '@/features/comments/api/comments.types';
import CommentItem from '@/features/comments/ui/CommentItem';
import { TextArea } from '@/shared/ui/TextArea/TextArea';
import { Button } from '@/shared/ui/Button/Button';
import clsx from 'clsx';
import Image from 'next/image';
import * as Popover from '@radix-ui/react-popover';
import { formatDistanceToNow } from 'date-fns';
import EditPost from './EditPost';
import LikeModal from './LikeModal';
import ImageCarousel from './ImageCarousel';
import s from './Post.module.scss';
import { useCommentActions } from '../hooks/useCommentActions';
import { useUpdatePostLikeStatus } from '../hooks/useUpdatePostLikeStatus';
import {ModalRadix} from '@/shared/ui/Modal/ModalRadix';

type PostProps = {
  postId: number;
  isEditing?: boolean;
  open: boolean;
  onClose: () => void;
};

const Post = ({ postId, isEditing = false, onClose, open }: PostProps) => {
  const { data: post } = useGetPostQuery({ postId });
  const { data: postLikes } = useGetPostLikesQuery({ postId });
  const { data: comments } = useGetCommentsQuery({ postId });
  const [updateCommentLikeStatus] = useUpdateCommentLikeStatusMutation();
  const [updatePost] = useUpdatePostMutation()

  const [editMode, setEditMode] = useState(isEditing);
  const [description, setDescription] = useState(post?.description || '');
  const [isLikeModalOpen, setIsLikeModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    if (post?.description !== undefined) {
        setDescription(post.description);
    }
}, [post?.description]); 


  const { isLiked, likesCount, handleUpdatePostLikeStatus } = useUpdatePostLikeStatus(
    postId,
    post?.isLiked || false,
    post?.likesCount || 0
  );

  const {
    content,
    setContent,
    isReplying,
    handleAddCommentOrAnswer,
    handleAnswerClick,
  } = useCommentActions(postId);

  const handleUpdateCommentLikeStatus = async (commentId: number, isLiked: boolean) => {
    try {
      const newLikeStatus = isLiked ? 'NONE' : 'LIKE';
      await updateCommentLikeStatus({ postId, commentId, likeStatus: newLikeStatus });
    } catch (error) {
      console.error('Ошибка при обновлении лайка:', error);
    }
  };

  const handleSave = async () => {
    try {
        await updatePost({postId, description}); 
        setEditMode(false); 
    } catch (error) {
        console.error("Ошибка при сохранении поста", error)
    }
}

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [deletePost] = useDeleteUserPostMutation()

  const deletePostHandler = async()=>{
    setIsDeleteModalOpen(true)
  }

  const confirmDeletePost = async () => {
    try {
      await deletePost(postId).unwrap();
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Ошибка при удалении поста", err);
    }
  };

  return (
    <div className={clsx(s.postWrapper, { [s.blurBackground]: open })}>
      <div className={clsx(s.postContainer, { [s.notEditMode]: !editMode })}>
        <Image src="/close.svg" alt="close edit" width={24} height={24} className={s.iconClose} onClick={onClose} />

        {editMode ? (
          <EditPost
            post={post}
            description={description}
            setDescription={setDescription}
            onSave={handleSave}
            setEditMode={setEditMode}
          />
        ) : (
          <>
            {post?.images && post.images.length > 1 ? (
              <ImageCarousel images={post.images} />
            ) : (
              <img src={post?.images?.[0]?.url} alt="image" className={s.image} />
            )}

            <Popover.Root>
              <Popover.Trigger asChild>
                <div>
                  <div className={s.avatarNameContainer}>
                    {post?.avatarOwner && <img src={post.avatarOwner} alt="Avatar" className={s.avatar} />}
                    <span className={s.userName}>{post?.userName}</span>
                  </div>
                  <Image src="/edit.svg" alt="edit" width={24} height={24} className={s.icon} />
                </div>
              </Popover.Trigger>

              <Popover.Content className={s.editContainer}>
                <div className={s.pencilEditContainer} onClick={() => setEditMode(true)}>
                  <Image src="/pencil.svg" alt="edit" width={24} height={24} />
                  <span>Edit Post</span>
                </div>
                <div className={s.pencilEditContainer} onClick ={deletePostHandler}>
                  <Image src="/delete.svg" alt="delete" width={24} height={24} />
                  <span>Delete Post</span>
                  {/*{isDeleteModalOpen && <DeletePost/>}*/}
                </div>
              </Popover.Content>
            </Popover.Root>

            <div className={s.container}>
              <div className={s.descriptionContainer}>
                {post?.avatarOwner && <img src={post.avatarOwner} alt="Avatar" className={s.avatar} />}
                <div>
                  <p className={s.text}>
                    <span className={s.userName}>{post?.userName}</span> {description}
                  </p>
                  <span className={s.date}>
                    {post?.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : ''}
                  </span>
                </div>
              </div>

              <div className={s.commentsContainer}>
                {comments?.items.map((comment: CommentItemType) => (
                  <CommentItem
                    key={comment.id}
                    postId={post?.id ?? 0}
                    comment={comment}
                    onAnswerClick={handleAnswerClick}
                    onClick={() => handleUpdateCommentLikeStatus(comment.id, comment.isLiked)}
                  />
                ))}
              </div>
            </div>

            <div className={s.likesContainer}>
              <div className={s.icons}>
                <div className={s.iconsLikeShareContainer}>
                  <Image
                    src={!isLiked ? '/heart.svg' : '/redHeart.svg'}
                    alt="heart"
                    width={24}
                    height={24}
                    onClick={handleUpdatePostLikeStatus}
                  />
                  <Image src="/send.svg" alt="send" width={24} height={24} />
                </div>
                <Image src="/save.svg" alt="save" width={24} height={24} />
              </div>

              <div className={s.likesAvatarContainer} onClick={() => setIsLikeModalOpen(true)}>
                {postLikes && postLikes?.items?.length > 0 && (
                  <div className={s.avatars}>
                    {postLikes.items.slice(0, 5).map((user) => (
                      <img key={user.id} src={user.avatars?.[0]?.url} className={s.avatarWhoLikes}  alt={'avatar'}/>
                    ))}
                    {postLikes.items.length > 5 && <span>+{postLikes.items.length - 5}</span>}
                  </div>
                )}
                <span className={s.userName}>{likesCount > 0 ? `${likesCount} "Like"` : null}</span>
              </div>

              {isLikeModalOpen && (
                <LikeModal isOpen={true} onClose={() => setIsLikeModalOpen(false)} likes={postLikes?.items || []} />
              )}

              <span className={s.date}>
                {post?.updatedAt ? formatDistanceToNow(new Date(post.updatedAt), { addSuffix: true }) : ''}
              </span>
            </div>

            <div className={s.textCommentArea}>
              <TextArea
                className={s.commentTextArea}
                value={content}
                onChange={(e) => setContent(e.currentTarget.value)}
                placeholder={isReplying ? 'Add an answer...' : 'Add a comment...'}
              />
              <Button className={s.buttonPublish} variant="textButton" onClick={handleAddCommentOrAnswer}>
                Publish
              </Button>
            </div>
          </>
        )}
      </div>
      <ModalRadix open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} modalTitle={'Delete Post'}>
        <p className={s.text}>Are you sure you want to delete this post?</p>
        <div className={s.wrapper}>
          <Button variant={'outlined'} onClick={confirmDeletePost}>Yes</Button>
          <Button variant={'primary'} onClick={() => setIsOpen(false)}>No</Button>
        </div>
      </ModalRadix>
    </div>
  );
};

export default Post;


