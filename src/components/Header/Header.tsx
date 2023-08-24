"use client"

import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.scss";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { useThemeContext } from "@/utils/Theme";
import { ThemeI } from "@/Interfaces/Theme";


export default function Header() {

  const [clickMenu, setClickMenu] = useState(false);

  const { currentPath } = useThemeContext() as ThemeI;
  
  const menuClickHandler = () => {
    setClickMenu(true)
    document.body.style.overflow = "hidden";
  }
 

  return (
    <header className={currentPath === "" ? styles.header : styles.header2}>
    {clickMenu && <Modal setClickMenu={setClickMenu}/>}
      <Link
        href={"/"}
        className={currentPath === "" ? styles.logo : styles.logo__disable}
      >
        <Image
          src={"images/logo.svg"}
          width={24}
          height={24}
          priority
          alt={"Logo"}
        />
        <Image
          src={"images/PetsPaw.svg"}
          width={72}
          height={13}
          priority
          alt={"Logo text"}
        />
      </Link>
      {currentPath !== "" && (
        <div className={styles.header__right}>
            <button onClick={menuClickHandler}
          >
              <Image
                src={"/images/menu.svg"}
                width={30}
                height={18}
                alt="Menu"
              />
          </button>
          <div className={styles.input__wrapper}>
            <input type="text" placeholder="Search for breeds by name" />
            <div>
              <Image
                src={"/images/search.svg"}
                width={20}
                height={20}
                alt="Search image"
                className={styles.first__img}
              />
              <Image
                src={"/images/search1.svg"}
                width={20}
                height={20}
                alt="Search image"
                className={styles.second__img}
              />
            </div>
          </div>
          <Link
            href={"/likes"}
            className={currentPath === "likes" ? styles.active__link : ""}
          >
            {currentPath !== "likes" && (
              <Image
                src={"/images/smiling-face.svg"}
                width={30}
                height={30}
                alt="Link likes page"
              />
            )}
            {currentPath === "likes" && (
              <Image
                src={"/images/smiling-face1.svg"}
                width={30}
                height={26}
                alt="Link likes page"
              />
            )}
          </Link>
          <Link
            href={"/favourites"}
            className={currentPath === "favourites" ? styles.active__link : ""}
          >
            {currentPath !== "favourites" && (
              <Image
                src={"/images/favourite.svg"}
                width={30}
                height={30}
                alt="Link favourites page"
              />
            )}
            {currentPath === "favourites" && (
              <Image
                src={"/images/favourite1.svg"}
                width={30}
                height={30}
                alt="Link favourites page"
              />
            )}
          </Link>
          <Link
            href={"/dislikes"}
            className={currentPath === "dislikes" ? styles.active__link : ""}
          >
            {currentPath !== "dislikes" && (
              <Image
                src={"/images/sad-face.svg"}
                width={30}
                height={30}
                alt="Link dislikes page"
              />
            )}
            {currentPath === "dislikes" && (
              <Image
                src={"/images/sad-face1.svg"}
                width={30}
                height={30}
                alt="Link dislikes page"
              />
            )}
          </Link>
        </div>
      )}
    </header>
  );
}
