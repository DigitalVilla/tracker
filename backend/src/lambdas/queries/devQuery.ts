import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { withAuth } from '../../utils/auth'
import { response } from '../../utils/response'
import { validateBody } from '../../utils/validateBody'
import { queryDB } from './queryDynamo'

const minAuth = Number(process.env.MIN_AUTH_LEVEL)

// Multi functional query endpoint
export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    // console.log(event)
    await withAuth(event, minAuth)
    // Admin needs query param email

    // Query param is required in Body
    const [body, missing] = validateBody({
      event,
      required: ['KeyConditionExpression'],
    })
    if (missing.length) return response.error(missing, 400)

    // Execute query
    const query = await queryDB(body)
    if (!query)
      return response.error(`Query '${body.query}' has no results`, 404)
    return response.success(query, 200)
  } catch (error: any) {
    return response.error(error)
  }
}
