import { useContext } from 'react'
import dayjs from 'dayjs'
import { db } from '@/service/dbService'
import { StoreContext } from '@/store'
import { generateUniqueId } from '@/service/utils'
import styles from './index.module.scss'
import type { ConversationDataType } from '@/types'

export const AddConv = () => {
  let { global } = useContext(StoreContext)

  const addConv = async () => {
    const now = dayjs()
    const id = generateUniqueId(now.valueOf().toString(), 'conversation')
    const newItem: ConversationDataType = {
      id,
      createTime: now.format('YYYY-MM-DD HH:mm:ss'),
      title: 'New Conversation',
    }
    await db.conversations.add(newItem)
    global.currConv = id
  }

  return <div
    className={`${styles.convItem} ${styles.addItem}`}
    onClick={addConv}
  >
    <span className={styles.title}>
      + New Conversation
    </span>
  </div>
}