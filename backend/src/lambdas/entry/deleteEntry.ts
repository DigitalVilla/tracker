import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { deleteEntry } from '../../db/deleteEntry'
import { withAuth } from '../../utils/auth'
import { getEmail } from '../../utils/getQueryParams'
import { response } from '../../utils/response'
import { validateBody } from '../../utils/validateBody'

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

    const [body, missing] = validateBody({ required: ['id'], event })
    if (missing.length) return response.error(missing, 400)

    const deleted = await deleteEntry({ id: body.id, email })
    if (!deleted) return response.error(`Entry for ${email} was not found`, 400)
    return response.success(`Entry for ${email} has been deleted`, 201)
  } catch (error: any) {
    return response.error(error)
  }
}
