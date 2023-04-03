import Image from 'next/image'
import MenuIcon from '../../../public/menu.svg'
import styles from './index.module.scss'
import type { FC } from 'react'

interface IProps {
  setOpen: () => void
}

export const Header: FC<IProps> = ({ setOpen }) => {
  return <header className={styles.header}>
    <div className={styles.menuIcon} onClick={setOpen}>
      <Image
        src={MenuIcon}
        alt='menu icon'
      />
    </div>
  </header>
}