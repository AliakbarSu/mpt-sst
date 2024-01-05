import { getUserAppMetadata } from '@mpt-sst/core/auth0'
import {
  configureCustomerPortal,
  customerPortalLink
} from '@mpt-sst/core/stripe'
import { getProfile } from '@mpt-sst/core/user/index'
import { ApiGatewayAuth } from '@mpt-types/System'
import { ApiHandler } from 'sst/node/api'

export const profile = ApiHandler(async (_evt) => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  const profile = await getProfile(userId)
  return {
    body: JSON.stringify(profile)
  }
})

export const billingLink = ApiHandler(async (_evt) => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  const {
    plan: { stripe_customer_id }
  } = await getUserAppMetadata(userId)
  if (!stripe_customer_id) {
    return {
      body: 'User does not have a billing account yet!',
      statusCode: 400
    }
  }
  const portalConfigId = (await configureCustomerPortal()).id
  let portalLink = null
  try {
    portalLink = await customerPortalLink(stripe_customer_id, portalConfigId)
  } catch (e) {
    console.error(
      'Error: Encountered an error when trying to generate a portal link'
    )
  }

  return {
    body: portalLink?.url
  }
})
