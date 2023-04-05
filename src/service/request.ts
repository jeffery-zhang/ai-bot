import type { RequestBodyType } from '@/types'

export const requestChat = async (body: RequestBodyType[]) => {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await res.json()
  } catch(error) {
    console.error(error)
  }
}