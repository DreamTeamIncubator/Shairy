'use client'

import Image from 'next/image'
import ImageWithoutAvatar from '../../../assets/icons/noImg.png'
import { Item, PropsType } from '../types'
import s from '../ui/publicUser.module.css'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/Button/Button'
import { useFollowUserMutation, useGetUsersByUserNameQuery, useUnfollowUserMutation } from '@/features/users/api/users'
import { useGetProfileQuery } from '@/features/profile/api/profileApi'


export const PublicUser = (props: PropsType) => {
  const { additionalData, profileData } = props
  const { data: authUser } = useGetProfileQuery()
  const {data: user} = useGetUsersByUserNameQuery({ userName: profileData.userName }, {
    refetchOnMountOrArgChange: true})
  
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useUnfollowUserMutation()
  const router = useRouter()

  const openPost = (post: Item) => {
    router.push(`/public-profile/${profileData.id}/public-post/${post.id}`, { scroll: false })
  }

  const handleFollowUser = async () => {
    try {
      if (user?.isFollowing) {
        await unfollowUser({ userId: profileData.id}).unwrap()
      } else {
        await followUser({ selectedUserId: profileData.id}).unwrap()
      }
    } catch (error) {
      console.error('Error following', error)
    }
  }

  const owner = authUser?.id === profileData.id
  

  return (
    <div>
      <div className={s.mainInformationBlock}>
        {user?.avatars.length ? (
          <Image
            className={s.avatar}
            src={user?.avatars[0].url}
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
          <div className={s.nameButtonsWrapper}>
            <h1> {user?.userName}</h1>
            {!owner &&     
            <div className={s.actions}>
              <Button className={s.followButton} onClick={handleFollowUser} variant={user?.isFollowing ? 'outlined' : 'primary'}>
                {user?.isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
              <Button variant="secondary" className={s.messageButton}>Send Message</Button>
            </div>
            }
          </div>
          <div className={s.userStats}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p>{user?.followersCount || profileData.userMetadata.followers}</p>
              <p>Followers </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p>{user?.followingCount || profileData.userMetadata.following}</p>
              <p>Following </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p>{profileData.userMetadata.publications}</p>
              <p>Publications </p>
            </div>
          </div>
          <p>{user?.aboutMe}</p>

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
