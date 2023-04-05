import { Configuration, OpenAIApi } from 'openai'
import { genRes } from '@/service/responseData'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ResponseData } from '@/types'

const apiKey = process.env.OPENAI_API_KEY
const orgId = process.env.OPENAI_ORG_ID

interface Data {

}

const configuration = new Configuration({
  apiKey,
  organization: orgId,
})

const openai = new OpenAIApi(configuration)

console.log('let\'s see openai: ', openai)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<string>>
) {
  const { body } = req
  const completions = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: body,
    temperature: .5,
    stream: true,
  })
  console.log('openai completions---------------------: ', completions)
  res.status(200).json(genRes(200, 'hello'))
}
