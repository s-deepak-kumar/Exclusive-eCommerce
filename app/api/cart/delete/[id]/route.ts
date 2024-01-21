import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

const dataPath = join(process.cwd(), "utils", "data", "data.json");
const data = require("../../../../../utils/data/data.json");

export async function DELETE(req: NextRequest, { params }: any) {
  try {
    // Accessing URL parameter
    const { searchParams } = new URL(req?.url);

    // Get queries
    const cuid = searchParams?.get("cuid") || 0;

    // Cart data is stored in a JSON file
    const { cart } = data;

    const { id } = params;

    // Search for the cart with the given cuid
    const userCartIndex = cart.findIndex(
      (item: { cuid: string }) => item.cuid === cuid
    );

    if (userCartIndex !== -1) {
      // User cart found, find the product in the cart by productId
      const userCart = cart[userCartIndex];
      const productIndex = userCart.products.findIndex(
        (product: { id: string }) => product.id == id
      );

      if (productIndex !== -1) {
        // Product found, remove it from the cart
        userCart.products.splice(productIndex, 1);

        // Save the updated cart back to the JSON file or your data store
        require("fs").writeFileSync(dataPath, JSON.stringify(data, null, 2));

        // Return a JSON response with a status of 200 OK.
        return NextResponse.json(
          { success: true, message: "Product removed from cart successfully" },
          { status: 200 }
        );
      } else {
        // Product not found in the cart, return a JSON response with a status of 404 Not Found.
        return NextResponse.json(
          { success: false, message: "Product not found in the cart" },
          { status: 404 }
        );
      }
    } else {
      // User cart not found, return a JSON response with a status of 404 Not Found.
      return NextResponse.json(
        { success: false, message: "User cart not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    // Return a JSON response with a status of 500 Internal Server Error in case of an error.
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
