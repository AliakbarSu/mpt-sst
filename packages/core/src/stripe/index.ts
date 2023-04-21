import { Config } from 'sst/node/config'
import Stripe from 'stripe'
import { StripeCustomer } from '../../types/Stripe'

const stripe = new Stripe(Config.STRIPE_KEY, { apiVersion: '2022-11-15' })

export const getCustomer = async (id: string) => {
  return stripe.customers.retrieve(id) as unknown as Promise<
    StripeCustomer | Stripe.DeletedCustomer
  >
}

export type Customer = {
  auth0_id: string
  email: string
  source: string
}
export const createCustomer = async ({ auth0_id, email, source }: Customer) => {
  return stripe.customers.create({
    source,
    email,
    metadata: {
      auth0_id
    }
  }) as unknown as Promise<StripeCustomer>
}

export const deleteCustomer = async (id: string) => {
  return stripe.customers.del(id)
}

export const createCharge = async (params: Stripe.ChargeCreateParams) => {
  return stripe.charges.create(params)
}

export const captureCharge = async (
  id: string,
  params: Stripe.ChargeCaptureParams
) => {
  return stripe.charges.capture(id, params)
}

export const createSubscription = async (
  params: Stripe.SubscriptionCreateParams
) => {
  return stripe.subscriptions.create(params)
}

export const cancelSubscription = async (id: string) => {
  return stripe.subscriptions.del(id)
}

export const resumeSubscription = async (id: string) => {
  return stripe.subscriptions.resume(id, { billing_cycle_anchor: 'now' })
}

export const createCheckoutUrl = async (
  params: Stripe.Checkout.SessionCreateParams
) => {
  return stripe.checkout.sessions.create(params)
}

export const retrieveSession = async (
  id: string,
  params: Stripe.Checkout.SessionRetrieveParams
) => {
  return stripe.checkout.sessions.retrieve(id, params)
}

export const constructEvent = ({
  payload,
  sig
}: {
  payload: string | Buffer
  sig: string
}) => {
  // const endpointSecret = Config.STRIPE_ENDPOINT_SECRET
  return stripe.webhooks.constructEvent(payload, sig, endpointSecret)
}
