export interface ResponseData<T = any> {
  success: boolean
  message: string
  data: T
  code: number
}

export interface ConversationDataType {
  id: string
  createTime: string
  updateTime: string
  title: string
  messages: MessageDataType[]
}

export interface MessageDataType {
  id: string
  createTime: string
  role: string
  content: string
  name?: string
}
