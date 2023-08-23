"use client";

import axios from "axios";
import Image from "next/image";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { blurURL } from "@/utils/StaticVar";


interface FavData {
    id: number,
    image: { url: string };
    image_id: string;
    sub_id: string;
  }

interface GridI {
    imageLoaded: boolean;
    data: FavData[];
    allowClick: boolean;
    clickHanlder: Function;
    page: string;
}


export default function Grid({imageLoaded, data, allowClick, clickHanlder, page}:GridI) {
 
    const smallImg =
    page === "likes"
    ? "/images/smiling-face-green-small.svg"
    : page === "favourites"
    ? "/images/favourite-red-small.svg"
    : page === "dislikes"
    ? "/images/sad-face-yellow-small.svg"
    : "";
 
    return (
    <div className={styles.wrapper}>
    {imageLoaded ? (
      <div className={styles.grid}>
        {data.map((item: FavData) => {
          return (
            <div key={item.sub_id}
            className={styles.img__wrapper}
            onClick={()=> allowClick && clickHanlder(item.id)}
            style={{cursor: allowClick ? "pointer" : "not-allowed"}}
            >
              <div className={styles.bg}></div>
              <Image
                src={item.image.url}
                alt={`Image ${item.sub_id}`}
                fill
                blurDataURL={blurURL}
                priority
                sizes="(max-width: 640px) 100vw"
              />
              <div className={styles.img__hover}>
              <Image
              src={smallImg}
              width={20}
              height={20}
              alt={"Remove from favorites"}
              />
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <div className={styles.center}>
<div className="loader"></div>
      </div>
    )}
  </div>
  )
}
