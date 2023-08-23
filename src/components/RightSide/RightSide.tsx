import Image from 'next/image'
import styles from "./right.module.scss"
import { ReactNode } from 'react';
import { currentPageOptions } from '@/Interfaces/SelectedPageInterface';

interface Props {
  children: ReactNode;
  currentPath: currentPageOptions;
}

export default function RightSide(props: Props) {
  return (
    <div className={styles.right}>
      <div className={styles.subheader}>
      <div className={styles.back__wrapper} onClick={()=>history.back()}>
        <Image
          src={"/images/back.svg"}
          width={20}
          height={20}
          alt="Back"
          className={styles.first__img}
        />
        <Image
          src={"/images/back1.svg"}
          width={20}
          height={20}
          alt="Back"
          className={styles.second__img}
        />
    </div>
    <div className={styles.selected}>
        <p>{props.currentPath}</p>
      </div>
      </div>
   
    {props.children}
  </div>
  )
}
