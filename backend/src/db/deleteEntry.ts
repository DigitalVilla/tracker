import { DeleteCommand, DeleteCommandInput } from '@aws-sdk/lib-dynamodb'
import { client, TableName } from '../utils/clientDB'

export async function deleteEntry({
  id,
  email,
}: {
  id: string
  email: string
}): Promise<boolean> {
  try {
    const params = {
      TableName,
      Key: { PK: `user#${email}`, SK: id },
    }

    const cmd = new DeleteCommand(params as DeleteCommandInput)
    const data = await client.send(cmd)

    return !Boolean(data.ConsumedCapacity)
  } catch (error) {
    console.log(error)
    return false
  }
}
