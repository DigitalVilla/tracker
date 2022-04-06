import { GetCommand, GetCommandInput } from '@aws-sdk/lib-dynamodb'
import { client, TableName } from '../utils/clientDB'

export async function getUser({ email }: Record<string, any>): Promise<any> {
  try {
    const modelKey = `user#${email}`

    const params: GetCommandInput = {
      TableName,
      Key: { PK: modelKey, SK: modelKey },
    }

    console.log(params)

    const cmd = new GetCommand(params)
    const data = await client.send(cmd)

    return data.Item
  } catch (error: any) {
    console.log(error)
    return null
  }
}
