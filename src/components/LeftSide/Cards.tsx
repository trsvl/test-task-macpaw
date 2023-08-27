import Image from "next/image";
import React from "react";
import styles from "./left.module.scss";
import Link from "next/link";
import { useThemeContext } from "@/utils/Theme";

export default function Cards({
  cardClickHandler,
}: {
  cardClickHandler?: () => void;
}) {
  const { currentPath } = useThemeContext();

  return (
    <div className={styles.cards}>
      <Link onClick={cardClickHandler} href={"/voting"}>
        <div className={currentPath === "voting" ? styles.active__border : ""}>
          <Image
            src={"/images/vote-table.svg"}
            width={100}
            height={125}
            alt={"Vote table"}
          />
        </div>
        <button className={currentPath === "voting" ? styles.active__btn : ""}>
          VOTING
        </button>
      </Link>
      <Link onClick={cardClickHandler} href={"/breeds"}>
        <div className={currentPath === "breeds" ? styles.active__border : ""}>
          <Image
            src={"/images/pet-breeds.svg"}
            width={117}
            height={163}
            alt={"Pet breeds"}
          />
        </div>
        <button className={currentPath === "breeds" ? styles.active__btn : ""}>
          BREEDS
        </button>
      </Link>
      <Link onClick={cardClickHandler} href={"/gallery"}>
        <div className={currentPath === "gallery" ? styles.active__border : ""}>
          <Image
            src={"/images/images-search.svg"}
            width={112}
            height={190}
            alt={"Images search"}
          />
        </div>
        <button className={currentPath === "gallery" ? styles.active__btn : ""}>
          GALLERY
        </button>
      </Link>
    </div>
  );
}
