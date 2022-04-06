import { UpdateCommand, UpdateCommandInput } from '@aws-sdk/lib-dynamodb'
import { client, TableName } from '../utils/clientDB'
import { parseExpression } from '../utils/parseExpression'

export async function updateUser({
  email,
  UpdateExpression,
}: {
  email: string
  UpdateExpression: string
}): Promise<boolean> {
  try {
    const modelKey = `user#${email}`

    const params = parseExpression({
      TableName,
      Key: { PK: modelKey, SK: modelKey },
      UpdateExpression,
      ConditionExpression: {
        expression: 'attribute_exists(SK)',
        delimiter: null,
      },
      ReturnValues: 'UPDATED_OLD',
    })

    const cmd = new UpdateCommand(params as UpdateCommandInput)
    const data = await client.send(cmd)

    console.log(data)

    return Boolean(data.Attributes)
  } catch (error: any) {
    console.log(error.message)
    return false
  }
}
