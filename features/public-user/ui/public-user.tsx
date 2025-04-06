'use client'

import Image from 'next/image'
import ImageWithoutAvatar from '../../../assets/icons/noImg.png'
import { Item, PropsType } from '../types'
import s from '../ui/publicUser.module.css'
import { useRouter } from 'next/navigation'

export const PublicUser = (props: PropsType) => {
  const { additionalData, profileData } = props
  const router = useRouter()

  const openPost = (post: Item) => {
    router.push(`/public-profile/${profileData.id}/public-post/${post.id}`, { scroll: false })
  }

  return (
    <div>
      <div className={s.mainInformationBlock}>
        {profileData.avatars.length ? (
          <Image
            className={s.avatar}
            src={profileData.avatars[0].url}
            alt={'avatar'}
            width={204}
            height={204}
          />
        ) : (
          <Image
            className={s.avatar}
            alt="posts"
            src={ImageWithoutAvatar}
            width={204}
            height={204}
          />
        )}
        <div className={s.profileDescription}>
          <h1> {profileData.userName}</h1>
          <div className={s.userStats}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p>{profileData.userMetadata.followers}</p>
              <p>Followers </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p>{profileData.userMetadata.following}</p>
              <p>Following </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p>{profileData.userMetadata.publications}</p>
              <p>Publications </p>
            </div>
          </div>
          <p>{profileData.aboutMe}</p>
        </div>
      </div>
      <div className={s.postsBlock}>
        {additionalData.items.map((post) => (
          <div key={post.id} onClick={() => openPost(post)}>
            {post.images[0]?.url ? (
              <Image
                alt={`Post by ${post.userName}`}
                src={post.images[0].url}
                width={250}
                height={250}
              />
            ) : (
              <Image
                alt={`Post by ${post.userName} without photo`}
                src={ImageWithoutAvatar}
                width={250}
                height={250}
              />
            )}
            {/* {post.description} */}
          </div>
        ))}
      </div>
    </div>
  )
}
