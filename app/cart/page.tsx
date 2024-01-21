"use client";

import Navbar from "@/components/Navbar";
import useCuid from "@/hooks/useCuid";
import useProductData from "@/hooks/useProductData";
import { removeFromCart } from "@/utils";
import { CURRENCY } from "@/utils/CONSTANTS";
import { XMarkIcon as XMarkIconMini } from "@heroicons/react/20/solid";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Cart() {
  const cuid = useCuid();
  const [cartValue, setCartValue] = useState<number>(0);

  const {
    data: cartItemsData,
    isLoading: cartItemsLoading,
    error: cartItemsError,
    refetch: refetchCart,
  } = useProductData({ localURL: "cart" });

  useEffect(() => {
    // Calculate the total value of the cart
    const totalCartValue = cartItemsData?.reduce((total, product) => {
      const actualPrice =
        product.price -
        (product.price * (product.discountPercentage || 0)) / 100;
      return total + actualPrice * (product?.quantity ?? 1);
    }, 0);

    setCartValue(totalCartValue ?? 0);
  }, [cartItemsLoading]);

  return (
    <>
      {/* Navbar component */}
      <Navbar cartCount={cartItemsData?.length} />
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <span className="text-gray-400 text-sm font-[300]">Home</span>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          / Shopping Cart
        </h1>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {cartItemsData?.map((product, productIdx) => (
                <li key={product.id} className="flex py-2 sm:py-4">
                  <div className="flex-shrink-0">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-12 w-12 rounded object-cover object-center sm:h-16 sm:w-16 bg-gray-200"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a
                              href={`/product/${product.id}`}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.title}
                            </a>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm items-center">
                          <p className="text-gray-500">{product.color}</p>
                          <hr className="h-3.5 w-[1.5px] bg-gray-300 mx-4" />
                          {product.size ? (
                            <p className="text-gray-500">{product.size}</p>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {CURRENCY}
                          {Math.floor(
                            product.price -
                              (product.price * product?.discountPercentage) /
                                100
                          )}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label
                          htmlFor={`quantity-${productIdx}`}
                          className="sr-only"
                        >
                          Quantity, {product.title}
                        </label>
                        <div className="relative inline-block">
                          <select
                            id={`quantity-${productIdx}`}
                            name={`quantity-${productIdx}`}
                            className="max-w-full rounded border border-gray-300 py-1.5 px-2 pr-8 text-left text-base font-medium leading-5 text-gray-700 sm:text-sm bg-white appearance-none"
                            value={product?.quantity}
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </div>

                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => {
                              removeFromCart(product.id, cuid, refetchCart);
                            }}
                          >
                            <span className="sr-only">Remove</span>
                            <XMarkIconMini
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded border-[1.5px] border-black px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-xl font-medium text-gray-900"
            >
              Cart Total
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {CURRENCY}
                  {Math.floor(cartValue)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping Charge</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">Free</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Total</dt>
                <dd className="text-base font-medium text-gray-900">
                  {CURRENCY}
                  {Math.floor(cartValue)}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex w-full">
              <a
                href="/checkout"
                className="w-full rounded border border-transparent bg-[#DB4444] px-4 py-3 text-base font-medium text-white text-sm text-center"
              >
                Checkout
              </a>
            </div>
          </section>
        </form>
      </div>
    </>
  );
}
