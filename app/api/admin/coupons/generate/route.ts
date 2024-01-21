import { NextRequest, NextResponse } from "next/server";

import { join } from "path";
const dataPath = join(process.cwd(), "utils", "data", "data.json");

import data from "../../../../../utils/data/data.json";
import { generateCoupon } from "@/utils";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body to get the number of coupons to generate
    const { cuid } = await req.json();

    // Check if the cuid already exists in the coupons data
    const existingCoupons = data.coupons.find(
      (category) => category.cuid === cuid
    );

    // Extract the names of active coupons
  const activeCouponNames = data.coupons.reduce((names, category) => {
    category.coupons.forEach((coupon) => {
      if (coupon.active) {
        names.add(coupon.code);
      }
    });
    return names;
  }, new Set<string>());

    const newCoupon = generateCoupon(cuid, activeCouponNames);

    if (existingCoupons) {
      // If cuid already exists, push new coupons into it
      existingCoupons.coupons.push(newCoupon);
    } else {
      // If cuid does not exist, create a new entry
      data.coupons.push({
        cuid,
        coupons: [newCoupon],
      });
    }

    // Save the updated data back to the JSON file or your data store
    // For simplicity, let's assume writing to the JSON file directly
    // In a real-world scenario, consider using a database or other data store
    require("fs").writeFileSync(dataPath, JSON.stringify(data, null, 2));

    // Return success response
    return NextResponse.json(
      { success: true, message: "Coupons generated and saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating coupons:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
