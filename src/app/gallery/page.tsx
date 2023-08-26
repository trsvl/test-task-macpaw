"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Grid from "@/components/Grid/Grid";
import { useThemeContext } from "@/utils/Theme";
import styles from "./page.module.scss";
import Image from "next/image";
import { getCurrentTime } from "@/utils/GetTime";

interface BreedsI {
  id: number;
  name: string;
}

export default function GalleryPage() {
  const { allowClick, setAllowClick, page, setPage } = useThemeContext();

  const [data, setData] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [order, setOrder] = useState("RANDOM");
  const [mime, setMime] = useState("");
  const [breedData, setBreedData] = useState<BreedsI[]>([]);
  const [breed, setBreed] = useState("");
  const [limit, setLimit] = useState("5");
  const [click, setClick] = useState(false);

  useEffect(() => {
    setPage("0");
  }, []);

  useEffect(() => {
    const getData = async () => {
      setAllowClick(false);
      setImageLoaded(false);

      await axios.get("/api/breeds/search").then((response) => {
        setBreedData(response.data.breeds);
      });

      await axios
        .get(
          `/api/breeds/images?limit=${limit}&page=${page}&order=${order}&breed_ids=${breed}&mime_types=${mime}`
        )
        .then((response) => {
          setData(response.data.breedsImages);
        })
        .finally(() => {
          setImageLoaded(true);
          setAllowClick(true);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    getData();
  }, [click, page]);

  const reloadHandler = () => {
    setPage("0");
    setClick((prev) => !prev);
  };



  return (
    <>
      <div className={styles.options}>
        <div>
          <p>ORDER</p>
          <select
            value={order}
            disabled={!allowClick}
            onChange={(e) => {
              setOrder(e.target.value);
            }}
          >
            <option value={"RANDOM"}>Random</option>
            <option value={"DESC"}>Desc</option>
            <option value={"ASC"}>Asc</option>
          </select>
        </div>
        <div>
          <p>TYPE</p>
          <select
            value={mime}
            disabled={!allowClick}
            onClick={() => {
              mime === "gif" && setBreed("");
            }}
            onChange={(e) => {
              setMime(e.target.value);
            }}
          >
            <option value={""}>All</option>
            <option value={"jpg,png"}>Static</option>
            <option value={"gif"}>Animated</option>
          </select>
        </div>
        <div>
          <p>BREED</p>
          <select
            value={breed}
            disabled={!allowClick}
            onClick={() => {
              mime === "gif" && setMime("");
              order === "" && setOrder("DESC");
            }}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
          >
            <option value={""}>None</option>
            {breedData.map((value) => {
              return (
                <option key={value.id} value={value.id}>
                  {value.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <p>LIMIT</p>
          <div className={styles.flex}>
            <select
              value={limit}
              disabled={!allowClick}
              onChange={(e) => {
                setLimit(e.target.value);
              }}
            >
              {["5", "10", "15", "20"].map((number, i) => {
                return (
                  <option key={i} value={number}>
                    {`${number} items per page`}
                  </option>
                );
              })}
            </select>
            <button className={styles.update__data} onClick={reloadHandler}>
              <Image
                src={"/images/reload.svg"}
                height={20}
                width={18}
                alt="Update data"
              />
            </button>
          </div>
        </div>
      </div>
      <Grid
        data={data}
        allowClick={allowClick}
        imageLoaded={imageLoaded}
        page={"gallery"}
      />
    </>
  );
}
