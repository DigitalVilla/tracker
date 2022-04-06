import { PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb'
import { client, TableName } from '../utils/clientDB'
import { setTimeStamp } from '../utils/time'
import { hashValue } from '../utils/hash'
import { nanoid } from 'nanoid'

export async function setUser({
  password,
  email,
  ...rest
}: Record<string, any>): Promise<boolean> {
  const modelKey = `user#${email}`

  const Item = {
    PK: modelKey,
    SK: modelKey,
    Id: nanoid(),
    Email: email,
    Password: hashValue(password),
    CreatedAt: setTimeStamp(),
    CreatedBy: rest.createdBy || 'self',
    UpdatedAt: '',
    UpdatedBy: '',
    Role: Number(rest.role) || 0,
    Username: rest.username || '',
    Age: Number(rest.age) || 0,
    Verified: rest.verified || false,
    Budget: rest.budget || Number(process.env.DEFAULT_BUDGET),
    MaxCals: rest.maxCals || Number(process.env.DEFAULT_MAX_CALS),
    GSI1PK: 'User',
    GSI1SK: modelKey,
  }

  const params: PutCommandInput = {
    TableName,
    Item,
    ConditionExpression: 'attribute_not_exists(SK)',
  }

  const cmd = new PutCommand(params)

  try {
    await client.send(cmd)
    return true
  } catch (error: any) {
    console.log(error)
    return false
  }
}
