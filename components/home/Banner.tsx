export default function Banner() {
  return (
    <div className="bg-white mt-2">
      <div className="py-8 sm:py-12 lg:mx-auto lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between group h-[500px] w-full bg-black gap-6 px-8">
          <div className="px-12">
            <h3 className="font-semibold text-[#00FF66] flex items-center font-xs">
              Categories
            </h3>
            <p className="text-4xl text-white font-[600] mt-6">
            Enhance Your Music Experience
            </p>
            <div className="text-black flex mt-8 gap-4">
              <div className="flex flex-col w-14 h-14 bg-white items-center justify-center rounded-full">
                <span className="text-md font-bold">03</span>
                  <span className="text-[9px] font-[500]">Days</span>
              </div>
              <div className="flex flex-col w-14 h-14 bg-white items-center justify-center rounded-full">
                <span className="text-md font-bold">03</span>
                  <span className="text-[9px] font-[500]">Hours</span>
              </div>
              <div className="flex flex-col w-14 h-14 bg-white items-center justify-center rounded-full">
                <span className="text-md font-bold">03</span>
                  <span className="text-[9px] font-[500]">Minutes</span>
              </div>
              <div className="flex flex-col w-14 h-14 bg-white items-center justify-center rounded-full">
                <span className="text-md font-bold">03</span>
                  <span className="text-[9px] font-[500]">Seconds</span>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="mt-8 text-sm text-white flex items-center"
            >
              <a href="#" className="bg-[#00FF66] py-2 px-3 rounded text-white text-semibold">
                Shop Now!
              </a>
            </div>
          </div>
          <div className="w-max relative flex items-center justify-center">
            <div className="bg-[#D9D9D9] bg-opacity-40 backdrop-filter rounded-full h-[390px] w-[390px] blur-2xl absolute" />
            <img src="/jbl_speaker.png" alt="" className="w-[1000px] z-[999]" />
          </div>
        </div>
      </div>
    </div>
  );
}
