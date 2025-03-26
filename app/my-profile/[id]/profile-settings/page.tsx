import {RadixTabs} from '@/shared/ui/Tabs/Tabs'
import s from './profileSettings.module.scss'
import {GeneralSettings} from '@/features/profile/ui/GeneralSettings/GeneralSettings';

export default function EditProfile() {
    return (
        <div>
            <RadixTabs
                className={s.content}
                tabs={[
                    {value: 'tab1', label: 'General information', content: <GeneralSettings />},
                    {value: 'tab2', label: 'Devices', content: <div>Password</div>},
                    {value: 'tab3', label: 'Account Management', content: <div>Account Management </div>},
                    {value: 'tab4', label: 'My payments', content: <div>Password</div>},
                ]}></RadixTabs>
        </div>
    )
}
