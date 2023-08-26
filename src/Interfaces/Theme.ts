import { SetStateAction, Dispatch } from "react";
import { currentPageOptions } from "./CurrentPath";

export interface ItemHistory {
  time: string;
  id: string;
  action: boolean;
  value: string;
}

export interface ThemeI {
  imageHistory: ItemHistory[];
  setImageHistory: Dispatch<SetStateAction<ItemHistory[]>>;
  currentPath: currentPageOptions;
  selectBreed: string;
  setSelectBreed: Dispatch<SetStateAction<string>>;
  selectLimit: string;
  setSelectLimit: Dispatch<SetStateAction<string>>;
  sorted: "ASC" | "DESC";
  setSorted: Dispatch<SetStateAction<"ASC" | "DESC">>;
  allowClick: boolean;
  setAllowClick: Dispatch<SetStateAction<boolean>>;
  clicked: boolean;
  setClicked: Dispatch<SetStateAction<boolean>>;
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
}
