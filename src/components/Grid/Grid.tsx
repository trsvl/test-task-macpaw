"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import { blurURL } from "@/utils/StaticVar";
import { useThemeContext } from "@/utils/Theme";
import { getCurrentTime } from "@/utils/GetTime";
import Pagination from "../Pagination/Pagination";
import { useRouter } from "next/navigation";
const { v4: uuidv4 } = require("uuid");

interface Data {
  id: number;
  url: string;
  image: { url: string };
  image_id: string;
  sub_id: string;
  breeds: {name: string, id: string}[];
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
  const smallImg =
    page === "likes"
      ? "/images/smiling-face-green-small.svg"
      : page === "favourites"
      ? "/images/favourite-red-small.svg"
      : page === "dislikes"
      ? "/images/sad-face-yellow-small.svg"
      : "";

  const innerClickHandler = (imageId: string, id: number, breedId?: string) => {
      clickHanlder && clickHanlder(id);
    page === "breeds" && router.push(`/breeds/${breedId}`)
    if (page !== "breeds") {
      const sendHistory = {
        time: getCurrentTime(),
        id: imageId,
        action: false,
        value: page,
      };
      setImageHistory((prev) => [sendHistory, ...prev]);
    }
  };

  const emptyArr = data.length !== 0

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
                      onClick={() =>{
                        (allowClick && page !== "breeds") && innerClickHandler(item.image_id, item.id);
                        (allowClick && page === "breeds") && innerClickHandler(item.image_id, item.id, item.breeds[0].id);
                      }
                      }
                      style={{ cursor: allowClick ? "pointer" : "not-allowed" }}
                    >
                      <div className={styles.bg}></div>
                      <Image
                        src={page !== "breeds" ? item.image.url : item.url}
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
                  {(currentPath === "breeds" || currentPath === "gallery") && (
                <Pagination state={!emptyArr}/>
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
