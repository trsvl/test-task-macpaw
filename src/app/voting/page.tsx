"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "./page.module.scss";
const { v4: uuidv4 } = require('uuid');


interface DataI {
  id: string;
  url: string;
  width: number;
  height: number;
}

export default function VotingPage() {
  const [data, setData] = useState<DataI>({
    id: "",
    url: "",
    width: 0,
    height: 0,
  });
  const [clickState, setClickState] = useState<0 | 1 | 2 | 3>(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("/api/voting/getimage")
      .then((response) => {
        setData(response.data.currentImage);

        console.log(response.data.currentImage);
      })
      .finally(() => {
        setImageLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const sendVoteHabdler = async () => {
    try{
      const sendData = {
        sub_id: uuidv4(),
        image_id: data.id,
      }
      const response = await axios
        .post("/api/voting/favourites", sendData)
        .then(()=>{
          console.log(response);
        })
    } catch(error){
        console.log(error);
    }
   
     
      
  };

  const clickHandler = async (number: 0 | 1 | 2 | 3) => {
    await sendVoteHabdler();
    setClickState(number);
    setTimeout(() => {
      setClickState(0);
    }, 500);
  };

  return (
      <div className={styles.img__wrapper}>
        {imageLoaded ? (
          <div >
 <Image
            id={data.id}
            src={data.url}
            width={data.width}
            height={data.height}
            alt="Image with cat"
            blurDataURL="/images/preload-img.png"
            placeholder="blur"
            className={styles.current__img}
          />
          </div>
        ) : (
          <div className="loader"></div>
        )}
        <div className={styles.buttons__wrapper}>
          <button
            disabled={!imageLoaded}
            className={clickState === 1 ? styles.btn1__click : styles.btn1}
            onClick={() => clickHandler(1)}
          >
            <Image
              src={"/images/smiling-face1.svg"}
              width={30}
              height={30}
              alt="Button favourite"
            />
            <Image
              src={"/images/smiling-face-green.svg"}
              width={30}
              height={30}
              alt="Button favourite"
            />
          </button>
          <button
            disabled={!imageLoaded}
            className={clickState === 2 ? styles.btn2__click : styles.btn2}
            onClick={() => clickHandler(2)}
          >
            <Image
              src={"/images/favourite1.svg"}
              width={30}
              height={26}
              alt="Button like"
            />
            <Image
              src={"/images/favourite-color1.svg"}
              width={30}
              height={26}
              alt="Button like"
            />
            <Image
              src={"/images/favourite.svg"}
              width={30}
              height={26}
              alt="Button like"
            />
          </button>
          <button
            disabled={!imageLoaded}
            className={clickState === 3 ? styles.btn3__click : styles.btn3}
            onClick={() => clickHandler(3)}
          >
            <Image
              src={"/images/sad-face1.svg"}
              width={30}
              height={30}
              alt="Button dislike"
            />
            <Image
              src={"/images/sad-face-yellow.svg"}
              width={30}
              height={30}
              alt="Button dislike"
            />
          </button>
        </div>
      </div>
  );
}
