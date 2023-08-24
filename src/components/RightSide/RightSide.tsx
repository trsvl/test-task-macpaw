"use client";

import Image from "next/image";
import styles from "./right.module.scss";
import { ReactNode } from "react";
import { currentPageOptions } from "@/Interfaces/CurrentPath";
import { useThemeContext } from "@/utils/Theme";
import { ThemeI } from "@/Interfaces/Theme";
import ImageHistory from "../ImageHistory/imageHistory";

interface Props {
  children: ReactNode;
}

export default function RightSide(props: Props) {
  const { currentPath } = useThemeContext() as ThemeI;

  return (
    <>
      {currentPath !== "" ? (
        <div className={styles.right}>
          <div className={styles.subheader}>
            <div
              className={styles.back__wrapper}
              onClick={() => history.back()}
            >
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
              <p>{currentPath}</p>
            </div>
          </div>

          {props.children}
          {(currentPath === "voting" || currentPath === "favourites") && (
            <ImageHistory />
          )}
        </div>
      ) : (
        props.children
      )}
    </>
  );
}
