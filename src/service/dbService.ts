import { useEffect, useState } from 'react'
import type { ConversationDataType } from '@/types'

export const useIndexedDb = () => {
  const [db, setDb] = useState<IDBDatabase>()

  useEffect(() => {
    const openDb = async () => {
      const request = indexedDB.open('conversations', 1)
      request.onsuccess = () => setDb(request.result)
      request.onerror = () => console.error(request.error)
      request.onupgradeneeded = () => {
        const db = request.result
        db.createObjectStore('conversation', { keyPath: 'id' })
      }
    }
    openDb()

    return () => db?.close()
  }, [])

  const get = async (id: ConversationDataType['id']): Promise<ConversationDataType> => new Promise((resolve, reject) => {
    const transaction = db?.transaction(['conversation'], 'readonly')
    const store = transaction?.objectStore('conversation')
    const request = store?.get(id)
    request!.onsuccess = () => resolve(request!.result)
    request!.onerror = () => reject(request!.error)
  })

  const getAll = async (): Promise<ConversationDataType[]> => new Promise((resolve, reject) => {
    const transaction = db?.transaction(['conversation'], 'readonly')
    const store = transaction?.objectStore('conversation')
    const request = store?.getAll()
    request!.onsuccess = () => resolve(request!.result)
    request!.onerror = () => reject(request!.error)
  })

  
}
