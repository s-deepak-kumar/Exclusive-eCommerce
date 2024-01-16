import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Phones",
    imageAlt: "",
    imageSrc: "/category_phones.png",
    href: ""
  },
];

export default function Category() {
  return (
    <div className="bg-white mt-4">
      <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8">
        <div className="flex items-center">
          <span className="w-4 h-8 bg-[#DB4444] rounded"></span>
          <span className="text-sm text-[#DB4444] ml-3 font-semibold">
            Categories
          </span>
        </div>
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0 mt-4">
          <div className="flex items-end">
            <h2 className="text-4xl font-[500] tracking-tight text-gray-900">
              Browse by Category
            </h2>
          </div>

          <div className="flex">
            <a
              href="#"
              className="hidden text-sm font-[400] text-black bg-gray-100 p-1.5 rounded-full sm:block"
            >
              <span aria-hidden="true">
                {" "}
                <ArrowLeft />
              </span>
            </a>
            <a
              href="#"
              className="hidden text-sm font-[400] text-black bg-gray-100 p-1.5 rounded-full sm:block ml-2"
            >
              <span aria-hidden="true">
                {" "}
                <ArrowRight />{" "}
              </span>
            </a>
          </div>
        </div>

        <div className="relative mt-8">
          <div className="relative -mb-6 w-full overflow-x-auto pb-6">
            <ul
              role="list"
              className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-x-8 lg:space-x-0"
            >
              {products.map((product) => (
                <li
                  key={product.id}
                  className="inline-flex flex-col text-center lg:w-auto"
                >
                  <div className="group relative">
                    <div className="w-full overflow-hidden rounded-md bg-transparent border-[1px] border-black h-[150px] text-center flex flex-col justify-center items-center group-hover:bg-[#DB4444] group-hover:text-white cursor-pointer">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="max-h-[90px] mx-auto"
                      />
                      <h3 className="mt-4 font-[400] text-sm">
                        <a href={product.href}>
                          <span className="absolute inset-0" />
                          {product.name}
                        </a>
                      </h3>
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
