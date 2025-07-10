import React, { useState } from 'react'
import s from '@/features/edit-profile/ui/MyPayments/MyPayments.module.scss'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { MyPaymentsResponse } from '../../AccountManagement/api/types'

type Props = {
  payments: MyPaymentsResponse[]
}

const DesktopPayments = ({ payments }: Props) => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)
  const perPageOptions = [5, 10, 20, 50, 100]

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }
  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage)
    setPage(1)
  }
  const totalPages = Math.ceil(payments.length / perPage)

  const displayedPayments = payments.slice((page - 1) * perPage, page * perPage)

  return (
    <div className={s.container}>
      <div>
        <div className={s.headLine}>
          <div className={s.dateOfPayment}>Date of Payment</div>
          <div className={s.endDate}>End date of subscription</div>
          <div className={s.price}>Price</div>
          <div className={s.subscriptionType}>Subscription Type</div>
          <div className={s.paymentType}>Payment Type</div>
        </div>
        {displayedPayments?.map((payment) => {
          return (
            <div className={s.paymentsRow} key={payment.dateOfPayment}>
              <div className={s.dateOfPayment}>
                {new Date(payment.dateOfPayment).toLocaleDateString('ru-RU')}
              </div>
              <div className={s.endDate}>
                {new Date(payment.endDateOfSubscription).toLocaleDateString('ru-RU')}
              </div>
              <div className={s.price}>{`$ ${payment.price}`}</div>
              <div className={s.subscriptionType}>
                {payment.subscriptionType === 'DAY'
                  ? '1 day'
                  : payment.subscriptionType === 'MONTHLY'
                  ? '1 month'
                  : '7 days'}
              </div>
              <div className={s.paymentType}>
                {payment.paymentType === 'PAYPAL'
                  ? 'PayPal'
                  : payment.paymentType === 'STRIPE'
                  ? 'Stripe'
                  : 'Credit Card'}
              </div>
            </div>
          )
        })}
      </div>
      <Pagination
        count={totalPages}
        onChange={handlePageChange}
        page={page}
        perPage={perPage}
        perPageOptions={perPageOptions}
        onPerPageChange={handlePerPageChange}
      />
    </div>
  )
}

export default DesktopPayments
