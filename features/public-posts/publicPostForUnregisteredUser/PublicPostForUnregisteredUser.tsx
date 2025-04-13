'use client'
import Image from 'next/image'
import userWithoutPhoto from '../../../assets/icons/withoutAvatar.png'
import { PostDescription } from '@/features/posts/ui/PostsDescription/PostDescription'
import Link from 'next/link'
import { formatTimeAgo } from '@/utils/utils'
import { Items } from '@/features/posts/api/post.types'
import styles from './PublicPostForUnregisteredUser.module.scss'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/locales/provider'
export const PublicPostForUnregisteredUser = ({ postItem }: { postItem: Items }) => {
  const { lang: localPath } = useParams<{ lang: string }>()
  const t = useTranslation().notificationMenu

  return (
    <div className={styles.postBlock} key={postItem.id}>
      <Link
        key={postItem.id}
        href={`/public-profile/${postItem.ownerId}/public-post/${postItem.id}`}
        scroll={false}>
        {' '}
        <Image
          alt="post"
          src={postItem.images.length ? postItem.images[0].url : userWithoutPhoto}
          width={250}
          height={250}
          style={{ cursor: 'pointer' }}
        />
      </Link>
      <div className={styles.avatarNameBlock}>
        <Image
          alt="avatar"
          src={postItem.avatarOwner ? postItem.avatarOwner : userWithoutPhoto}
          width={36}
          height={36}
          style={{ borderRadius: '50%' }}
        />
        <p key={postItem.id}>{postItem.userName}</p>
      </div>
      <p className={styles.timeAgo}>
        {formatTimeAgo(postItem.createdAt, localPath as 'en' | 'ru')} {t.ago}
      </p>

      <PostDescription description={postItem.description} />
    </div>
  )
}
