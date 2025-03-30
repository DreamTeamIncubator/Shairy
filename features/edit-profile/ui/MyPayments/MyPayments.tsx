'use client'
import React, {useEffect, useState} from 'react';
import {useGetMyPaymentsQuery} from '@/features/edit-profile/ui/AccountManagement/Payment/api/paymentApi';
import {Loader} from '@/shared/ui/ClientLoader/Loader';
import DesktopPayments from '@/features/edit-profile/ui/MyPayments/DesktopPayments/DesktopPayments';
import MobilePayments from '@/features/edit-profile/ui/MyPayments/MobilePayments/MobilePayments';

const MyPayments = () => {
    const {data: payments} = useGetMyPaymentsQuery()

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768)
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, []);

    if (!payments) return <Loader/>

    return (
        <>
            {isMobile ? <MobilePayments payments={payments}/> : <DesktopPayments payments={payments}/>}
        </>
    );
};

export default MyPayments;