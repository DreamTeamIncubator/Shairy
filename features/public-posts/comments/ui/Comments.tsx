'use client'

import Image from 'next/image'
import noImg from '@/assets/icons/noImg.png'

import s from './Comments.module.scss'
import { CommentsType } from '../types'
import { getTimeAgo } from '@/shared/lib/getTimeAgo'

type CommentsProps = {
  comments: CommentsType
}
function Comments({ comments }: CommentsProps) {
  return (
    <div>
      <hr className={s.hr} />
      <ul className={s.comments}>
        {comments.items.map((item) => (
          <li key={item.id} className={s.commentsList}>
            <div>
              <Image
                src={item.from.avatars.length ? item.from.avatars[0].url : noImg}
                alt=""
                width={36}
                height={36}
                style={{ borderRadius: '50%', marginRight: '12px' }}
              />
            </div>
            <div>
              <span className={s.userName}>{item.from.username} </span>
              <span>{item.content}</span>
              <div>
                <time className={s.time}>{getTimeAgo(item.createdAt)}</time>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <hr className={s.hr} />
    </div>
  )
}

export default Comments
