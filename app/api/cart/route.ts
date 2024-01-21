import { NextRequest, NextResponse } from 'next/server';

const data = require('../../../utils/data/data.json');

export async function GET(req: NextRequest) {
  try {
    // Accessing URL parameter
    const { searchParams } = new URL(req?.url);

    // Get queries
    const cuid = searchParams?.get("cuid") || 0;

    // Find the user's cart based on cuid
    const userCart = data.cart.find((item: { cuid: string }) => item.cuid === cuid);

    if (userCart) {
      // Return the user's cart as a JSON response with a status of 200 OK.
      return NextResponse.json(userCart, {
        status: 200,
      });
    } else {
      // If user's cart is not found, return a JSON response with a status of 404 Not Found.
      return NextResponse.json({ success: false, message: 'User cart not found' }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    // Return a JSON response with a status of 500 Internal Server Error in case of an error.
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
