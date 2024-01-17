import { classNames } from "@/utils/utils";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Heart,
  Star,
  StarIcon,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Machined Pen",
    color: "Black",
    price: "$35",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg",
    imageAlt:
      "Black machined steel pen with hexagonal grip and small white logo at top.",
    availableColors: [
      { name: "Black", colorBg: "#111827" },
      { name: "Brass", colorBg: "#FDE68A" },
      { name: "Chrome", colorBg: "#E5E7EB" },
    ],
    rating: 4,
    reviewCount: 14,
  },
  {
    id: 1,
    name: "Machined Pen",
    color: "Black",
    price: "$35",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg",
    imageAlt:
      "Black machined steel pen with hexagonal grip and small white logo at top.",
    availableColors: [
      { name: "Black", colorBg: "#111827" },
      { name: "Brass", colorBg: "#FDE68A" },
      { name: "Chrome", colorBg: "#E5E7EB" },
    ],
    rating: 4,
    reviewCount: 14,
  },
  {
    id: 1,
    name: "Machined Pen",
    color: "Black",
    price: "$35",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg",
    imageAlt:
      "Black machined steel pen with hexagonal grip and small white logo at top.",
    availableColors: [
      { name: "Black", colorBg: "#111827" },
      { name: "Brass", colorBg: "#FDE68A" },
      { name: "Chrome", colorBg: "#E5E7EB" },
    ],
    rating: 4,
    reviewCount: 14,
  },
  {
    id: 1,
    name: "Machined Pen",
    color: "Black",
    price: "$35",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg",
    imageAlt:
      "Black machined steel pen with hexagonal grip and small white logo at top.",
    availableColors: [
      { name: "Black", colorBg: "#111827" },
      { name: "Brass", colorBg: "#FDE68A" },
      { name: "Chrome", colorBg: "#E5E7EB" },
    ],
    rating: 4,
    reviewCount: 14,
  },
  {
    id: 1,
    name: "Machined Pen",
    color: "Black",
    price: "$35",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg",
    imageAlt:
      "Black machined steel pen with hexagonal grip and small white logo at top.",
    availableColors: [
      { name: "Black", colorBg: "#111827" },
      { name: "Brass", colorBg: "#FDE68A" },
      { name: "Chrome", colorBg: "#E5E7EB" },
    ],
    rating: 4,
    reviewCount: 14,
  },
];

export default function BestSellingItems() {
  return (
    <div className="bg-white mt-2">
      <div className="py-8 sm:py-12 lg:mx-auto lg:max-w-7xl lg:px-8">
        <div className="flex items-center">
          <span className="w-4 h-8 bg-[#DB4444] rounded"></span>
          <span className="text-sm text-[#DB4444] ml-3 font-semibold">
            This Month
          </span>
        </div>
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0 mt-4">
          <div className="flex items-end">
            <h2 className="text-4xl font-[500] tracking-tight text-gray-900">
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

        <div className="relative mt-8">
          <div className="relative -mb-6 w-full overflow-x-auto pb-6">
            <ul
              role="list"
              className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:space-x-0"
            >
              {products.map((product) => (
                <li
                  key={product.id}
                  className="inline-flex flex-col text-center lg:w-auto"
                >
                  <div className="group relative">
                    <div className="w-full overflow-hidden rounded-md bg-gray-100 relative">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="max-h-[180px] group-hover:opacity-75 mx-auto"
                      />
                      <span className="absolute top-0 left-0 m-4 px-2 py-1 bg-[#DB4444] text-white rounded text-xs">
                        -40%
                      </span>
                      <div className="absolute top-0 right-0 m-4">
                        <Heart className="w-8 h-8 bg-white text-black rounded-full p-2" />
                        <Eye className="w-8 h-8 bg-white text-black rounded-full p-2 mt-2" />
                      </div>
                      <div className="w-full bg-black py-2 text-white text-sm cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-0">
                        Add to Cart
                      </div>
                    </div>
                    <div className="mt-3 text-left">
                      <h3 className="mt-1 font-[500] text-gray-900 text-sm">
                        <a href={product.href}>
                          <span className="absolute inset-0" />
                          {product.name}
                        </a>
                      </h3>
                      <div className="flex">
                        <p className="mt-1 text-gray-900 text-sm">
                          {product.price}
                        </p>
                        <p className="mt-1 text-gray-400 ml-4 line-through text-sm">
                          {product.price}
                        </p>
                      </div>
                      <div className="mt-1 flex items-center">
                        <p className="sr-only">
                          {product.rating} out of 5 stars
                        </p>
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <Star
                              key={rating}
                              className={classNames(
                                product.rating > rating
                                  ? "text-yellow-400"
                                  : "text-gray-200",
                                "h-4 w-4 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 ml-2">
                          ({product.reviewCount})
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}