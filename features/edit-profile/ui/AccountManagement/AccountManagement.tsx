'use client'

import { RadixCheckbox } from '@/shared/ui/Checkbox/RadixCheckbox'
import s from './AccountManagement.module.scss'
import { useEffect, useState } from 'react'
import { useGetCurrentPaymentQuery } from './Payment/api/paymentApi'
import { useSearchParams } from 'next/navigation'

import { ModalRadix } from '@/shared/ui/Modal/ModalRadix'
import { Button } from '@/shared/ui/Button/Button'
import { Loader } from '@/shared/ui/ClientLoader/Loader'
import { CurrentSubscription } from './CurrentSubscription/CurrentSubscription'
import { Payment } from './Payment/ui/Payment'

const accountTypes = [
  { id: 'personal', label: 'Personal' },
  { id: 'business', label: 'Business' },
] as const

export const AccountManagement = () => {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')

  const { data, isLoading: isDataLoading } = useGetCurrentPaymentQuery()
  const subscriptionInfo = data?.data[data?.data.length - 1]

  const [selectedTypeAccount, setSelectedTypeAccount] = useState<'personal' | 'business' | null>(
    'personal'
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenModalPayment, setIsOpenModalPayment] = useState<boolean>(false)

  useEffect(() => {
    if (subscriptionInfo?.subscriptionId?.length) {
      setSelectedTypeAccount('business')
    }
  }, [subscriptionInfo])

  useEffect(() => {
    if (success) {
      setIsOpenModalPayment(true)
    }
  }, [success])

  if (isLoading || isDataLoading) {
    return <Loader />
  }

  const handleClose = () => {
    setIsOpenModalPayment(false)
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={s.content}>
          {subscriptionInfo?.subscriptionId.length && (
            <CurrentSubscription subscriptionInfo={subscriptionInfo} />
          )}
          <div>
            <h3>Account Type:</h3>
            <div className={s.accountType}>
              {accountTypes.map(({ id, label }) => (
                <RadixCheckbox
                  key={id}
                  showLabel
                  textLabel={label}
                  className={s.checkbox}
                  checked={selectedTypeAccount === id}
                  onCheckedChange={() =>
                    setSelectedTypeAccount(id === selectedTypeAccount ? null : id)
                  }
                />
              ))}
            </div>
          </div>
          {selectedTypeAccount === 'business' && (
            <Payment subscriptionInfo={subscriptionInfo} setIsLoading={setIsLoading} />
          )}
        </div>
      )}
      <ModalRadix
        open={isOpenModalPayment}
        onClose={handleClose}
        modalTitle={success === 'true' ? 'Success' : 'Error'}
        size="md"
        footer={<Button onClick={handleClose}>OK</Button>}>
        <p>
          {success === 'true'
            ? 'Payment was successful!'
            : 'Transaction failed. Please, write to support'}
        </p>
      </ModalRadix>
    </>
  )
}
