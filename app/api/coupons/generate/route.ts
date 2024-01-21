import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
const dataPath = join(process.cwd(), "utils", "data", "data.json");

import data from "../../../../utils/data/data.json";
import { COUPON_GENERATION_ORDER_COUNT } from "@/utils/CONSTANTS";

// export async function POST(req: NextRequest) {
//   try {
//     // Parse the request body to get the number of coupons to generate
//     const { cuid } = await req.json();

//     // Check if the user has existing orders
//     const userOrderIndex = data.orders.findIndex(
//       (order) => order.cuid === cuid
//     );

//     if (
//       (data?.orders[userOrderIndex]?.orders?.length ?? 0) %
//         COUPON_GENERATION_ORDER_COUNT ===
//       0
//     ) {
//       // Check if the cuid already exists in the coupons data
//       const existingCoupons = data.coupons.find(
//         (category) => category.cuid === cuid
//       );

//       const newCoupon = generateCoupon(cuid);

//       if (existingCoupons) {
//         // If cuid already exists, push new coupons into it
//         existingCoupons.coupons.push(newCoupon);
//       } else {
//         // If cuid does not exist, create a new entry
//         data.coupons.push({
//           cuid,
//           coupons: [newCoupon],
//         });
//       }
//     }

//     // Save the updated data back to the JSON file or your data store
//     // For simplicity, let's assume writing to the JSON file directly
//     // In a real-world scenario, consider using a database or other data store
//     require("fs").writeFileSync(dataPath, JSON.stringify(data, null, 2));

//     // Return success response
//     return NextResponse.json(
//       { success: true, message: "Coupons generated and saved successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error generating coupons:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

export const generateCoupon = (cuid: string) => {
  // Extract the names of active coupons
  const activeCouponNames = data.coupons.reduce((names, category) => {
    category.coupons.forEach((coupon) => {
      if (coupon.active) {
        names.add(coupon.code);
      }
    });
    return names;
  }, new Set<string>());

  // Add the generated coupon to the data
  const newCoupon = {
    code: generateRandomCoupon(activeCouponNames),
    active: true,
    generated_at: new Date().toISOString(),
    applied_at: "",
  };

  return newCoupon;
};

function generateRandomCoupon(activeCouponNames: Set<string>) {
  const randomWords = [
    "SPECIAL",
    "SAVINGS",
    "DISCOUNT",
    "OFFER",
    "DEAL",
    "EXCLUSIVE",
    "SALE",
    "BARGAIN",
    "PROMO",
    "CODE",
    "VALUE",
    "REWARD",
    "LIMITED",
    "CLEARANCE",
    "MARKDOWN",
    "BONUS",
    "GIFT",
    "VIP",
    "FLASH",
    "FREE",
    "ULTIMATE",
    "PREMIUM",
    "TOP",
    "CHOICE",
    "BEST",
    "SELECT",
    "PRIME",
    "ELITE",
    "SUPER",
    "MAGIC",
    "MUSTHAVE",
    "FABULOUS",
    "EPIC",
    "GRABNOW",
    "HOTDEAL",
    "WINNER",
    "DELUXE",
    "FANTASTIC",
    "AMAZING",
  ];

  let coupon;
  do {
    const randomWord =
      randomWords[Math.floor(Math.random() * randomWords.length)];
    const randomNumber = Math.floor(Math.random() * 90 + 10);
    coupon = `UNIBLOX${randomWord}${randomNumber}`;
  } while (activeCouponNames.has(coupon));

  return coupon;
}
