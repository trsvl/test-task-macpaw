"use client";


import { createContext, useContext, useEffect, useState } from "react";
import { GetPath } from "./GetPath";
import { ItemHistory, ThemeI } from "@/Interfaces/Theme";

const ThemeContext = createContext<ThemeI>({} as ThemeI) 

export const ThemeContextProvider = ({ children }:any ) => {
    const [imageHistory, setImageHistory] = useState<ItemHistory[]>([]);

    const currentPath = GetPath();

    useEffect(() => {
        if (imageHistory.length === 5) {
          const removeLastHistory = [...imageHistory];
          removeLastHistory.pop();
          console.log(imageHistory);
          
          setImageHistory(removeLastHistory);
        }
      }, [imageHistory, setImageHistory]);

    return (
        <ThemeContext.Provider value={{ imageHistory, setImageHistory, currentPath }}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useThemeContext = () => useContext(ThemeContext);
