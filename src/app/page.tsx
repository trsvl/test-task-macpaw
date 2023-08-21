"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import { useState } from "react";

export default function Home() {
  const [selectedPage, setSelectedPage] = useState<"voting" | "breeds" | "gallery" | "">("");

  return (
    <>
      <header className={styles.navigation}>
        <div className={styles.logo}>
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
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.left}>
          <h1>Hi!👋</h1>
          <h2>Welcome to MacPaw Bootcamp 2023</h2>
          <h3>Lets start using The Cat API</h3>
          <div className={styles.cards}>
            <div>
              <div>
                <Image
                  src={"/images/vote-table.svg"}
                  width={100}
                  height={125}
                  alt={"Vote table"}
                />
              </div>
              <button
                className={selectedPage === "voting" ? styles.active__btn : ""}
                onClick={() => setSelectedPage("voting")}
              >
                VOTING
              </button>
            </div>
            <div>
              <div>
                <Image
                  src={"/images/pet-breeds.svg"}
                  width={117}
                  height={163}
                  alt={"Pet breeds"}
                />
              </div>
              <button
                className={selectedPage === "breeds" ? styles.active__btn : ""}
                onClick={() => setSelectedPage("breeds")}
              >
                BREEDS
              </button>
            </div>
            <div>
              <div>
                <Image
                  src={"/images/images-search.svg"}
                  width={112}
                  height={190}
                  alt={"Images search"}
                />
              </div>
              <button
                className={selectedPage === "gallery" ? styles.active__btn : ""}
                onClick={() => setSelectedPage("gallery")}
              >
                GALLERY
              </button>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <Image
            src={"/images/girl-and-pet.png"}
            width={775}
            height={900}
            priority
            alt={"Girl and pet image"}
            className={styles.right__image}
          />
        </div>
      </main>
    </>
  );
}
