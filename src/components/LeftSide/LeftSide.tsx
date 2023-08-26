"use client"

import styles from "./left.module.scss";
import Cards from "./Cards";
import { useThemeContext } from "@/utils/Theme";
import { ThemeI } from "@/Interfaces/Theme";


export default function LeftSide() {

  const { currentPath } = useThemeContext() as ThemeI;

  return (
    <div className={currentPath === "" ? styles.left : styles.left__disable}>
      <h1>Hi!👋</h1>
      <h2>Welcome to MacPaw Bootcamp 2023</h2>
      <h3>Lets start using The Cat API</h3>
      <Cards/>
    </div>
  );
}
