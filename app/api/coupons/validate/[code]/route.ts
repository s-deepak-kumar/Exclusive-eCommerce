import couponsData from '../../../../../utils/data/data.json';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params } : any) {
  try {
    const { code } = params;

    // Accessing URL parameter
    const { searchParams } = new URL(req?.url);

    // Get queries
    const cuid = searchParams?.get("cuid") || 0;

    if (!cuid || !code || typeof cuid !== 'string' || typeof code !== 'string') {
      return NextResponse.json({ success: false, message: 'Invalid parameters' }, {
        status: 400,
      });
    }

    // Find the coupon with the given cuid and code
    const userCoupons = couponsData.coupons.find((userCoupon) => userCoupon.cuid === cuid);

    if (!userCoupons) {
      return NextResponse.json({ success: false, message: 'User don\'t have coupons' }, {
        status: 404,
      });
    }

    const coupon = userCoupons.coupons.find((coupon) => coupon.code === code);

    if (!coupon) {
      return NextResponse.json({ success: false, message: 'Coupon not found for the user' }, {
        status: 404,
      });
    }

    if (!coupon.active) {
      return NextResponse.json({ success: false, message: 'Coupon is not active' }, {
        status: 410,
      });
    }

    // Coupon is found and active, validation is successful
    return NextResponse.json({ success: true, message: 'Coupon is valid' }, {
      status: 200,
    });
  } catch (error) {
    console.error('Error validating coupon:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, {
      status: 500,
    });
  }
}
