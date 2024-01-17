"use client";

import Banner from "@/components/home/Banner";
import BestSellingItems from "@/components/home/BestSellingItems";
import Category from "@/components/home/Category";
import ExploreItems from "@/components/home/ExploreItems";
import Incentives from "@/components/home/Incentives";
import LeftMenu from "@/components/home/LeftMenu";
import NewArrivals from "@/components/home/NewArrivals";
import Slider_ from "@/components/home/Slider";
import TrendingItems from "@/components/home/TrendingItems";
import { useEffect, useState } from "react";

export default function Home() {
  const [trendingItemsData, setTrendingItemsData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/products?featured=true");
        const data = await response.json();
        setTrendingItemsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        id="hero"
        className="bg-white flex mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 gap-8"
      >
        <LeftMenu />
        <Slider_ />
      </div>

      <TrendingItems data={trendingItemsData} />
      <hr className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 gap-8" />
      <Category />
      <hr className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 gap-8" />
      <BestSellingItems />
      <Banner />
      <ExploreItems />
      <NewArrivals />
      <Incentives />
    </>
  );
}
