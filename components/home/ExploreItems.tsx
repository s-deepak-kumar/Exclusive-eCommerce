import { ProductDataInterface } from "@/utils/interfaces";
import { classNames } from "@/utils/utils";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Heart,
  Star,
  StarIcon,
} from "lucide-react";
import { ProductItem } from "../ProductItem";

export default function ExploreItems({data} : ProductDataInterface) {
  return (
    <div className="bg-white mt-4">
      <div className="py-8 sm:py-12 lg:mx-auto lg:max-w-7xl lg:px-8">
        <div className="flex items-center">
          <span className="w-4 h-8 bg-[#DB4444] rounded"></span>
          <span className="text-md text-[#DB4444] ml-3 font-semibold">
            Our Products
          </span>
        </div>
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0 mt-6">
          <div className="flex items-end">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900">
            Explore Our Products
            </h2>
          </div>

          <div className="flex">
            <a
              href="#"
              className="hidden text-sm font-[400] text-black bg-gray-100 p-2 rounded-full sm:block"
            >
              <span aria-hidden="true">
                {" "}
                <ArrowLeft />
              </span>
            </a>
            <a
              href="#"
              className="hidden text-sm font-[400] text-black bg-gray-100 p-2 rounded-full sm:block ml-2"
            >
              <span aria-hidden="true">
                {" "}
                <ArrowRight />{" "}
              </span>
            </a>
          </div>
        </div>

        <div className="relative mt-10">
          <div className="relative -mb-6 w-full overflow-x-auto pb-6">
            <ul
              role="list"
              className="mx-4 inline-flex space-x-8 gap-12 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:space-x-0"
            >
              {data?.map((product) => (
                <li
                  key={product.id}
                  className="inline-flex flex-col text-center lg:w-auto"
                >
                  <ProductItem product={product} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 px-4 w-full text-center">
          <a
            href="#"
            className="text-sm font-semibold text-white bg-[#DB4444] py-2.5 px-6 rounded"
          >
            View All Products
          </a>
        </div>
      </div>
    </div>
  );
}
