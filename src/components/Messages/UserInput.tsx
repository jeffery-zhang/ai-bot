import { useContext } from 'react'
import { StoreContext } from '@/store'
import styles from './index.module.scss'

export const UserInput = () => {
  const { global } = useContext(StoreContext)
  
  return <div className={styles.inputContainer}>
    <textarea
      className={styles.input}
      rows={1}
    />
  </div>
}
