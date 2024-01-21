import { NextRequest, NextResponse } from "next/server";

import { join } from "path";
const dataPath = join(process.cwd(), "utils", "data", "data.json");

import data from "../../../utils/data/data.json";
import { generateCoupon } from "../coupons/generate/route";
import { COUPON_GENERATION_ORDER_COUNT } from "@/utils/CONSTANTS";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body to get checkout information
    const {
      email,
      first_name,
      last_name,
      company,
      street_address,
      apartment,
      city,
      state,
      postal_code,
      phone,
      save_information,
      products,
      coupon_applied,
      total_amount,
      shipping_charge,
      discounted_amount,
      tax_amount,
      cuid,
      purchased_amount,
      purchased_at,
    } = await req.json();

    if (
      !products ||
      !Array.isArray(products) ||
      !cuid ||
      typeof cuid !== "string"
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 }
      );
    }

    if (save_information) {
      // Check if the user exists in the "users" array
      const userIndex = data.users.findIndex((user) => user.cuid === cuid);

      const userInfo = {
        email: email,
        first_name: first_name,
        last_name: last_name,
        company: company,
        address: {
          street_address: street_address,
          apartment: apartment,
          city: city,
          state: state,
          postal_code: postal_code,
        },
        phone: phone,
      };

      if (userIndex !== -1) {
        // User exists, update the user data
        data.users[userIndex] = { ...data.users[userIndex], ...userInfo };
      } else {
        // User does not exist, add a new user
        data.users.push({ cuid: cuid, ...userInfo });
      }
    }

    // Save checkout information in the "orders" array
    const newOrder = {
      cuid,
      products,
      coupon_applied,
      total_amount,
      shipping_charge,
      discounted_amount,
      tax_amount,
      purchased_amount,
      purchased_at,
      address: {
        street_address,
        apartment,
        city,
        state,
        postal_code,
      },
      phone,
      payment_method: "Cash on Delivery",
    };

    // Check if the user has existing orders
    const userOrderIndex = data.orders.findIndex(
      (order) => order.cuid === cuid
    );

    if (userOrderIndex !== -1) {
      // User has existing orders, update the orders array
      data.orders[userOrderIndex]?.orders?.push(newOrder);
    } else {
      // User does not have existing orders, add a new order entry
      data.orders.push({ cuid, orders: [newOrder] });
    }

    // Find and update the applied coupon in the "coupons" array
    data.coupons.forEach((couponCategory) => {
      couponCategory.coupons.forEach((coupon) => {
        if (coupon.code === coupon_applied && coupon.active) {
          coupon.active = false;
          coupon.applied_at = new Date().toISOString();
        }
      });
    });

    // Empty the cart related to the user
    const userCartIndex = data.cart.findIndex(
      (cartItem) => cartItem.cuid === cuid
    );

    if (userCartIndex !== -1) {
      // User cart found, empty the cart
      data.cart[userCartIndex].products = [];
    }

    if ((data?.orders[userOrderIndex]?.orders?.length ?? 0) % Number(COUPON_GENERATION_ORDER_COUNT) === 0) {
      // Check if the cuid already exists in the coupons data
      const existingCoupons = data.coupons.find(
        (category) => category.cuid === cuid
      );

      const newCoupon = generateCoupon(cuid);

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
    }

    // Save the updated data back to the JSON file or your data store
    // For simplicity, let's assume writing to the JSON file directly
    // In a real-world scenario, consider using a database or other data store
    require("fs").writeFileSync(dataPath, JSON.stringify(data, null, 2));

    // Return success response
    return NextResponse.json(
      { success: true, message: "Checkout information saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing checkout:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
