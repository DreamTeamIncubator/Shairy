import { RadixCheckbox } from '@/shared/ui/Checkbox/RadixCheckbox'
import { SubscriptionsInfo } from '../Payment/api/types'
import s from './CurrentSubscription.module.scss'

type CurrentSubscriptionProps = {
  subscriptionInfo: SubscriptionsInfo
}

export const CurrentSubscription = ({ subscriptionInfo }: CurrentSubscriptionProps) => {
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
        <RadixCheckbox showLabel textLabel="Auto-Renewal" checked />
      </div>
    </div>
  )
}
