"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { GetPath } from "./GetPath";
import { ItemHistory, ThemeI } from "@/Interfaces/Theme";

const ThemeContext = createContext<ThemeI>({} as ThemeI);

export const ThemeContextProvider = ({ children }: any) => {
  const [imageHistory, setImageHistory] = useState<ItemHistory[]>([]);
  const currentPath = GetPath();
  const [allowClick, setAllowClick] = useState(false);
  const [selectBreed, setSelectBreed] = useState("");
  const [selectLimit, setSelectLimit] = useState("5");
  const [sorted, setSorted] = useState<"ASC" | "DESC">("ASC");
  const [clicked, setClicked] = useState(false);
  const [page, setPage] = useState("0");

  useEffect(() => {
    if (imageHistory.length === 5) {
      const removeLastHistory = [...imageHistory];
      removeLastHistory.pop();
      setImageHistory(removeLastHistory);
    }
  }, [imageHistory, setImageHistory]);

  return (
    <ThemeContext.Provider
      value={{
        imageHistory,
        setImageHistory,
        currentPath,
        selectBreed,
        setSelectBreed,
        selectLimit,
        setSelectLimit,
        sorted,
        setSorted,
        allowClick,
        setAllowClick,
        clicked,
        setClicked,
        page,
        setPage,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
