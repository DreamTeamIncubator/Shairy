'use client'

import AddAvatar from '@/features/edit-profile/ui/generalInformation/AddAvatar/AddAvatar'
import s from './generalInformation.module.scss'
import ProfileDescription from '@/features/profile/ui/ProfileDescription';
import {ProfileSettings} from '@/features/profile/ui/ProfileSettings/ProfileSettings';

const GeneralInformation = () => {
  return (
    <div className={s.container}>
      <AddAvatar />
      <ProfileSettings />
    </div>
  )
}

export default GeneralInformation
