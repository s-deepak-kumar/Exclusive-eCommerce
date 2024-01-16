"use client"

import { Disclosure } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Heart, ShoppingCart } from 'lucide-react'

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="flex h-20 justify-between pt-4">
              <div className="flex px-2 lg:px-0 gap-6 items-center">
                <div className="flex flex-shrink-0 items-center">
                  <h2 className='text-xl text-black font-bold'>Exclusive</h2>
                </div>
                <div className="lg:ml-6 lg:flex lg:space-x-6 h-max">
                  <a
                    href="#"
                    className="inline-flex items-center border-b-2 border-gray-500 px-1 py-1 text-sm font-medium text-black"
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center border-b-2 border-transparent px-1 py-1 text-sm font-medium text-black hover:border-gray-300 hover:text-gray-700"
                  >
                    Contact
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center border-b-2 border-transparent px-1 py-1 text-sm font-medium text-black hover:border-gray-300 hover:text-gray-700"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center border-b-2 border-transparent px-1 py-1 text-sm font-medium text-black hover:border-gray-300 hover:text-gray-700"
                  >
                    Signup
                  </a>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border-0 bg-white py-1.5 pr-10 pl-3 text-gray-900 placeholder:text-gray-400 bg-[#F5F5F5] sm:text-xs sm:leading-6 outline-none"
                      placeholder="What are you looking for?"
                      type="search"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <MagnifyingGlassIcon className="h-5 w-5 text-black" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center gap-4">
                <button
                  type="button"
                  className="relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Wishlist</span>
                  <Heart className="h-6 w-6 text-black" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  className="relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Cart</span>
                  <ShoppingCart className="h-6 w-6 text-black" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}
