export type PaymentRequest = {
  typeSubscription: string
  paymentType: string
  amount: number
  baseUrl: string
}

export type PaymentResponse = {
  url: string
}

export type SubscriptionsRequest = {
  data: SubscriptionsInfo[]
  hasAutoRenewal: boolean
}

export type SubscriptionsInfo = {
  userId: number
  subscriptionId: string
  dateOfPayment: string
  endDateOfSubscription: string
  autoRenewal: boolean
}
export type MyPaymentsResponce = {
  userId: number
  subscriptionId: string
  dateOfPayment: string
  endDateOfSubscription: string
  price: number
  subscriptionType: 'MONTHLY'| 'DAY' | 'WEEKLY'
  paymentType: 'STRIPE'| 'PAYPAL' |'CREDIT_CARD'
}

