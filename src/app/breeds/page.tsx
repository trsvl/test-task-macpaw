"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Grid from "@/components/Grid/Grid";
import { useThemeContext } from "@/utils/Theme";

export default function BreedsPage() {


  const {
    selectBreed,
    selectLimit,
    sorted,
    allowClick,
    setAllowClick,
    clicked,
    page,
  } = useThemeContext();

  const [data, setData] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const getData = async () => {

      setAllowClick(false);
      setImageLoaded(false);
      
      await axios
        .get(
          `/api/breeds/images?limit=${selectLimit}&page=${page}&order=${sorted}&breed_ids=${selectBreed}`
        )
        .then((response) => {
          setData(response.data.breedsImages);
          console.log(response.data.breedsImages);
        })
        .finally(() => {
          setImageLoaded(true);
          setAllowClick(true);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    getData()

  }, [clicked, selectBreed, selectLimit, page, sorted, setAllowClick]);


  return (
    <Grid
      data={data}
      allowClick={allowClick}
      imageLoaded={imageLoaded}
      page={"breeds"}
    />
  );
}
