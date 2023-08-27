"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "./page.module.scss";
import { blurURL } from "@/utils/StaticVar";
import { SearchData } from "@/Interfaces/SearchData";
import { useThemeContext } from "@/utils/Theme";
import { getCurrentTime } from "@/utils/GetTime";
import Smile from "../../../public/images/smile.svg";
import Favourite from "../../../public/images/favourite.svg";
import Sad from "../../../public/images/sad.svg";
const { v4: uuidv4 } = require("uuid");

export default function Page() {
  const [data, setData] = useState<SearchData>({
    id: "",
    url: "",
    width: 0,
    height: 0,
  });
  const [clickState, setClickState] = useState<0 | 1 | 2 | 3 | 4>(4);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const { setImageHistory } = useThemeContext();

  useEffect(() => {
    axios
      .get("/api/images")
      .then((response) => {
        setData(response.data.currentImage);
      })
      .finally(() => {
        setImageLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [trigger]);

  const sendLikeHandler = async () => {
    try {
      const sendData = {
        image_id: data.id,
        sub_id: uuidv4(),
        value: 1,
      };
      const sendHistory = {
        time: getCurrentTime(),
        id: data.id,
        action: true,
        value: "likes",
      };
      await axios.post("/api/votes", sendData);
      setImageHistory((prev) => [sendHistory, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  const sendFavoriteHandler = async () => {
    try {
      const sendData = {
        sub_id: uuidv4(),
        image_id: data.id,
      };
      const sendHistory = {
        time: getCurrentTime(),
        id: data.id,
        action: true,
        value: "favourites",
      };
      await axios.post("/api/favourites", sendData);
      setImageHistory((prev) => [sendHistory, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  const sendDislikeHandler = async () => {
    try {
      const sendData = {
        image_id: data.id,
        sub_id: uuidv4(),
        value: 0,
      };
      const sendHistory = {
        time: getCurrentTime(),
        id: data.id,
        action: true,
        value: "dislikes",
      };
      await axios.post("/api/votes", sendData);
      setImageHistory((prev) => [sendHistory, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  const clickHandler = async (number: 0 | 1 | 2 | 3) => {
    setClickState(number);
    setImageLoaded(false);

    if (number === 1) {
      await sendLikeHandler();
    }
    if (number === 2) {
      await sendFavoriteHandler();
    }
    if (number === 3) {
      await sendDislikeHandler();
    }
    setTrigger((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      {imageLoaded ? (
        <div
          className={styles.img__wrapper}
          style={{
            width: `${data.width}px`,
          }}
        >
          <Image
            id={data.id}
            src={data.url}
            fill
            priority
            alt="Image with cat"
            blurDataURL={blurURL}
            placeholder="blur"
            className={styles.current__img}
            sizes="(max-width: 640px) 100vw"
            onLoadingComplete={() => setClickState(0)}
          />
        </div>
      ) : (
        <div className={styles.img__wrapper}>
          <div className="loader"></div>
        </div>
      )}
      <div
        className={
          clickState !== 0
            ? styles.buttons__wrapper__disable
            : styles.buttons__wrapper
        }
      >
        <button
          disabled={!imageLoaded}
          className={clickState === 1 ? styles.btn1__click : styles.btn1}
          onClick={() => clickState === 0 && clickHandler(1)}
        >
          <Smile />
        </button>
        <button
          disabled={!imageLoaded}
          className={clickState === 2 ? styles.btn2__click : styles.btn2}
          onClick={() => clickState === 0 && clickHandler(2)}
        >
          <Favourite />
          <Image
            src={"/images/favourite-fill.svg"}
            width={30}
            height={26}
            alt="Button like"
          />
        </button>
        <button
          disabled={!imageLoaded}
          className={clickState === 3 ? styles.btn3__click : styles.btn3}
          onClick={() => clickState === 0 && clickHandler(3)}
        >
          <Sad />
        </button>
      </div>
    </div>
  );
}
