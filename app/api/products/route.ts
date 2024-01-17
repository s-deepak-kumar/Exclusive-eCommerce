import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Accessing URL parameter
    const { searchParams } = new URL(req?.url);

    // Get queries
    const skip = searchParams?.get("skip") || 0;
    const limit = searchParams?.get("limit") || 5;

    const response = await fetch(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`);
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
