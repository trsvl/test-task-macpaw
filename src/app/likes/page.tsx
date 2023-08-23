"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Grid from "@/components/Grid/Grid";

export default function LikesPage() {
  const [data, setData] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [allowClick, setAllowClick] = useState(true);

  useEffect(() => {
    axios
      .get("/api/votes")
      .then((response) => {
        setData(response.data.votes);
        console.log(response.data.votes);
      })
      .finally(() => {
        setImageLoaded(true);
        setAllowClick(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [clicked]);

  const clickHanlder = async (id: number) => {
    setAllowClick(false);
    try {
      await axios.delete("/api/votes", {
        data: { id: id },
      });
      setClicked((prev) => !prev);
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  return (
    <Grid
      data={data}
      clickHanlder={clickHanlder}
      allowClick={allowClick}
      imageLoaded={imageLoaded}
      page={"likes"}
    />
  );
}
