import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

const dataPath = join(process.cwd(), 'utils', 'data', 'data.json');
const data = require('../../../../utils/data/data.json');

export async function POST(req: NextRequest) {
  try {
    // Cart data is stored in a JSON file
    const { cart } = data;

    // Parse the request body to get contract data.
    const body = await req.json();

    // Search for the cart with the given cuid
    const userCart = cart.find((item: { cuid: string }) => item.cuid === body?.cuid);

    if (userCart) {
      // Check if the product is already in the user's cart
      const existingProduct = userCart.products.find((product: { id: string }) => product?.id === body?.product?.id);

      if (existingProduct) {
        // Product already exists, increase quantity by 1
        existingProduct.quantity += 1;
      } else {
        // Product not in the cart, add it with quantity 1
        userCart.products.push({ ...body?.product, quantity: 1, size: "S", color: "Black" });
      }
    } else {
      // User cart not found, create a new cart entry with the product and quantity 1
      const newCartEntry = {
        cuid: body?.cuid,
        products: [{ ...body?.product, quantity: 1 }],
      };

      cart.push(newCartEntry);
    }

    // Save the updated cart back to the JSON file or your data store
    require('fs').writeFileSync(dataPath, JSON.stringify(data, null, 2));

    // Return the added product as a JSON response with a status of 200 OK.
    return NextResponse.json({ success: true, message: 'Product added to cart successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
