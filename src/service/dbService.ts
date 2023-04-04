import Dexie, { Table } from 'dexie'
import type { ConversationDataType, MessageDataType } from '@/types'

class ChatDB extends Dexie {
  conversations!: Table<ConversationDataType>
  messages!: Table<MessageDataType>

  constructor() {
    super('ChatDB')
    this.version(1).stores({
      conversations: 'id',
      messages: 'id, conId',
    })
  }

  deleteConversation(conId: string) {
    return this.transaction('rw', this.conversations, this.messages, async () => {
      this.messages.where({ conId }).delete()
      this.conversations.delete(conId)
    })
  }
}

export const db = new ChatDB()

export const clearDb = () => db.transaction('rw', db.conversations, db.messages, async () => {
  await Promise.all(db.tables.map(table => table.clear()))
})
