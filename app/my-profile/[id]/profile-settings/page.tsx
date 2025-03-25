import { RadixTabs } from '@/shared/ui/Tabs/Tabs'
import s from './profileSettings.module.scss'
import GeneralInformation from '@/features/edit-profile/ui/generalInformation/GeneralInformation';

export default function EditProfile() {
  return (
    <div>
      <RadixTabs
        className={s.content}
        tabs={[
          { value: 'tab1', label: 'General information', content: <GeneralInformation/> },
          { value: 'tab2', label: 'Devices', content: <div>Password</div> },
          { value: 'tab3', label: 'Account Management', content: <div>Account Management </div> },
          { value: 'tab4', label: 'My payments', content: <div>Password</div> },
        ]}></RadixTabs>
    </div>
  )
}
