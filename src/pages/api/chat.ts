import {  } from 'openai'
import { genRes } from '@/service/responseData'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ResponseData } from '@/types'

const apiKey = process.env.OPENAI_API_KEY

interface Data {

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<Data[]>>
) {
  console.log('hello')
}
