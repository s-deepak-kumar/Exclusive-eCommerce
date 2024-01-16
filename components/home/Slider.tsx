import { MoveRight } from "lucide-react";
import React from "react";
import Slider from "react-slick";

const Slider_ = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
  };

  return (
    <div className="flex-1 py-8">
      <Slider {...sliderSettings}>
        <div>
          <div className="flex items-center justify-between group h-[320px] w-full bg-black gap-6 px-4">
            <div className="px-8">
              <h3 className="font-[200] text-white flex items-center font-xs">
                <img src="/ic_apple.png" className="h-[40px] mr-4" /> iPhone 14
                Series
              </h3>
              <p className="text-4xl text-white font-[500] mt-4">
                Up to 10% off Voucher
              </p>
              <div
                aria-hidden="true"
                className="mt-4 text-sm text-white flex items-center"
              >
                <a href="#" className="border-b-[1px] py-2">Shop Now</a> <MoveRight className="ml-4" />
              </div>
            </div>
            <div className="w-max">
              <img src="/slider_1.png" alt="" className="h-[300px]" />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Slider_;
