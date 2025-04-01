'use-client'

import { RadixCheckbox } from '@/shared/ui/Checkbox/RadixCheckbox'
import { ModalRadix } from '@/shared/ui/Modal/ModalRadix'
import Image from 'next/image'
import s from './Payment.module.scss'
import { useState } from 'react'
import PayPalIcon from '@/public/payIcons/paypal.svg'
import StripeIcon from '@/public/payIcons/stripe.svg'
import { Button } from '@/shared/ui/Button/Button'
import { usePaySubscribeMutation } from '../../api/paymentApi'
import { PaymentProps, SubscriptionCost, SubscriptionDuration } from './types'

const subscriptionPlans = [
  { id: 'DAY', label: '$10 per 1 Day', amount: 10 },
  { id: 'WEEKLY', label: '$50 per 7 Days', amount: 50 },
  { id: 'MONTHLY', label: '$100 per Month', amount: 100 },
] as const

export const Payment = ({ subscriptionInfo, setIsLoading }: PaymentProps) => {
  const [isOpenModalAgree, setIsOpenModalAgree] = useState<boolean>(false)
  const [agree, setAgree] = useState<boolean>(true)
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [selectedSubscriptionCost, setSelectedSubscriptionCost] = useState<SubscriptionCost>(10)
  const [selectedSubscriptionDuration, setSelectedSubscriptionDuration] =
    useState<SubscriptionDuration>('DAY')

  const [paySubscribe] = usePaySubscribeMutation()

  const agreePayment = async () => {
    setIsOpenModalAgree(false)
    if (!agree) {
      setIsLoading(true)

      try {
        const res = await paySubscribe({
          typeSubscription: selectedSubscriptionDuration as string,
          paymentType: paymentMethod,
          amount: selectedSubscriptionCost as number,
          baseUrl: `${window.location.origin}/my-profile/${subscriptionInfo?.userId}/edit-profile?tab=Account-Management`,
        }).unwrap()
        if (res?.url) {
          window.location.href = res.url
        } else {
          console.error('Ошибка оплаты', res)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Ошибка при подписке:', error)
        setIsLoading(false)
      }
    }
  }

  const handleClose = () => {
    setAgree(true)
    setIsOpenModalAgree(false)
  }

  const handlePayment = (paymentMethod: string) => {
    setIsOpenModalAgree(true)
    setPaymentMethod(paymentMethod)
  }

  const handleSelectedSubscription = (id: SubscriptionDuration, amount: SubscriptionCost) => {
    setSelectedSubscriptionDuration(id === selectedSubscriptionDuration ? null : id)
    setSelectedSubscriptionCost(amount === selectedSubscriptionCost ? null : amount)
  }
  return (
    <>
      <div>
        <h3>
          {subscriptionInfo?.subscriptionId.length
            ? 'Change your subscription:'
            : 'Your subscription costs:'}
        </h3>
        <div className={s.accountType}>
          {subscriptionPlans.map(({ id, label, amount }) => (
            <RadixCheckbox
              key={id}
              showLabel
              textLabel={label}
              className={s.checkbox}
              checked={selectedSubscriptionDuration === id}
              onCheckedChange={() => handleSelectedSubscription(id, amount)}
            />
          ))}
        </div>
        <div className={s.paymentLinks}>
          <Image
            src={PayPalIcon}
            alt=""
            onClick={() => handlePayment('PAYPAL')}
            style={{ cursor: 'pointer' }}
          />
          <span>Or</span>
          <Image
            src={StripeIcon}
            alt=""
            onClick={() => handlePayment('STRIPE')}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
      <ModalRadix
        open={isOpenModalAgree}
        onClose={handleClose}
        modalTitle="Auto-renewal"
        size="md"
        footer={
          <Button disabled={agree} onClick={agreePayment}>
            OK
          </Button>
        }>
        <p>{` Auto-renewal will be enabled with this payment. You can disable it anytime in your profile settings`}</p>
        <div className={s.agree}>
          <RadixCheckbox
            showLabel
            textLabel="Agree"
            onClick={() => setAgree(false)}
            className={s.checkboxAgree}
          />
        </div>
      </ModalRadix>
    </>
  )
}
