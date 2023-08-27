"use client";

import React from "react";
import { ThemeContextProvider } from "@/utils/Theme";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </ThemeProvider>
  );
}
