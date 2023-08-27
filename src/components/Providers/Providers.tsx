"use client";

import React from "react";
import { ThemeContextProvider } from "@/utils/Theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
}
