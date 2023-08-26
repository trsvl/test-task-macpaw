"use client";

import Image from "next/image";
import styles from "./right.module.scss";
import { ReactNode, useState, useEffect } from "react";
import { currentPageOptions } from "@/Interfaces/CurrentPath";
import { useThemeContext } from "@/utils/Theme";
import { ThemeI } from "@/Interfaces/Theme";
import ImageHistory from "../ImageHistory/imageHistory";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import { GetInnerPath, GetInnerPathId } from "@/utils/GetPath";
import Modal from "../Modal/Modal";

interface Props {
  children: ReactNode;
}
interface BreedsI {
  id: number;
  name: string;
}

export default function RightSide(props: Props) {
  const { currentPath } = useThemeContext() as ThemeI;

  const [data, setData] = useState<BreedsI[]>([]);
  const [uploadClick, setUploadClick] = useState(false);

  const {
    selectBreed,
    setSelectBreed,
    selectLimit,
    setSelectLimit,
    allowClick,
    sorted,
    setSorted,
    setClicked,
    page,
    setPage,
  } = useThemeContext();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/api/breeds/search");
      setData(response.data.breeds);
    };
    currentPath === "breeds" && getData();
  }, [currentPath]);

  const uploadClickHandler = () => {
    setUploadClick(true)
    document.body.style.overflow = "hidden";
  }
 

  return (
    <>
      {currentPath !== "" ? (
        <div className={styles.right}>
          {uploadClick && <Modal setClickMenu={setUploadClick}/>}
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
            {GetInnerPath() >= 3
            ? <>
            <div className={styles.selected1}>
            <p>BREEDS</p>
          </div>
          <div className={styles.selected2}>
            <p>{GetInnerPathId()}</p>
          </div>
          </>
            : <div className={styles.selected}>
            <p>{currentPath}</p>
          </div>
            
            }
            {currentPath === "gallery" &&
              <button onClick={uploadClickHandler} className={styles.upload__wrapper}>
                <Image
                src={"/images/upload.svg"}
                width={16}
                height={16}
                alt="Upload"
                />
                   <Image
                src={"/images/upload.svg"}
                width={16}
                height={16}
                alt="Upload"
                />
                <div className={styles.loader}></div>
                <p>UPLOAD</p>
              </button>
            }
            {currentPath === "breeds" && (
              <div className={styles.breeds__wrapper}>
                <select
                  value={selectBreed}
                  disabled={!allowClick}
                  onChange={(e) => {
                    page != "0" && setPage("0");
                    setSelectBreed(e.target.value);
                  }}
                >
                  <option value="">All breeds</option>
                  {data.map((item) => {
                    return (
                      <option key={item.name} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>

                <select
                  value={selectLimit}
                  disabled={!allowClick}
                  onChange={(e) => {
                    page != "0" && setPage("0");
                    setSelectLimit(e.target.value);
                  }}
                >
                  {[5, 10, 15, 20].map((number, i) => {
                    return (
                      <option key={i} value={String(number)}>
                        Limit: {number}
                      </option>
                    );
                  })}
                </select>

                <button
                  onClick={() => {
                    page != "0" && setPage("0");
                    setClicked((prev) => !prev);
                    setSelectBreed("");
                    setSorted("DESC")
                  }}
                  disabled={!allowClick || sorted == "DESC"}
                >
                  <Image
                    src={"/images/sort-up.svg"}
                    height={12}
                    width={12}
                    alt="Sort up"
                  />
                  <Image
                    src={"/images/sort-up-red.svg"}
                    height={12}
                    width={12}
                    alt="Sort up"
                  />
                </button>
                <button
                  onClick={() => {
                    page != "0" && setPage("0");
                    setClicked((prev) => !prev);
                    setSelectBreed("");
                    setSorted("ASC")
                  }}
                  disabled={!allowClick || sorted == "ASC"}
                >
                  <Image
                    src={"/images/sort-down.svg"}
                    height={12}
                    width={12}
                    alt="Sort down"
                  />
                  <Image
                    src={"/images/sort-down-red.svg"}
                    height={12}
                    width={12}
                    alt="Sort down"
                  />
                </button>
              </div>
            )}
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
