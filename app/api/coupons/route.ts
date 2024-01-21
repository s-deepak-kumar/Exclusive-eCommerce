import { NextRequest, NextResponse } from 'next/server';

const data = require('../../../utils/data/data.json');

export async function GET(req: NextRequest) {
  try {
    // Accessing URL parameter
    const { searchParams } = new URL(req?.url);

    // Get queries
    const cuid = searchParams?.get("cuid") || 0;

    // Find the coupons based on cuid
    const couponCategory = data.coupons.find((item: { cuid: string }) => item.cuid === cuid);

    if (couponCategory) {
      // Check if any active coupon exists in the category
      const activeCoupons = couponCategory.coupons.filter((coupon: { active: boolean }) => coupon.active);

      if (activeCoupons.length > 0) {
        // Return the active coupons as a JSON response with a status of 200 OK.
        return NextResponse.json({coupons: activeCoupons}, {
          status: 200,
        });
      } else {
        // If no active coupon is found, return a JSON response with a status of 404 Not Found.
        return NextResponse.json({ success: false, message: 'No active coupons found' }, { status: 404 });
      }
    } else {
      // If the coupon category is not found, return a JSON response with a status of 404 Not Found.
      return NextResponse.json({ success: false, message: 'Coupon category not found' }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    // Return a JSON response with a status of 500 Internal Server Error in case of an error.
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
