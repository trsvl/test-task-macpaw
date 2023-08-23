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

  const menuClickHandler = () => {
    setClickMenu(false)
    document.body.style.overflow = "visible";
  }

  return (
    <div className={styles.wrapper}>
        <button onClick={menuClickHandler}>
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
        <Cards currentPath={currentPath} />
        </div>
    </div>
  );
}
