import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Header } from '@/components/Header'
import ArrowIcon from '../../../public/arrow.svg'
import styles from './index.module.scss'
import type { FC, ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export const BasicLayout: FC<IProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    setIsOpen(window.innerWidth > 768)
  }, [])
  
  return <main className={`${styles.container} ${isOpen ? '' : styles.close}`}>
    <aside className={`${styles.sidebar} ${isOpen ? '' : styles.close}`}>

    </aside>
    <div className={styles.mainContainer}>
      <Header setOpen={() => setIsOpen(true)} />
      <section className={styles.content}>
        {children}
      </section>
    </div>
    <div
      className={`${styles.showIcon} ${isOpen ? '' : styles.close}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <Image
        src={ArrowIcon}
        alt='show sidebar'
      />
    </div>
    {isOpen ? <div className={styles.cover} onClick={() => setIsOpen(false)}></div> : null}
  </main>
}