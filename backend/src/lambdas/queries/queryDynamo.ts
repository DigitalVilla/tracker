import { QueryCommand, QueryCommandInput } from '@aws-sdk/lib-dynamodb'
import { client, TableName } from '../../utils/clientDB'
import { parseExpression } from '../../utils/parseExpression'

export async function queryDB({
  KeyConditionExpression,
  ProjectionExpression,
  FilterExpression,
  ScanIndexForward = false,
  ExclusiveStartKey,
  Limit = 50,
}: {
  KeyConditionExpression: string
  ProjectionExpression?: string
  FilterExpression?: string
  ScanIndexForward?: boolean
  ExclusiveStartKey?: any
  globalIndex?: boolean
  Limit?: number
}): Promise<any> {
  try {
    const IndexName = 'GSI1'
    const params = parseExpression({
      TableName,
      KeyConditionExpression,
      ProjectionExpression,
      FilterExpression,
      ScanIndexForward,
      Limit,
    })

    if (ExclusiveStartKey) params.ExclusiveStartKey = ExclusiveStartKey
    if (KeyConditionExpression.indexOf(IndexName) >= 0)
      params.IndexName = IndexName

    const cmd = new QueryCommand(params as QueryCommandInput)
    const data = await client.send(cmd)

    return data
  } catch (error: any) {
    console.log(error)
    return null
  }
}
