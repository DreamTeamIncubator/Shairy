'use client'

// import { AccountManagement } from '@/features/edit-profile/AccountManagement/AccountManagement'
import { RadixTabs } from '@/shared/ui/Tabs/Tabs'
import s from './editProfile.module.scss'

import { Loader } from '@/shared/ui/ClientLoader/Loader'
import { useFixDoubleQueryParams } from '@/hooks/useFixDoubleQueryParams'
import GeneralInformation from '@/features/edit-profile/ui/generalInformation/GeneralInformation'
import { useRouter, useSearchParams } from 'next/navigation'
import { AccountManagement } from '@/features/edit-profile/ui/AccountManagement/AccountManagement'

export default function EditProfile() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useFixDoubleQueryParams()

  if (typeof window !== 'undefined' && window.location.href.split('?').length > 2) {
    return <Loader />
  }

  const currentTab = searchParams.get('tab') || 'General information'

  const handleTabChange = (tab: string) => {
    const newUrl = `?tab=${tab}`
    router.push(newUrl, { scroll: false })
  }
  return (
    <div>
      <RadixTabs
        className={s.content}
        tabs={[
          {
            value: 'General-Information',
            label: 'General information',
            content: <GeneralInformation />,
          },
          { value: 'Devices', label: 'Devices', content: <div>Devices</div> },
          {
            value: 'Account-Management',
            label: 'Account Management',
            content: <AccountManagement />,
          },
          { value: 'My-payments', label: 'My payments', content: <div>My-payments</div> },
        ]}
        defaultValue={currentTab}
        onValueChange={handleTabChange}
      />
    </div>
  )
}
