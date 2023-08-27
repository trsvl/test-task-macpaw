/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Grid from "@/components/Grid/Grid";
import { useThemeContext } from "@/utils/Theme";
import styles from "./page.module.scss";

export default function LikesPage() {
  const [data, setData] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [allowClick, setAllowClick] = useState(true);

  const { page, setPage, searchText } = useThemeContext();

  useEffect(() => {
    setImageLoaded(false);
    setPage("0");
    const timer = setTimeout(async () => {
      const response = await axios.get("/api/breeds/search");
      const filteredBreeds = response.data.breeds.filter(
        (item: { name: string }) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      const filteredNamesString = filteredBreeds
        .map((item: { id: string }) => item.id.toLowerCase())
        .join(",");
      await axios
        .get(
          `/api/breeds/search/images?page=${page}&breed_ids=${filteredNamesString}`
        )
        .then((response) => {
          setData(response.data.searchImages);
          console.log(response.data.searchImages);
        })
        .finally(() => {
          setImageLoaded(true);
          setAllowClick(true);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 2000);

    return () => clearTimeout(timer);

  }, [page, searchText]);

  return (
    <>
      <p className={styles.text}>
        Search results for: <strong>{searchText}</strong>
      </p>
      <Grid
        data={data}
        allowClick={allowClick}
        imageLoaded={imageLoaded}
        page={"breeds"}
      />
    </>
  );
}
