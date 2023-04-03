import { useState } from 'react'
import styles from './index.module.scss'
import type { FC, ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export const BasicLayout: FC<IProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return <main className={styles.mainContainer}>
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>

    </aside>
    <div className={styles.content}>
      {children}
    </div>
  </main>
}