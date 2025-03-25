'use client'

import AddAvatar from '@/features/edit-profile/ui/generalInformation/AddAvatar/AddAvatar';
import s from './generalInformation.module.scss'

const GeneralInformation = () => {
    return (
        <div className={s.container}>
            <AddAvatar/>
            <div>INFO</div>
        </div>
    );
};

export default GeneralInformation;