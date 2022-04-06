import { isValid as is } from '../../utils/validations'

export function validateQueryTypes(
  entry: Record<string, any>,
  queryList: string[]
) {
  const has = (k: string) => typeof entry[k] !== 'undefined'

  const errors = [
    is.enum({
      value: entry.query,
      enums: queryList,
      key: 'query',
      throws: true,
    }),
    has('startDate') &&
      is.dateString({ value: entry.startDate, key: 'startDate', ISO: true }),
    has('endDate') &&
      is.dateString({ value: entry.endDate, key: 'endDate', ISO: true }),
    has('limit') &&
      is.number({ value: entry.limit, range: [0, 10000], key: 'limit' }),
    has('filter') &&
      is.string({ value: entry.filter, max: 200, key: 'filter' }),
    has('projection') &&
      is.string({ value: entry.projection, max: 200, key: 'limit' }),
  ].filter((d) => d)

  if (has('nextKey')) {
    try {
      const msg = is.string({ value: entry.nextKey, max: 200, key: 'nextKey' })
      if (!msg) {
        const key = JSON.parse(entry.nextKey)
        if (!key.PK || !key.SK) throw Error
      } else errors.push(msg)
    } catch (error) {
      errors.push('nextKey is not a valid database key')
    }
  }

  if (entry.query.includes('ByDate') && (!entry.startDate || !entry.endDate)) {
    errors.push(`Query ${entry.query} requires both startDate & endDate`)
  }
  return errors.length ? errors : null
}
