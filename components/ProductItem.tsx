import { CURRENCY } from "@/utils/CONSTANTS";
import { Product } from "@/utils/interfaces";
import { classNames } from "@/utils/utils";
import { StarIcon } from "@heroicons/react/20/solid";
import { Eye, Heart } from "lucide-react";

type ProductItemInterface = {
    product: Product
}

export const ProductItem = ({product} : ProductItemInterface) => {
  return (
    <div className="group relative">
      <div className="w-full overflow-hidden rounded-md bg-gray-100 relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-[180px] group-hover:opacity-75 mx-auto"
        />
        <span className="absolute top-0 left-0 m-4 px-2 py-1 bg-[#DB4444] text-white rounded text-xs">
          -{Math.ceil(product?.discountPercentage)}%
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
          <a href={`/product/${product.id}`}>
            <span className="absolute inset-0" />
            {product.title}
          </a>
        </h3>
        <div className="flex">
          <p className="mt-1 text-gray-900 text-sm font-semibold">
            {CURRENCY}
            {Math.floor(
              product.price -
                (product.price * product?.discountPercentage) / 100
            )}
          </p>
          <p className="mt-1 text-gray-400 ml-2 line-through text-sm">
            {CURRENCY}
            {Math.floor(product.price)}
          </p>
        </div>
        <div className="mt-1 flex items-center">
          <p className="sr-only">{product.rating} out of 5 stars</p>
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  product.rating > rating ? "text-yellow-400" : "text-gray-200",
                  "h-4 w-4 flex-shrink-0"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 ml-2">
            ({Math.floor(product.rating * 16)})
          </p>
        </div>
      </div>
    </div>
  );
};
