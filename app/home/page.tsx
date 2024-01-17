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
import useProductData from "@/hooks/useProductData";

export default function Home() {
  const {
    productsData: trendingItemsData,
    isLoading: trendingItemsLoading,
    error: trendingItemsError,
  } = useProductData({ limit: 5, skip: 55 });
  
  const {
    productsData: bestSellingItemsData,
    isLoading: bestSellingItemsLoading,
    error: bestSellingItemsError,
  } = useProductData({ limit: 5, skip: 10 });

  const {
    productsData: exploreItemsData,
    isLoading,
    error,
  } = useProductData({ limit: 10, skip: 40 });

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
      <BestSellingItems data={bestSellingItemsData} />
      <Banner />
      <ExploreItems data={exploreItemsData} />
      <NewArrivals />
      <Incentives />
    </>
  );
}
