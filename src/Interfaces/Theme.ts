import { SetStateAction, Dispatch } from "react";
import { currentPageOptions } from "./CurrentPath";

interface Item {
  time: string;
  id: string;
  value: string;
}

export interface ThemeI {
  imageHistory: Item[];
  setImageHistory: Dispatch<SetStateAction<Item[]>>;
  currentPath: currentPageOptions;
}
