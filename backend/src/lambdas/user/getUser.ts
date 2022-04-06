import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { sanitizeUser } from '../../utils/sanitizeUser'
import { getUser } from '../../db/getUser'
import { withAuth } from '../../utils/auth'
import { response } from '../../utils/response'
import { getEmail } from '../../utils/getQueryParams'

const minAuth = Number(process.env.MIN_AUTH_LEVEL)

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    console.log(event)
    const user = await withAuth(event)
    const hasAuth = user.role >= minAuth
    // Admin needs query param email
    const email = (hasAuth ? getEmail(event) : user.email).toLowerCase()

    const Item = await getUser({ email })
    if (!Item) return response.error(`User ${email} was not found`, 404)
    return response.success(sanitizeUser(Item, user.role >= minAuth), 200)
  } catch (error: any) {
    return response.error(error)
  }
}
