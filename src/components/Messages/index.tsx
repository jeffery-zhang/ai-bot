import { UserInput } from './UserInput'
import styles from './index.module.scss'

export const Messages = () => {
  return <div className={styles.messages}>
    <UserInput />
  </div>
}