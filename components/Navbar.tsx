"use client";

import { Disclosure } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Heart, ShoppingCart } from "lucide-react";

export default function Navbar({ cartCount = 0 }) {
  return (
    <Disclosure as="nav" className="bg-white border-b-[1px]">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="flex h-20 justify-between pt-4 items-center">
              <div className="flex px-2 lg:px-0 gap-6 items-center">
                <a href="/" className="flex flex-shrink-0 items-center">
                  <h2 className="text-2xl text-black font-bold">Exclusive</h2>
                </a>
              </div>
              <div className="lg:ml-4 lg:flex lg:space-x-6 h-max">
                <a
                  href="/"
                  className="inline-flex items-center border-b-[1px] border-gray-500 px-1 text-md text-black"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-b-2 border-transparent px-1 text-md text-black hover:border-gray-300 hover:text-gray-700"
                >
                  Contact
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-b-2 border-transparent px-1 text-md text-black hover:border-gray-300 hover:text-gray-700"
                >
                  About
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-b-2 border-transparent px-1 text-md text-black hover:border-gray-300 hover:text-gray-700"
                >
                  Signup
                </a>
              </div>
              <div className="lg:ml-4 lg:flex lg:items-center gap-4">
                <div className="w-60 max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border-0 bg-[#F5F5F5] py-1.5 pr-10 pl-3 text-gray-900 placeholder:text-gray-400 placeholder:font-[400] bg-gray-100 sm:text-xs sm:leading-6 outline-none"
                      placeholder="What are you looking for?"
                      type="search"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <MagnifyingGlassIcon
                        className="h-5 w-5 text-black"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Wishlist</span>
                  <Heart
                    strokeWidth={1.5}
                    className="h-6 w-6 text-black"
                    aria-hidden="true"
                  />
                </button>

                <a
                  href="/cart"
                  className="relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Cart</span>
                  <ShoppingCart
                    strokeWidth={1.5}
                    className="h-6 w-6 text-black"
                    aria-hidden="true"
                  />
                  {cartCount > 0 && (
                    <span className="text-xs font-medium text-gray-700 bg-gray-200 py-0.5 px-1.5 rounded-full absolute top-[-4px] right-[-7px]">
                      {cartCount}
                    </span>
                  )}
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
