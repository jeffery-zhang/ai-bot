import { useContext, useEffect, useRef, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import dayjs from 'dayjs'
import { db } from '@/service/dbService'
import { requestChat } from '@/service/request'
import { StoreContext } from '@/store'
import { generateUniqueId } from '@/service/utils'
import styles from './index.module.scss'
import type { ChangeEventHandler, KeyboardEventHandler } from 'react'
import type { ConversationDataType, MessageDataType } from '@/types'

export const UserInput = () => {
  const tRef = useRef<HTMLTextAreaElement>(null)
  const { global } = useContext(StoreContext)
  const [rows, setRows] = useState<number>(1)
  const [prompt, setPrompt] = useState<string>('')

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    setPrompt(e.target.value)
  }
  const onKeyUp: KeyboardEventHandler<HTMLTextAreaElement> = async e => {
    if (e.key === 'Enter') {
      global.responding = true
      await generateMessageData()
      await sendRequest()
    }
  }
  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
    }
  }
  const generateMessageData = async () => {
    const now = dayjs()
    let conId: string | undefined = global.currConv
    let role: MessageDataType['role'] = 'user'
    if (!conId) {
      conId = generateUniqueId(now.valueOf().toString(), 'conversation')
      role = 'system'
      const newItem: ConversationDataType = {
        id: conId,
        createTime: now.format('YYYY-MM-DD HH:mm:ss'),
        title: 'New Conversation',
      }
      await db.conversations.add(newItem)
      global.currConv = conId
    }
    const id = generateUniqueId(now.valueOf().toString(), 'message')
    await db.messages.add({
      id,
      conId,
      createTime: now.format('YYYY-MM-DD HH:mm:ss'),
      content: prompt,
      role,
    })
  }

  const sendRequest = async () => {
    const msgs = await db.messages.where({ conId: global.currConv }).toArray()
    if (msgs && msgs.length) {
      const body = msgs.map(m => ({
        role: m.role,
        content: m.content,
      }))
      const data = await requestChat(body)
      console.log(data)
    }
  }
  
  useEffect(() => {
    const count = (prompt.match(/\n/g) || []).length
    setRows(count + 1 > 15 ? 15 : count + 1)
  }, [prompt, rows])

  return <div className={styles.inputContainer}>
    <textarea
      className={styles.input}
      rows={rows}
      ref={tRef}
      onChange={onChange}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      placeholder='Send messages ...'
      readOnly={global.responding}
    />
  </div>
}
