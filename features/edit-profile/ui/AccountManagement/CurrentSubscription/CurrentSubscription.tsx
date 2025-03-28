'use client'

import { RadixCheckbox } from '@/shared/ui/Checkbox/RadixCheckbox'
import { SubscriptionsInfo } from '../Payment/api/types'
import s from './CurrentSubscription.module.scss'
import { useCancelAutoRenewalMutation } from '../Payment/api/paymentApi'
import { useState } from 'react'
import { ModalRadix } from '@/shared/ui/Modal/ModalRadix'
import { Button } from '@/shared/ui/Button/Button'

type CurrentSubscriptionProps = {
  subscriptionInfo: SubscriptionsInfo
}

export const CurrentSubscription = ({ subscriptionInfo }: CurrentSubscriptionProps) => {
  const [checked, setIsChecked] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cancelAutoRenewal, {isLoading}] = useCancelAutoRenewalMutation()

  const handleCancelAutoRenewal = async ()=> {
    try{
      const result = await cancelAutoRenewal().unwrap()
      console.log("Автообновление было отменено:", result)
      setIsChecked(false)
      setIsModalOpen(true)
    }
    catch(error){
      console.error("Ошибка отмены автообновления:", error)
    }
  }

  const handleClose=()=> {
    setIsModalOpen(false)
  }

  return (
    <div>
      <h3>Current Subscription:</h3>
      <div className={s.accountType}>
        <div className={s.subscription}>
          <div>
            <p>Expire at</p>
            <span>{new Date(subscriptionInfo.dateOfPayment).toLocaleDateString('ru-RU')}</span>
          </div>
          <div>
            <p>Next payment</p>
            <span>
              {new Date(subscriptionInfo.endDateOfSubscription).toLocaleDateString('ru-RU')}
            </span>
          </div>
        </div>
      </div>
      <div className={s.checkboxAutoRenewal}>
        <RadixCheckbox showLabel textLabel="Auto-Renewal" checked={checked} onCheckedChange={handleCancelAutoRenewal} disabled={isLoading}/>
      </div>
      <ModalRadix
        open={isModalOpen}
        onClose={handleClose}
        modalTitle='Auto-Renewal Cancellation'
        size='md'
        footer={<Button onClick={handleClose}>OK</Button>}>
          <p>
            Auto-renewal has been successfully canceled 🎉 You can enable it again as long as your subscription is still active.
          </p>
        </ModalRadix>
    </div>
  )
}
