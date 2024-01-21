"use client";

import { useEffect, useState } from "react";
import { RadioGroup, Tab } from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { Product } from "@/utils/interfaces";
import { classNames } from "@/utils";
import { CURRENCY } from "@/utils/CONSTANTS";
import Navbar from "@/components/Navbar";
import useProuctData from "@/hooks/useProductData";
import { ProductItem } from "@/components/ProductItem";
import useCuid from "@/hooks/useCuid";

const colors = [
  {
    name: "Washed Black",
    bgColor: "bg-gray-700",
    selectedColor: "ring-gray-700",
  },
  { name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
  {
    name: "Washed Gray",
    bgColor: "bg-gray-500",
    selectedColor: "ring-gray-500",
  },
];

const sizes = [
  { name: "XXS", inStock: true },
  { name: "XS", inStock: true },
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: false },
];

interface ProductDetailsInterface {
  productData: Product | null;
  isLoading: boolean;
  error: any | null;
}

const useProductData = ({ pId }: any): ProductDetailsInterface => {
  const [productData, setProductData] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`/api/products/${pId}`);
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { productData, isLoading, error };
};

export default function ProductDetails({ params }: any) {
  const { id } = params;
  const cuid = useCuid();
  const [selectedColor, setSelectedColor] = useState(colors[1]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);

  const { productData, isLoading, error } = useProductData({ pId: id });

  console.log('@@@@@@productData', productData)

  const {
    data: cartItemsData,
    isLoading: cartItemsLoading,
    error: cartItemsError,
    refetch: refetchCart,
  } = useProuctData({ localURL: "cart" });

  const {
    data: relatedItemsData,
    isLoading: relatedItemsLoading,
    error: relatedItemsError
  } = useProuctData({ limit: 5, skip: 80 });

  const handleAddToCart = () => {
    refetchCart()
  }

  // Add to Cart
  const addToCart = async () => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cuid, product: productData }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Product added to cart successfully:", data.message);
        refetchCart()
      } else {
        console.error("Error adding product to cart:", data.message);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <>
      {/* Navbar component */}
      <Navbar cartCount={cartItemsData?.length} />
      <div className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <span className="text-gray-400 text-sm font-[300]">Home / Product</span>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          / {productData?.title}
        </h1>

        <div className="mx-auto max-w-2xl lg:max-w-none mt-12">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex gap-6 h-full col-span-2">
              {/* Image selector */}
              <div className="mx-auto hidden w-max sm:block lg:max-w-none">
                <Tab.List className="grid grid-rows-4 gap-4">
                  {productData?.images.map(
                    (image, index) =>
                      index < 4 && (
                        <Tab
                          key={index}
                          className="relative flex h-24 w-24 bg-gray-100 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                        >
                          {({ selected }) => (
                            <>
                              <span className="absolute inset-0 overflow-hidden rounded-md">
                                <img
                                  src={image}
                                  alt=""
                                  className="h-full w-full object-cover object-center "
                                />
                              </span>
                              <span
                                className={classNames(
                                  selected
                                    ? "ring-indigo-500"
                                    : "ring-transparent",
                                  "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </Tab>
                      )
                  )}
                </Tab.List>
              </div>

              <Tab.Panels className="w-full h-full">
                {productData?.images.map(
                  (image, index) =>
                    index < 4 && (
                      <Tab.Panel key={index}>
                        <img
                          src={image}
                          className="h-[430px] w-full object-contain hover:object-none sm:rounded-lg bg-gray-100"
                        />
                      </Tab.Panel>
                    )
                )}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                {productData?.title}
              </h1>

              {/* Reviews */}
              <div className="mt-2">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          productData?.rating ?? 0 > rating
                            ? "text-yellow-400"
                            : "text-gray-300",
                          "h-4 w-4 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 ml-2">
                    {`(${Math.floor(productData?.rating ?? 0 * 16)} Reviews)`}
                  </p>
                  <hr className="h-3.5 w-[1px] bg-gray-400 mx-4" />
                  <p className="text-xs text-[#00FF66]">In Stock</p>
                  <p className="sr-only">
                    {productData?.rating} out of 5 stars
                  </p>
                </div>
              </div>

              <div className="flex mt-3">
                <p className="text-xl tracking-tight text-black font-[500]">
                  {CURRENCY}
                  {Math.floor(
                    (productData?.price ?? 0) -
                      ((productData?.price ?? 0) *
                        (productData?.discountPercentage ?? 0)) /
                        100
                  )}
                </p>
                <p className="text-lg tracking-tight text-gray-500 line-through ml-2">
                  {CURRENCY}
                  {productData?.price}
                </p>
              </div>

              <div className="mt-4">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-4 text-sm text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: productData?.description ?? "",
                  }}
                />
              </div>

              <hr className="border-[1px] w-full my-4" />

              <form className="mt-2">
                {/* Colors */}
                <div className="flex items-center">
                  <h3 className="text-md w-max text-gray-600 font-[400]">
                    Colors:{" "}
                  </h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="w-max ml-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-1">
                      {colors.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedColor,
                              active && checked ? "ring ring-offset-0.5" : "",
                              !active && checked ? "ring-1" : "",
                              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.bgColor,
                              "h-5 w-5 rounded-full border border-black border-opacity-10"
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Size */}
                <div className="flex items-center mt-4">
                  <h3 className="text-md w-max text-gray-600 font-[400]">
                    Size:{" "}
                  </h3>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="ml-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          className={({ active, checked }) =>
                            classNames(
                              size.inStock
                                ? "cursor-pointer focus:outline-none"
                                : "cursor-not-allowed opacity-25",
                              active
                                ? "ring-2 ring-[#DB4444] ring-offset-1"
                                : "",
                              checked
                                ? "border-transparent bg-[#DB4444] text-white hover:bg-[#DB4444]"
                                : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                              "flex items-center justify-center rounded border py-1.5 px-1.5 text-sm font-medium uppercase sm:flex-1"
                            )
                          }
                          disabled={!size.inStock}
                        >
                          <RadioGroup.Label
                            as="span"
                            className="text-xs font-[400]"
                          >
                            {size.name}
                          </RadioGroup.Label>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </form>

              <div className="mt-4">
                <div className="mt-10 flex">
                  <button
                    type="submit"
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-[#DB4444] px-8 py-3 text-base font-medium text-white sm:w-full"
                    onClick={addToCart}
                  >
                    Add to bag
                  </button>

                  <button
                    type="button"
                    className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <HeartIcon
                      className="h-6 w-6 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <section
            aria-labelledby="related-heading"
            className="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0"
          >
            <div className="flex items-center">
              <span className="w-4 h-8 bg-[#DB4444] rounded"></span>
              <span className="text-md text-[#DB4444] ml-3 font-semibold">
                Related Products
              </span>
            </div>
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0 mt-6">
          <div className="flex items-end">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
            Customer also bought
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
              className="mx-4 inline-flex space-x-8 gap-12 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:space-x-0"
            >
              {relatedItemsData?.map((product) => (
                <li
                  key={product.id}
                  className="inline-flex flex-col text-center lg:w-auto"
                >
                  <ProductItem product={product} onAddToCart={handleAddToCart} />
                </li>
              ))}
            </ul>
          </div>
        </div>
          </section>
        </div>
      </div>
    </>
  );
}
