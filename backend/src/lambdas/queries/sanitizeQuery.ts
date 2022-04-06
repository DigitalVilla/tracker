import { QueryKey } from './queryHandler'

export function sanitizeQuery(data: Record<string, any>, key: QueryKey) {
  if (!data || !data.Items || !data.Items.length) return null

  const result: Record<string, any> = {}
  result.nextKey = JSON.stringify(data.LastEvaluatedKey)

  switch (key) {
    case 'initialLoad':
      result.user = data.Items[0]
      result.entries = data.Items.slice(1)
      return result
    case 'entries':
      result.entries = data.Items
      return result
    case 'entriesByDate':
      result.entries = data.Items
      return result
    case 'allUsers':
      result.users = data.Items
      return result
    case 'allEntries':
      result.entries = data.Items
      return result
    case 'allEntriesByDate':
      result.entries = data.Items
      return result
    default:
      return null
  }
}
