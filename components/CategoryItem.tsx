type CategoryItemInterface = {
  category: any;
};

export const CategoryItem = ({ category }: CategoryItemInterface) => {
  return (
    <div className="group relative">
      <div className="w-full overflow-hidden rounded bg-transparent border-[1px] border-gray-400 h-[150px] text-center flex flex-col justify-center items-center group-hover:bg-[#DB4444] group-hover:text-white cursor-pointer">
        {category.icon}
        <h3 className="mt-4 font-[400] text-md">
          <a href={category.href}>
            <span className="absolute inset-0" />
            {category.name}
          </a>
        </h3>
      </div>
    </div>
  );
};
