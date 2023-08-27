"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.scss";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { useThemeContext } from "@/utils/Theme";
import { ThemeI } from "@/Interfaces/Theme";
import ThemeSwitch from "../ThemeSwitcher/ThemeSwitcher";
import Menu from "../../../public/images/menu.svg";
import Search from "../../../public/images/search.svg";
import Smile from "../../../public/images/smile.svg";
import Favourite from "../../../public/images/favourite.svg";
import Sad from "../../../public/images/sad.svg";

export default function Header() {
  const [clickMenu, setClickMenu] = useState(false);

  const { currentPath, searchText, setSearchText } =
    useThemeContext() as ThemeI;

  const menuClickHandler = () => {
    setClickMenu(true);
    document.body.style.overflow = "hidden";
  };
  return (
    <header className={currentPath === "" ? styles.header : styles.header2}>
      {clickMenu && <Modal setClickMenu={setClickMenu} menu={true} />}
      <div className={styles.left}>
        <Link
          href={"/"}
          className={currentPath === "" ? styles.logo : styles.logo1}
        >
          <Image
            src={"/images/logo.svg"}
            width={24}
            height={24}
            priority
            alt={"Logo"}
          />
          <Image
            src={"/images/PetsPaw.svg"}
            width={72}
            height={13}
            priority
            alt={"Logo text"}
          />
        </Link>
        <ThemeSwitch />
      </div>
      {currentPath !== "" && (
        <div className={styles.header__right}>
          <button onClick={menuClickHandler}>
            <Menu />
          </button>
          <div className={styles.input__wrapper}>
            <input
              type="text"
              placeholder="Search for breeds by name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Link href={"/search"}>
              <Search />
            </Link>
          </div>
          <Link
            href={"/likes"}
            className={currentPath === "likes" ? styles.active__link : ""}
          >
            <Smile />
          </Link>
          <Link
            href={"/favourites"}
            className={currentPath === "favourites" ? styles.active__link : ""}
          >
            <Favourite />
          </Link>
          <Link
            href={"/dislikes"}
            className={currentPath === "dislikes" ? styles.active__link : ""}
          >
            <Sad />
          </Link>
        </div>
      )}
    </header>
  );
}
