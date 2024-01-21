// Represents a product in the store
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quantity?: number; // Optional property for the quantity of the product (may not be present in all contexts)
  size?: string; // Optional property for the size of the product (may not be present in all contexts)
  color?: string; // Optional property for the color of the product (may not be present in all contexts)
}

// Represents a collection of products
export interface ProductDataInterface {
  data: Product[] | null;
  onAddToCart: () => void;
}

// Represents user information
export interface UserInterface {
  cuid: string;
  email: string;
  first_name: string;
  last_name: string;
  company: string;
  address: AddressInterface;
  phone: string;
}

// Represents an address
export interface AddressInterface {
  street_address: string;
  apartment: string;
  city: string;
  state: string;
  postal_code: string;
}

// Represents an order
export interface OrderInterface {
  cuid: string; // Unique identifier for the order
  products: Product[]; // List of products included in the order
  coupon_applied: string; // The coupon code applied to the order
  total_amount: number; // Total amount before any discounts or taxes
  shipping_charge: number | string; // Shipping charge for the order
  discounted_amount: number; // Amount after applying discounts
  tax_amount: number; // Tax amount for the order
  purchased_amount: number; // Final amount paid by the user
  purchased_at: Date; // Date and time when the order was purchased
  address: AddressInterface; // Shipping address for the order
  phone: string; // Contact phone number for the order
  payment_method: string;
}

// Represents a coupon
export interface Coupon {
  code: string;
  active: boolean;
  generated_at: Date;
}
