import React from 'react'
import s from '@/app/[lang]/my-profile/[id]/myProfile.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import noAvatar from '@/public/no-avatar.svg'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useGetPublicProfileQuery } from '@/features/profile/api/publicProfile'
import { useGetProfileQuery } from '../api/profileApi'
import { useTranslationData } from '@/hooks/useTranslationData'

const ProfileDescription = () => {
  const { id } = useParams()
  const { localeData } = useTranslationData()
  const { data: authUser } = useGetProfileQuery()
  const { data } = useGetPublicProfileQuery(Number(id))
  if (!id) {
    return <div>Loading...</div>
  }
  const avatar = data?.avatars[0]?.url ? data.avatars[0].url : noAvatar.src
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
          <span>{data?.userMetadata.following}</span>
          <span>{localeData?.myProfile.statistics.following.label}</span>
        </div>
        <div className={s.followersData}>
          <span>{data?.userMetadata.followers}</span>
          <span>{localeData?.myProfile.statistics.followers.label}</span>
        </div>
        <div className={s.followersData}>
          <span>{data?.userMetadata.publications}</span>
          <span>{localeData?.myProfile.statistics.publications.label}</span>
        </div>
      </div>
      {/*TODO: delete test-text after adding feature 'add post'*/}
      <p className={s.description}>{authUser?.aboutMe || data?.aboutMe}</p>
    </div>
  )
}

export default ProfileDescription
