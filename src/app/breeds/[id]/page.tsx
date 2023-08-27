/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "./page.module.scss";
import { blurURL } from "@/utils/StaticVar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style.scss";

export default function CertainBreed({ params }: { params: { id: string } }) {
  interface DataI {
    id: string;
    description: string;
    name: string;
    life_span: string;
    temperament: string;
    weight: { metric: string };
    origin: string;
  }
  interface ImageI {
    url: string;
    id: string;
  }
  const [data, setData] = useState<DataI>({
    id: "",
    description: "",
    name: "",
    life_span: "",
    temperament: "",
    weight: { metric: "" },
    origin: "",
  });

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imagesData, setImagesData] = useState([]);

  useEffect(() => {
    axios.get(`/api/breeds/inner_images/?id=${params.id}`).then((response) => {
      setImagesData(response.data.innerImages);
    });
    axios
      .get(`/api/breeds/id/?id=${params.id}`)
      .then((response) => {
        setData(response.data.breedInfo);
      })
      .finally(() => {
        setImageLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      {imageLoaded ? (
        <>
          {data.name && imagesData.length !== 0 ? (
            <>
              <Carousel
                className={styles.carousel}
                showArrows={false}
                emulateTouch={true}
                showThumbs={false}
                showStatus={false}
              >
                {imagesData.map((item: ImageI, i) => {
                  return (
                    <div key={i} className={styles.img__wrapper}>
                      <Image
                        src={item.url}
                        alt={`Image ${item.id}`}
                        fill
                        blurDataURL={blurURL}
                        placeholder="blur"
                        priority
                        sizes="(max-width: 640px) 100vw"
                      />
                    </div>
                  );
                })}
              </Carousel>
              <div className={styles.text}>
                <div className={styles.name}>
                  <p>{data.name}</p>
                </div>
                <p className={styles.description}>{data.description}</p>
                <div className={styles.details}>
                  <div>
                    <p>
                      {" "}
                      <strong>Temperament: </strong>
                      {data.temperament}
                    </p>
                  </div>
                  <div>
                    <p>
                      {" "}
                      <strong>Origin: </strong>
                      {data.origin}
                    </p>
                    <p>
                      {" "}
                      <strong>Weight: </strong>
                      {data.weight.metric}
                    </p>
                    <p>
                      {" "}
                      <strong>Life span: </strong>
                      {data.life_span}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.no__item}>
              <p>No item found</p>
            </div>
          )}
        </>
      ) : (
        <div className={styles.center}>
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}
