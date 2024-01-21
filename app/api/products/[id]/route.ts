import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  try {
    const { id } = params;

    console.log('@@@@@@id', id)

    const response = await fetch(`https://dummyjson.com/products/${id}`);
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
