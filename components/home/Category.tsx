import { ArrowLeft, ArrowRight, Computer, GamepadIcon, Headphones, Monitor, Shirt, Smartphone, Watch } from "lucide-react";
import { CategoryItem } from "../CategoryItem";

const categories = [
  {
    id: 1,
    name: "Phones",
    icon: <Smartphone strokeWidth={1} className="w-12 h-12" />,
    href: "",
  },
  {
    id: 2,
    name: "Computers",
    icon: <Monitor strokeWidth={1} className="w-12 h-12" />,
    href: "",
  },
  {
    id: 3,
    name: "Watches",
    icon: <Watch strokeWidth={1} className="w-12 h-12" />,
    href: "",
  },
  {
    id: 4,
    name: "Shirts",
    icon: <Shirt strokeWidth={1} className="w-12 h-12" />,
    href: "",
  },
  {
    id: 5,
    name: "Headphones",
    icon: <Headphones strokeWidth={1} className="w-12 h-12" />,
    href: "",
  },
  {
    id: 6,
    name: "Gaming",
    icon: <GamepadIcon strokeWidth={1} className="w-12 h-12" />,
    href: "",
  },
];

export default function Category() {
  return (
    <div className="bg-white mt-2">
      <div className="py-8 sm:py-12 lg:mx-auto lg:max-w-7xl lg:px-8">
        <div className="flex items-center">
          <span className="w-4 h-8 bg-[#DB4444] rounded"></span>
          <span className="text-md text-[#DB4444] ml-3 font-semibold">
            Categories
          </span>
        </div>
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0 mt-5">
          <div className="flex items-end">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900">
              Browse by Category
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
              className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-x-8 lg:space-x-0"
            >
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="inline-flex flex-col text-center lg:w-auto"
                >
                  <CategoryItem category={category} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
