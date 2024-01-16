"use client";

import LeftMenu from "@/components/home/LeftMenu";
import Slider_ from "@/components/home/Slider";

export default function Home() {
  return (
    <>
    <div id="hero" className="bg-white flex mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 gap-8">
      <LeftMenu />
      <Slider_ />
    </div>
    </>
  );
}