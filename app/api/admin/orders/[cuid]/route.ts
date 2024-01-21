import { NextRequest, NextResponse } from "next/server";
import data from "../../../../../utils/data/data.json";

export async function GET(req: NextRequest, { params }: any) {
  try {
    const { cuid } = params;

    if (!cuid) {
      // If cuid is not provided, return a JSON response with a status of 400 Bad Request
      return NextResponse.json(
        { success: false, message: "Invalid request. Missing cuid parameter" },
        { status: 400 }
      );
    }

    // Find orders for the specified cuid
    const userOrders = data.orders.find((userOrder) => userOrder.cuid === cuid);

    if (userOrders) {
      // Return the user's orders as a JSON response with a status of 200 OK
      return NextResponse.json(
        { success: true, orders: userOrders.orders },
        { status: 200 }
      );
    } else {
      // If user's orders are not found, return a JSON response with a status of 404 Not Found
      return NextResponse.json(
        { success: false, message: "User orders not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching user orders:", error);
    // Return a JSON response with a status of 500 Internal Server Error in case of an error
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
