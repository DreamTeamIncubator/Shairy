import { SubscriptionsInfo } from '../../api/types'

export type PaymentProps = {
  subscriptionInfo?: SubscriptionsInfo
  setIsLoading: (isLoading: boolean) => void
}

export type SubscriptionDuration = 'DAY' | 'WEEKLY' | 'MONTHLY' | null

export type SubscriptionCost = 10 | 50 | 100 | null
