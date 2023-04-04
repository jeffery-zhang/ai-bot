import { ConvList } from './ConvList'
import styles from './index.module.scss'

export const Sidebar = () => {
  return <div className={styles.sidebar}>
    <ConvList />
  </div>
}
