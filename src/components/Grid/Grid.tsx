"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import { blurURL } from "@/utils/StaticVar";
import { useThemeContext } from "@/utils/Theme";
import { getCurrentTime } from "@/utils/GetTime";
import Pagination from "../Pagination/Pagination";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
const { v4: uuidv4 } = require("uuid");

interface Data {
  id: number | string | any;
  url: string;
  image: { url: string };
  image_id: string;
  sub_id: string;
  breeds: { name: string; id: string }[];
}

interface GridI {
  imageLoaded: boolean;
  data: Data[];
  allowClick: boolean;
  clickHanlder?: Function;
  page: string;
}

export default function Grid({
  imageLoaded,
  data,
  allowClick,
  clickHanlder,
  page,
}: GridI) {
  const { setImageHistory, currentPath } = useThemeContext();
  const router = useRouter();
  const [checkHeart, setCheckHeart] = useState(false);
  const smallImg =
    page === "likes"
      ? "/images/smiling-face-green-small.svg"
      : page === "favourites" || page === "gallery"
      ? "/images/favourite-red-small.svg"
      : page === "dislikes"
      ? "/images/sad-face-yellow-small.svg"
      : "";

  const innerClickHandler = async (
    imageId: string,
    id?: number,
    breedId?: string
  ) => {
    clickHanlder && clickHanlder(id);
    page === "breeds" && router.push(`/breeds/${breedId}`);
    if (page !== "breeds" && page !== "gallery") {
      const sendHistory = {
        time: getCurrentTime(),
        id: imageId,
        action: false,
        value: page,
      };
      setImageHistory((prev) => [sendHistory, ...prev]);
    }
    if (page === "gallery") {
      await axios.get(`/api/favourites/id?id=${imageId}`).then((response) => {
        const checkFav = response.data.favourite_id.length !== 0;
        const data = response.data.favourite_id;

        if (checkFav) {
          const deleteItem = async () => {
            try {
              await axios.delete("/api/favourites", {
                data: { id: data[0].id },
              });
              const sendHistory = {
                time: getCurrentTime(),
                id: imageId,
                action: false,
                value: "favourites",
              };
              setImageHistory((prev) => [sendHistory, ...prev]);
            } catch (error) {
              console.error("Error deleting", error);
            }
          };
          deleteItem();
        } else {
          const sendFavoriteHandler = async () => {
            try {
              const sendData = {
                sub_id: uuidv4(),
                image_id: imageId,
              };
              const sendHistory = {
                time: getCurrentTime(),
                id: imageId,
                action: true,
                value: "favourites",
              };
              await axios.post("/api/favourites", sendData);
              setImageHistory((prev) => [sendHistory, ...prev]);
            } catch (error) {
              console.log(error);
            }
          };
          sendFavoriteHandler();
        }
      });
    }
  };

  const emptyArr = data.length !== 0;

  return (
    <div className={styles.wrapper}>
      {imageLoaded ? (
        <>
          {emptyArr ? (
            <>
              <div className={styles.grid}>
                {data.map((item: Data) => {
                  return (
                    <div
                      key={uuidv4()}
                      className={styles.img__wrapper}
                      onClick={() => {
                        allowClick &&
                          page !== "breeds" &&
                          page !== "gallery" &&
                          innerClickHandler(item.image_id, item.id);
                        allowClick &&
                          page === "breeds" &&
                          innerClickHandler(
                            item.image_id,
                            item.id,
                            item.breeds[0].id
                          );
                        allowClick &&
                          page === "gallery" &&
                          innerClickHandler(item.id);
                        allowClick &&
                          page === "gallery" &&
                          setCheckHeart((prev) => !prev);
                      }}
                      style={{ cursor: allowClick ? "pointer" : "not-allowed" }}
                      onMouseLeave={() => setCheckHeart(false)}
                    >
                      <div className={styles.bg}></div>
                      <Image
                        src={
                          page !== "breeds" && page !== "gallery"
                            ? item.image.url
                            : item.url
                        }
                        alt={`Image ${item.sub_id || item.id}`}
                        fill
                        blurDataURL={blurURL}
                        placeholder="blur"
                        priority
                        sizes="(max-width: 640px) 100vw"
                      />
                      {page === "breeds" ? (
                        <div className={styles.hover__breeds}>
                          <p>{item.breeds[0]?.name}</p>
                        </div>
                      ) : page === "gallery" ? (
                        <div className={styles.img__hover}>
                          {checkHeart ? (
                            <Image
                              src={"/images/favourite-red-small.svg"}
                              width={20}
                              height={20}
                              alt={"Remove from favorites"}
                            />
                          ) : (
                            <Image
                              src={"/images/favourite-red-small-border.svg"}
                              width={20}
                              height={20}
                              alt={"Remove from favorites"}
                            />
                          )}
                        </div>
                      ) : (
                        <div className={styles.img__hover}>
                          <Image
                            src={smallImg}
                            width={20}
                            height={20}
                            alt={"Remove from favorites"}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className={styles.no__item}>
              <p>No item found</p>
            </div>
          )}
          {(currentPath === "breeds" || currentPath === "gallery" || currentPath === "search") && (
            <Pagination state={!emptyArr} />
          )}
        </>
      ) : (
        <div className={styles.center}>
          <div>
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
}
