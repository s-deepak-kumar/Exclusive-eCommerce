import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Accessing URL parameter
    const { searchParams } = new URL(req?.url);

    // Get featured value
    const featured = searchParams?.get("featured")|| false;

    // Use the productId in the API call or any logic you need
    const response = await fetch(`https://dummyjson.com/products?${featured ? "skip=25&limit=5" : "limit=10"}`);
    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
