import { sanitizeQuery } from './sanitizeQuery'
import { queryDB } from './queryDynamo'

export const getQueryExpressions = (email: string, hasAuth: boolean) => {
  let queryList = ['initialLoad', 'entries', 'entriesByDate']
  const authQueryList = ['allUsers', 'allEntries', 'allEntriesByDate']
  if (hasAuth) queryList = queryList.concat(authQueryList)

  const executeQuery = async ({
    query,
    startDate,
    endDate,
    nextKey,
    projection,
    filter,
    limit = 100,
  }: executeQueryProps): Promise<any> => {
    const ExclusiveStartKey = nextKey ? JSON.parse(nextKey) : nextKey
    const ProjectionExpression =
      hasAuth && projection
        ? projection
        : '#Id, #Username, #Email, #MaxCals, #Budget, #Age, #Name, #Cals, #Price, #Date'

    const defaultExpression = {
      FilterExpression: filter,
      ProjectionExpression,
      ExclusiveStartKey,
      Limit: limit,
    }

    let exp: Record<string, any> = {
      initialLoad: {
        KeyConditionExpression: `#PK = (user#${email}) AND #SK >= (single#)`,
        ProjectionExpression,
        Limit: limit,
      },
      entries: {
        KeyConditionExpression: `#PK = (user#${email}) AND #SK BETWEEN (single#) AND (singles)`,
        ...defaultExpression,
      },
      entriesByDate: {
        KeyConditionExpression: `#PK = (user#${email}) AND #SK BETWEEN (single#${startDate}) AND (single#${endDate})`,
        ...defaultExpression,
      },
    }

    const authExp = {
      allUsers: {
        KeyConditionExpression: `#GSI1PK = (User) AND #GSI1SK >= (user#)`,
        ...defaultExpression,
      },
      allEntries: {
        KeyConditionExpression: `#GSI1PK = (Entry) AND #GSI1SK >= (single#)`,
        ...defaultExpression,
      },
      allEntriesByDate: {
        KeyConditionExpression: `#GSI1PK = (Entry) AND #GSI1SK BETWEEN (single#${startDate}) AND (single#${endDate})`,
        ...defaultExpression,
      },
    }

    if (hasAuth) exp = { ...exp, ...authExp }
    const data = await queryDB(exp[query])
    return sanitizeQuery(data, query)
  }

  return { executeQuery, queryList }
}

export type QueryKey =
  | 'initialLoad'
  | 'entries'
  | 'entriesByDate'
  | 'allUsers'
  | 'allEntries'
  | 'allEntriesByDate'

type executeQueryProps = {
  query: QueryKey
  startDate?: string
  endDate?: string
  limit?: number
  filter?: number
  nextKey?: string
  projection?: string
}
