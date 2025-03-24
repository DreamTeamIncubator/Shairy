import React from 'react'
import s from '@/app/my-profile/[id]/myProfile.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import noAvatar from '@/public/no-avatar.svg'
import { useParams } from 'next/navigation'
import { useGetprofileQuery } from '@/features/profile/api/profile'
import Link from 'next/link'

const ProfileDescription = () => {
  const { id } = useParams()
  const { data } = useGetprofileQuery(+id)
  if (!id) {
    return <div>Loading...</div>
  }
  const avatar = data?.avatars[0]?.url ? data.avatars[0].url : noAvatar.src

  return (
    <div className={s.profile}>
      <div className={s.avatar}>
        <img src={avatar} alt="Avatar" className={s.img} />
      </div>
      <div className={s.header}>
        <h2 className={s.name}>{data?.userName}</h2>

        <Link href={`/my-profile/${id}/profile-settings`}>
          <Button variant={'secondary'}>Profile Settings</Button>
        </Link>
      </div>
      <div className={s.followers}>
        <div className={s.followersData}>
          <span>{data?.userMetadata.following}</span>
          <span>Following</span>
        </div>
        <div className={s.followersData}>
          <span>{data?.userMetadata.followers}</span>
          <span>Followers</span>
        </div>
        <div className={s.followersData}>
          <span>{data?.userMetadata.publications}</span>
          <span>Publications</span>
        </div>
      </div>
      {/*TODO: delete test-text after adding feature 'add post'*/}
      <p className={s.description}>
        {data?.aboutMe}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
  )
}

export default ProfileDescription
