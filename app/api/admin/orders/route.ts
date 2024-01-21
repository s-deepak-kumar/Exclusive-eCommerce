import { NextRequest, NextResponse } from 'next/server';
import data from '../../../../utils/data/data.json';

export async function GET(req: NextRequest) {
  try {

    // Fetch all orders from the "orders" array
    const allOrders = data.orders;

    // Return the orders as a JSON response with a status of 200 OK
    return NextResponse.json({ success: true, orders: allOrders }, { status: 200 });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    // Return a JSON response with a status of 500 Internal Server Error in case of an error
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
