import { useContext } from 'react'
import { observer } from 'mobx-react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/service/dbService'
import { StoreContext } from '@/store'
import { AddConv } from './AddConv'
import styles from './index.module.scss'

export const ConvList = observer(() => {
  const { global } = useContext(StoreContext)
  const conList = useLiveQuery(async () => await db.conversations.toArray())

  return <div>
    <AddConv />
    {conList?.map(conv => <div
      key={conv.id}
      className={`${styles.convItem} ${conv.id === global.currConv ? styles.currItem : ''}`}
      onClick={() => global.currConv = conv.id}
    >
      <span className={styles.title}>
        {conv.title}
      </span>
    </div>)}
  </div>
})