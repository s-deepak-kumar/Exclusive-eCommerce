"use client";

import Banner from "@/components/home/Banner";
import BestSellingItems from "@/components/home/BestSellingItems";
import Category from "@/components/home/Category";
import ExploreItems from "@/components/home/ExploreItems";
import LeftMenu from "@/components/home/LeftMenu";
import NewArrivals from "@/components/home/NewArrivals";
import Slider_ from "@/components/home/Slider";
import TrendingItems from "@/components/home/TrendingItems";

export default function Home() {
  return (
    <>
    <div id="hero" className="bg-white flex mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 gap-8">
      <LeftMenu />
      <Slider_ />
    </div>

    <TrendingItems />
    <hr className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 gap-8" />
    <Category />
    <hr className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 gap-8" />
    <BestSellingItems />
    <Banner />
    <ExploreItems />
    <NewArrivals />
    </>
  );
}
