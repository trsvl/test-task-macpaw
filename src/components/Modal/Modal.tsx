"use client";

import { useState, useRef } from "react";
import styles from "./modal.module.scss";
import Cards from "../LeftSide/Cards";
import Image from "next/image";
import axios from "axios";
import Close from "../../../public/images/close.svg";

interface Props {
  setClickMenu: (prev: boolean) => void;
  menu: boolean;
}

export default function Modal({ setClickMenu, menu }: Props) {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const closeClickHandler = () => {
    setClickMenu(false);
    document.body.style.overflow = "visible";
  };
  const cardClickHandler = () => {
    setTimeout(() => {
      setClickMenu(false);
      document.body.style.overflow = "visible";
    }, 500);
  };

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(0);
    const innerFile: FileList | null | any = e.target.files;

    if (innerFile === null) {
      return;
    }
    const reedFile = innerFile[0];
    console.log(reedFile);

    setName(reedFile?.name);
    setFile(reedFile);
    setPreview("");
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result!.toString());
    };
    reader.readAsDataURL(reedFile);
  };

  const uploadHandler = async () => {
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      console.log("test");

      try {
        const response = await axios.post("/api/images/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-api-key": process.env.API_KEY || "",
          },
        });
        setName("");
        setFile(null);
        setStatus(response.status);
      } catch (error) {
        setStatus(500);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {!menu ? (
        <div className={styles.wrapper__upload}>
          <div className={styles.container__upload}>
            <button className={styles.btn} onClick={closeClickHandler}>
              <Close />
            </button>
            <div className={styles.flex}>
              <h1>Upload a .jpg or .png Cat Image</h1>
              <h2>
                Any uploads must comply with the <span>upload guidelines</span>{" "}
                or face deletion.
              </h2>
              <div
                className={
                  status !== 500
                    ? styles.paste__img__wrapper
                    : styles.paste__img__wrapper__wrong
                }
                onClick={handleImageClick}
              >
                {preview && (
                  <Image
                    src={preview}
                    fill
                    priority
                    quality={1}
                    alt="Loaded image"
                    className={styles.current__img}
                    sizes="(max-width: 640px) 100vw"
                  />
                )}
                {status === 0 && (
                  <>
                    <h3>
                      Drag here <span>your file or </span>Click here{" "}
                      <span>to upload</span>
                    </h3>
                    <Image
                      src={"/images/preload-img.png"}
                      height={200}
                      width={200}
                      alt="Select image"
                    />
                  </>
                )}
              </div>
              <p>{name ? `Image File Name: ${name}` : "No file selected"}</p>
              <input
                type="file"
                name="file"
                accept="image/png, image/jpeg"
                onChange={(e) => imageChangeHandler(e)}
                ref={fileInputRef}
              />
              {name && status == 0 && (
                <button
                  disabled={loading}
                  onClick={uploadHandler}
                  className={styles.upload}
                >
                  {loading && <div className={styles.loader}></div>}
                  <p>UPLOAD PHOTO</p>
                </button>
              )}
            </div>
            {status === 200 && (
              <div className={styles.result}>
                <div>
                  <Image
                    src={"/images/positive-result.svg"}
                    height={20}
                    width={20}
                    alt="Positive"
                  />
                  <p>Thanks for the Upload - Cat found!</p>
                </div>
              </div>
            )}
            {status === 500 && (
              <div className={styles.result}>
                <div>
                  <Image
                    src={"/images/negative-result.svg"}
                    height={20}
                    width={20}
                    alt="Positive"
                  />
                  <p>No Cat found - try a different one</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <button className={styles.btn} onClick={closeClickHandler}>
            <Close />
          </button>
          <div>
            <Cards cardClickHandler={cardClickHandler} />
          </div>
        </div>
      )}
    </>
  );
}
