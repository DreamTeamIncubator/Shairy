import React from 'react'
import s from '@/app/[lang]/my-profile/[id]/myProfile.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import noAvatar from '@/public/no-avatar.svg'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useGetPublicProfileQuery } from '@/features/profile/api/publicProfile'
import { useGetProfileQuery } from '../api/profileApi'
import { useTranslationData } from '@/hooks/useTranslationData'
import { useGetUsersByUserNameQuery } from '@/features/users/api/users'


const ProfileDescription = () => {
  const { id } = useParams()
  const { localeData } = useTranslationData()
  const { data: authUser } = useGetProfileQuery()
  const {data} = useGetPublicProfileQuery(Number(id))
  
  const {data: user} = useGetUsersByUserNameQuery(
    { userName: data?.userName ?? ''}, 
    {
      skip: !data?.userName,    
    }
  )
  
  if (!id) {
    return <div>Loading...</div>
  }
  const avatar = user?.avatars[0]?.url ? user.avatars[0].url : noAvatar.src
  const owner = authUser?.id === Number(id)

  return (
    <div className={s.profile}>
      <div className={s.avatar}>
        <img src={avatar} alt="Avatar" className={s.img} />
      </div>
      <div className={s.header}>
        <h2 className={s.name}>{authUser?.userName || data?.userName}</h2>

        {owner && (
          <Link href={`/my-profile/${id}/edit-profile?tab=General-Information`}>
            <Button variant={'secondary'}>{localeData?.myProfile.settingsButton}</Button>
          </Link>
        )}
      </div>
      <div className={s.followers}>
        <div className={s.followersData}>
          <span>{user?.followingCount}</span>
          <span>{localeData?.myProfile.statistics.following.label}</span>
        </div>
        <div className={s.followersData}>
          <span>{user?.followersCount}</span>
          <span>{localeData?.myProfile.statistics.followers.label}</span>
        </div>
        <div className={s.followersData}>
          <span>{user?.publicationsCount }</span>
          <span>{localeData?.myProfile.statistics.publications.label}</span>
        </div>
      </div>
      {/*TODO: delete test-text after adding feature 'add post'*/}
      <p className={s.description}>{data?.aboutMe}</p>
    </div>
  )
}

export default ProfileDescription
