"use client";
import { Disclosure } from "@headlessui/react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { X } from "lucide-react";

const subtotal = "$210.00";
const discount = { code: "UNIBLIX", amount: "$24.00" };
const taxes = "$23.68";
const shipping = "$22.00";
const total = "$341.68";
const products = [
  {
    id: 1,
    name: "Micro Backpack",
    href: "#",
    price: "$70.00",
    color: "Moss",
    size: "5L",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg",
    imageAlt:
      "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
  },
  {
    id: 1,
    name: "Micro Backpack",
    href: "#",
    price: "$70.00",
    color: "Moss",
    size: "5L",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg",
    imageAlt:
      "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
  },
  {
    id: 1,
    name: "Micro Backpack",
    href: "#",
    price: "$70.00",
    color: "Moss",
    size: "5L",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg",
    imageAlt:
      "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
  },
  {
    id: 1,
    name: "Micro Backpack",
    href: "#",
    price: "$70.00",
    color: "Moss",
    size: "5L",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg",
    imageAlt:
      "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
  },
];

export default function Checkout() {
  return (
    <div className="lg:flex lg:min-h-full lg:overflow-hidden mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8 gap-16">
      <div className="mx-auto w-full">
        <span className="text-gray-400 text-sm font-[300]">
          Account / My Account / Product / Cart
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          / Checkout
        </h1>

        <h1 className="text-2xl font-[400] tracking-tight text-gray-900 sm:text-2xl mt-12">
          Billing Details:
        </h1>

        <form className="mt-6 space-y-4">
          <div className="col-span-full">
            <label
              htmlFor="name-on-card"
              className="block text-sm text-gray-700"
            >
              Full Name *
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="name-on-card"
                name="name-on-card"
                autoComplete="cc-name"
                placeholder="Ravi Shankar"
                className="block w-full rounded bg-[#F5F5F5] p-2 shadow-sm sm:text-sm"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="name-on-card"
              className="block text-sm text-gray-700"
            >
              Company Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="name-on-card"
                name="name-on-card"
                autoComplete="cc-name"
                placeholder="Uniblox"
                className="block w-full rounded bg-[#F5F5F5] p-2 shadow-sm sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-4 gap-y-6">
            <div className="col-span-full">
              <label
                htmlFor="email-address"
                className="block text-sm text-gray-700"
              >
                Phone Number *
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email-address"
                  name="email-address"
                  placeholder="8757210196"
                  autoComplete="email"
                  className="block w-full rounded bg-[#F5F5F5] p-2 shadow-sm sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-4 gap-y-6">
            <div className="col-span-full">
              <label
                htmlFor="email-address"
                className="block text-sm text-gray-700"
              >
                Email address *
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email-address"
                  name="email-address"
                  placeholder="exclusive@gmail.com"
                  autoComplete="email"
                  className="block w-full rounded bg-[#F5F5F5] p-2 shadow-sm sm:text-sm"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="name-on-card"
                className="block text-sm text-gray-700"
              >
                Street Address *
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name-on-card"
                  name="name-on-card"
                  autoComplete="cc-name"
                  placeholder="Ravi Shankar"
                  className="block w-full rounded bg-[#F5F5F5] p-2 shadow-sm sm:text-sm"
                />
              </div>
            </div>

            <div className="col-span-full sm:col-span-4">
              <label htmlFor="city" className="block text-sm text-gray-700">
                City *
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="city"
                  name="city"
                  autoComplete="address-level2"
                  className="block w-full rounded bg-[#F5F5F5] p-2 shadow-sm sm:text-sm"
                />
              </div>
            </div>

            <div className="col-span-full sm:col-span-4">
              <label htmlFor="region" className="block text-sm text-gray-700">
                State / Province *
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="region"
                  name="region"
                  autoComplete="address-level1"
                  className="block w-full rounded bg-[#F5F5F5] p-2 shadow-sm sm:text-sm"
                />
              </div>
            </div>

            <div className="col-span-full sm:col-span-4">
              <label
                htmlFor="postal-code"
                className="block text-sm text-gray-700"
              >
                Postal code *
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="postal-code"
                  name="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded bg-[#F5F5F5] p-2 shadow-sm sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex space-x-2">
            <div className="flex h-5 items-center">
              <input
                id="same-as-shipping"
                name="same-as-shipping"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-gray-300 text-[#DB4444] bg-[#DB4444]"
              />
            </div>
            <label htmlFor="same-as-shipping" className="text-sm text-gray-900">
              Save this information for faster check-out next time
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded border border-transparent bg-[#DB4444] px-4 py-3 text-sm font-medium text-white shadow-sm"
          >
            Pay {total}
          </button>

          <p className="mt-6 flex justify-center text-xs text-gray-500 italic">
                Currently we're only supports Cash on Delivery
              </p>
        </form>
      </div>
      {/* Order summary */}
      <div className="w-full max-w-md flex-col border-[1px] rounded border-black lg:flex overflow-hidden">
        <h2 id="summary-heading" className="sr-only">
          Order summary
        </h2>

        <ul
          role="list"
          className="flex-auto divide-y divide-gray-200 overflow-y-auto px-6 max-h-[500px]"
        >
          {products.map((product) => (
            <li key={product.id} className="flex space-x-6 py-3 relative">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-20 w-20 flex-none rounded-md bg-gray-200 object-cover object-center"
              />
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-1 text-sm font-medium">
                  <h3 className="text-gray-900">{product.name}</h3>
                  <p className="text-gray-900">{product.price}</p>
                    <p className="text-gray-500">{product.color}</p>
                </div>
                <div className="absolute right-0 top-0">
                  <button
                    type="button"
                    className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Remove</span>
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-50 p-6">
          <form>
            <label
              htmlFor="discount-code"
              className="block text-sm font-medium text-gray-700"
            >
              Discount code
            </label>
            <div className="mt-1 flex space-x-4">
              <input
                type="text"
                id="discount-code"
                name="discount-code"
                placeholder="UNIBLIX"
                className="block w-full rounded bg-gray-300 p-2 sm:text-sm outline-none"
              />
              <button
                type="submit"
                className="rounded-md bg-[#DB4444] px-4 text-sm text-white"
              >
                Apply
              </button>
            </div>
          </form>

          <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="text-gray-900">{subtotal}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="flex">
                Discount
                <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">
                  {discount.code}
                </span>
              </dt>
              <dd className="text-gray-900">-{discount.amount}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Taxes</dt>
              <dd className="text-gray-900">{taxes}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd className="text-gray-900">{shipping}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
              <dt className="text-base">Total</dt>
              <dd className="text-base">{total}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
