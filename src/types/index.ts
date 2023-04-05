export interface ResponseData<T = any> {
  success: boolean
  message: string
  data: T
  code: number
}

export interface ConversationDataType {
  id: string
  createTime: string
  title: string
}

export interface MessageDataType {
  id: string
  conId: string
  createTime: string
  role: 'user' | 'assistant' | 'system'
  content: string
  name?: string
}

export type RequestBodyType = Pick<MessageDataType, 'role' | 'content'>