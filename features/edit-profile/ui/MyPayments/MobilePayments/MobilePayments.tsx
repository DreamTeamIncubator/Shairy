import React from 'react';
import type {MyPaymentsResponce} from '@/features/edit-profile/ui/AccountManagement/Payment/api/types';
import s from './MobilePayments.module.scss'

type Props = {
    payments: MyPaymentsResponce[]
}

const MobilePayments = ({payments}: Props) => {

    return (
        <div className={s.container}>
            {payments?.map(payment => {
                return (
                    <div className={s.wrapper} key={payment.dateOfPayment}>
                        <div className={s.paymentRow}>
                            <span>Date of Payment</span>
                            <span>{(new Date(payment.dateOfPayment).toLocaleDateString('ru-RU'))}</span>
                        </div>
                        <div className={s.paymentRow}>
                            <span>End date of subscription</span>
                            <span>{(new Date(payment.endDateOfSubscription).toLocaleDateString('ru-RU'))}</span>
                        </div>
                        <div className={s.paymentRow}>
                            <span>Price</span>
                            <span>{`$ ${payment.price}`}</span>
                        </div>
                        <div className={s.paymentRow}>
                            <span>Subscription Type</span>
                            <span>{payment.subscriptionType === 'DAY' ? '1 day' : payment.subscriptionType === 'MONTHLY' ? '1 month' : '7 days'}</span>
                        </div>
                        <div className={s.paymentRow}>
                            <span>Payment Type</span>
                            <span>{payment.paymentType === 'PAYPAL' ? 'PayPal' : payment.paymentType === 'STRIPE' ? 'Stripe' : 'Credit Card'}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default MobilePayments;