"use client";

import "./globals.scss";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import Image from "next/image";
import LeftSide from "@/components/LeftSide/LeftSide";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header/Header";
import axios from "axios"
import RightSide from "@/components/RightSide/RightSide";
import { GetPath } from "@/utils/GetPath";
import { SearchData } from "@/Interfaces/SearchData";



const jost = Jost({ subsets: ["latin"], display: "fallback" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const currentPath = GetPath();



  return (
    <html lang="en">
      <body className={jost.className}>
        <Header  currentPath={currentPath}/>
        <main>
          <LeftSide currentPath={currentPath}
          />
          {currentPath !== "" ?
          <RightSide currentPath={currentPath}>
          {children}
          </RightSide>
          : children
          }
          
         
        </main>
      </body>
    </html>
  );
}
