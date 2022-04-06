import { DeleteCommand, DeleteCommandInput } from '@aws-sdk/lib-dynamodb'
import { client, TableName } from '../utils/clientDB'

export async function deleteUser({
  email,
}: Record<string, any>): Promise<boolean> {
  try {
    const modelKey = `user#${email}`

    const params: DeleteCommandInput = {
      TableName,
      Key: { PK: modelKey, SK: modelKey },
    }

    const cmd = new DeleteCommand(params)
    const data = await client.send(cmd)

    return !Boolean(data.ConsumedCapacity)
  } catch (error) {
    console.log(error)
    return false
  }
}
