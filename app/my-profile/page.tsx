import styles from '../page.module.css';
import React from 'react';

const MyProfile = () => {
    return (
        <div className={styles.page}>
            <h1>My Profile</h1>
        </div>
    );
};

export default MyProfile;

// 'use client'
//
// import { useGetProfileQuery } from '@/features/profile/api/profileApi';
//
// const MyProfile = () => {
//
//     const { data } = useGetProfileQuery()
//
//     console.log(data)
//
//     return (
//         <>
//             <h1>PROFILE</h1>
//         </>
//     )
// }
// export default MyProfile;