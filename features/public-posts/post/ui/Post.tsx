'use client'

import Image from 'next/image'
import s from './Post.module.scss'
import noImg from '@/assets/icons/noImg.png'

import { PostType } from '../types'
import { formatDate } from '@/shared/lib/formatDate'
import Comments from '../../comments/ui/Comments'
import { CommentsType } from '../../comments/types'

type PostProps = {
  post: PostType
  comments: CommentsType
}

const testImg = [noImg, noImg, noImg, noImg]

const Post = ({ post, comments }: PostProps) => {
  const firstThreePhotos = testImg.slice(0, 3) //test
  // const firstThreePhotos = post.avatarWhoLikes.slice(0, 3);

  return (
    <div key={post.id} className={s.post}>
      <div className={s.postImage}>
        <Image
          src={post.images?.length ? post.images[0].url : noImg}
          alt=""
          width={490}
          height={562}
        />
      </div>
      <div>
        <div className={s.commentMain}>
          <Image
            src={post.avatarOwner ? post.avatarOwner : noImg}
            alt=""
            width={36}
            height={36}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
          <span className={s.userName}>{post.userName}</span>
          <p className={s.description}>{post.description}</p>
        </div>
        <Comments comments={comments} />
        <div>
          <div className={s.likes}>
            <div style={{ display: 'flex' }}>
              {firstThreePhotos.length > 0 ? (
                firstThreePhotos.map((photo, i) => (
                  <Image
                    key={i}
                    src={photo || noImg}
                    alt=""
                    width={24}
                    height={24}
                    style={{
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginLeft: i > 0 ? '-9px' : '0',
                      zIndex: firstThreePhotos.length - i,
                    }}
                  />
                ))
              ) : (
                <Image
                  src={noImg}
                  alt=""
                  width={24}
                  height={24}
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
              )}
            </div>
            <span>{`${post.likesCount} "Like"`}</span>
          </div>
          <time className={s.time}>{formatDate(post.createdAt)}</time>
        </div>
      </div>
    </div>
  )
}

export default Post
