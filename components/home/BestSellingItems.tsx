import { ProductItem } from "../ProductItem";
import { Product, ProductDataInterface } from "@/utils/interfaces";

export default function BestSellingItems({data} : ProductDataInterface) {
  return (
    <div className="bg-white mt-2">
      <div className="py-8 sm:py-12 lg:mx-auto lg:max-w-7xl lg:px-8">
        <div className="flex items-center">
          <span className="w-4 h-8 bg-[#DB4444] rounded"></span>
          <span className="text-md text-[#DB4444] ml-3 font-semibold">
            This Month
          </span>
        </div>
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0 mt-6">
          <div className="flex items-end">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900">
            Best Selling Products
            </h2>
          </div>

          <div className="flex">
          <a
            href="#"
            className="text-sm font-semibold text-white bg-[#DB4444] py-2.5 px-6 rounded"
          >
            View All
          </a>
          </div>
        </div>

        <div className="relative mt-10">
          <div className="relative -mb-6 w-full overflow-x-auto pb-6">
            <ul
              role="list"
              className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:space-x-0"
            >
              {data?.map((product: Product) => (
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
      </div>
    </div>
  );
}
