import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { withAuth } from '../../utils/auth'
import { getEmail } from '../../utils/getQueryParams'
import { response } from '../../utils/response'
import { validateBody } from '../../utils/validateBody'
import { getQueryExpressions } from './queryHandler'
import { validateQueryTypes } from './validateQueryTypes'

const minAuth = Number(process.env.MIN_AUTH_LEVEL)

// Multi functional query endpoint
export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    // console.log(event)
    const user = await withAuth(event)
    const hasAuth = user.role >= minAuth
    // Admin needs query param email
    const email = (hasAuth ? getEmail(event) : user.email).toLowerCase()

    // Query param is required in Body
    const [body, missing] = validateBody({ event, required: ['query'] })
    if (missing.length) return response.error(missing, 400)

    // Get available queries
    const { executeQuery, queryList } = getQueryExpressions(email, hasAuth)

    // Validate query param is a valid query
    const errors = validateQueryTypes(body, queryList)
    if (errors) return response.error(errors, 400)

    // Execute query
    const query = await executeQuery(body)
    if (!query)
      return response.error(`Query '${body.query}' has no results`, 404)

    return response.success(query, 200)
  } catch (error: any) {
    return response.error(error)
  }
}
