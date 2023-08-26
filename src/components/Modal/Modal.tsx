"use client";

import React from "react";
import styles from "./modal.module.scss";
import Cards from "../LeftSide/Cards";
import { GetPath } from "@/utils/GetPath";
import Image from "next/image";

interface Props {
    setClickMenu: (prev:boolean) => void;
} 

export default function Modal({setClickMenu}:Props) {
  const currentPath = GetPath();

  const closeClickHandler = () => {
    setClickMenu(false)
    document.body.style.overflow = "visible";
  }
  const cardClickHandler = () => {
    setTimeout(() => {
      setClickMenu(false)
      document.body.style.overflow = "visible";
    }, 500);

  }




  return (
    <div className={styles.wrapper}>
        <button onClick={closeClickHandler}>
        <Image
          src={"/images/close.svg"}
          width={20}
          height={20}
          alt="Back"
          className={styles.first__img}
        />
        <Image
          src={"/images/close-white.svg"}
          width={20}
          height={20}
          alt="Back"
          className={styles.second__img}
        />
        </button>
        <div>
        <Cards cardClickHandler={cardClickHandler}/>
        </div>
    </div>
  );
}
