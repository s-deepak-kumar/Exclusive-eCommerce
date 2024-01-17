export default function NewArrivals() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex items-center">
          <span className="w-4 h-8 bg-[#DB4444] rounded"></span>
          <span className="text-sm text-[#DB4444] ml-3 font-semibold">
            Featured
          </span>
        </div>
        <div className="mt-4">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900">
            New Arrivals
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
          <div className="group overflow-hidden rounded sm:relative sm:row-span-2 bg-black h-[520px] flex justify-center">
            <img
              src="/ps5-slim-goedkope-playstation_large.png"
              alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
              className="object-cover object-center group-hover:opacity-75 sm:absolute bottom-0 h-[470px]"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50"
            />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div className="w-max mr-72">
                <h3 className="text-xl font-[500] text-white">
                  <a href="#">
                    <span className="absolute inset-0" />
                    PlayStation 5
                  </a>
                </h3>
                <p className="text-white text-sm font-[200] mt-4">
                  Black and White version of the PS5 coming out on sale.
                </p>
                <div className="mt-4">
                  <a
                    href="#"
                    className="text-sm text-white border-b-[1px] py-1"
                  >
                    Shop now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="group overflow-hidden rounded sm:relative sm:h-full bg-black">
            <img
              src="/attractive-woman-wearing-hat-posing-black-background.png"
              alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
              className="object-cover object-center group-hover:opacity-75 sm:absolute h-[240px] right-0 bottom-0"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div className="mr-72">
                <h3 className="text-xl font-[500] text-white">
                  <a href="#">
                    <span className="absolute inset-0" />
                    Women's Collections
                  </a>
                </h3>
                <p className="text-white text-sm font-[200] mt-3">
                  Featured woman collections that give you another vibe.
                </p>
                <div className="mt-3">
                  <a
                    href="#"
                    className="text-sm text-white border-b-[1px] py-1"
                  >
                    Shop now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full sm:gap-8">
            <div className="group overflow-hidden rounded sm:relative sm:h-full bg-black flex-1 flex items-center justify-center">
              <div className="bg-[#D9D9D9] bg-opacity-40 backdrop-filter rounded-full h-[180px] w-[180px] blur-2xl absolute" />
              <img
                src="/speakers.png"
                alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
                className="object-cover object-center group-hover:opacity-75 sm:absolute h-[180px]"
              />
              <div
                aria-hidden="true"
                className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
              />
              <div className="flex items-end p-6 sm:absolute sm:inset-0">
                <div className="">
                  <h3 className="text-xl font-[500] text-white">
                    <a href="#">
                      <span className="absolute inset-0" />
                      Speakers
                    </a>
                  </h3>
                  <p className="text-white text-sm font-[200] mt-1">
                    Amazon wireless speakers
                  </p>
                  <div className="mt-1">
                    <a
                      href="#"
                      className="text-sm text-white border-b-[1px] py-1"
                    >
                      Shop now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="group overflow-hidden rounded sm:relative sm:h-full bg-black flex-1 flex items-center justify-center">
              <div className="bg-[#D9D9D9] bg-opacity-40 backdrop-filter rounded-full h-[180px] w-[180px] blur-2xl absolute" />
              <img
                src="/gucci-perfume.png"
                alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
                className="object-cover object-center group-hover:opacity-75 sm:absolute h-[180px]"
              />
              <div
                aria-hidden="true"
                className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
              />
              <div className="flex items-end p-6 sm:absolute sm:inset-0">
                <div className="">
                  <h3 className="text-xl font-[500] text-white">
                    <a href="#">
                      <span className="absolute inset-0" />
                      Perfume
                    </a>
                  </h3>
                  <p className="text-white text-sm font-[200] mt-1">
                    GUCCI INTENSE OUD EDP
                  </p>
                  <div className="mt-1">
                    <a
                      href="#"
                      className="text-sm text-white border-b-[1px] py-1"
                    >
                      Shop now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
