import type { ResponseData } from '@/types'

export const genRes = <T>(code: number, data?: T | any, message?: string): ResponseData<T> => {
  let success: boolean = false
  if (code === 200) success = true

  return {
    success,
    message: message ?? '',
    data: data || [],
    code,
  }
}
