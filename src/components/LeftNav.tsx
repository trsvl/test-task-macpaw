import Image from "next/image";
import React from "react";
import styles from "../app/page.module.scss";
import Link from "next/link";
interface LeftNavProps {
  selectedPage: "voting" | "breeds" | "gallery" | "";
  setSelectedPage: (pageName: "voting" | "breeds" | "gallery" | "") => void;
}

export default function LeftNav({
  selectedPage,
  setSelectedPage,
}: LeftNavProps) {
  return (
    <div className={styles.left}>
      <h1>Hi!👋</h1>
      <h2>Welcome to MacPaw Bootcamp 2023</h2>
      <h3>Lets start using The Cat API</h3>
      <div className={styles.cards}>
        <Link href={"/voting"} onClick={() => setSelectedPage("voting")}>
          <div
            className={selectedPage === "voting" ? styles.active__border : ""}
          >
            <Image
              src={"/images/vote-table.svg"}
              width={100}
              height={125}
              alt={"Vote table"}
            />
          </div>
          <button
            className={selectedPage === "voting" ? styles.active__btn : ""}
          >
            VOTING
          </button>
        </Link>
        <Link href={"/breeds"} onClick={() => setSelectedPage("breeds")}>
          <div
            className={selectedPage === "breeds" ? styles.active__border : ""}
          >
            <Image
              src={"/images/pet-breeds.svg"}
              width={117}
              height={163}
              alt={"Pet breeds"}
            />
          </div>
          <button
            className={selectedPage === "breeds" ? styles.active__btn : ""}
          >
            BREEDS
          </button>
        </Link>
        <Link href={"/gallery"} onClick={() => setSelectedPage("gallery")}>
          <div
            className={selectedPage === "gallery" ? styles.active__border : ""}
          >
            <Image
              src={"/images/images-search.svg"}
              width={112}
              height={190}
              alt={"Images search"}
            />
          </div>
          <button
            className={selectedPage === "gallery" ? styles.active__btn : ""}
          >
            GALLERY
          </button>
        </Link>
      </div>
    </div>
  );
}
