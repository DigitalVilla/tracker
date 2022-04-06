import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { withAuth } from '../../utils/auth'
import { response } from '../../utils/response'
import { getEntry } from '../../db/getEntry'
import { isValid } from '../../utils/validations'
import { sanitizeEntry } from '../../utils/sanitizeEntry'
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

    // Requires id query param
    const { id = false } = event.queryStringParameters || {}
    isValid.string(id)

    const Item = await getEntry({ email, id: `${id}` })
    if (!Item) return response.error(`Entry ${id} was not found`, 404)
    return response.success(sanitizeEntry(Item, hasAuth), 200)
  } catch (error: any) {
    return response.error(error)
  }
}
