import React from "react";

const Coupon = ({ coupon, appliedCoupon, onApply }: any) => {
  // Check if the coupon is applied
  const isCouponApplied = coupon.code === appliedCoupon;

  return (
    <div className={`flex bg-gray-100 h-24 rounded-lg mx-auto overflow-hidden items-center gap-4 ${isCouponApplied ? 'opacity-50' : ''}`}>
      {/* Left Section - "Flat Off" (Vertical) */}
      <div className="text-left h-24 bg-[#DB4444] flex items-center justify-center px-1">
        <p
          className="text-lg font-bold text-white"
          style={{ writingMode: "vertical-rl" }}
        >
          Flat Off
        </p>
      </div>

      {/* Center Section - Coupon Code & "Get flat 30" */}
      <div className="flex-1">
        <div className="inline-block">
          <span className="text-2xl font-bold uppercase">{coupon.code}</span>
        </div>
        <p className="mt-2 text-gray-600 text-sm ">
          Get flat 10% off on the total cart value.
        </p>
      </div>

      {/* Right Section - Apply Button */}
      <div className="h-full">
        <button
          className={`text-[#DB4444] text-md font-semibold my-2 mx-4 disabled:text-gray-500 ${isCouponApplied ? 'cursor-not-allowed' : ''}`}
          onClick={onApply}
          disabled={isCouponApplied}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default Coupon;