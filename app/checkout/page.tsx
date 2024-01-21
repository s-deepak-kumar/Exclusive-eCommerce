"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { classNames, removeFromCart } from "@/utils";
import useProductData from "@/hooks/useProductData";
import useCuid from "@/hooks/useCuid";
import Coupon from "@/components/Coupon";
import { ChevronDown } from "lucide-react";
import { CURRENCY } from "@/utils/CONSTANTS";
import useCouponData from "@/hooks/useCouponData";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import Navbar from "@/components/Navbar";

interface CheckoutInterface {
  email: string;
  first_name: string;
  last_name: string;
  company: string;
  street_address: string;
  apartment: string;
  city: string;
  state: string;
  postal_code: string;
  phone: string;
  save_information: boolean;
}

// Define available delivery methods
const deliveryMethods = [
  {
    id: 1,
    title: "Standard",
    turnaround: "4-10 business days",
    price: 0,
  },
  { id: 2, title: "Express", turnaround: "2-5 business days", price: 50 },
];

// Define available payment methods
const paymentMethods = [{ id: "cash-on-delivery", title: "Cash on Delivery" }];

// Checkout component
export default function Checkout() {
  const router = useRouter();

  const cuid = useCuid();
  const { userData, isLoading, error } = useUser();

  const [cartValue, setCartValue] = useState<number>(0);
  const [discountCoupon, setDiscountCoupon] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [taxableAmount, setTaxableAmount] = useState<number>(0);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );

  const [checkoutInfo, setCheckoutInfo] = useState<CheckoutInterface>({
    email: "",
    first_name: "",
    last_name: "",
    company: "",
    street_address: "",
    apartment: "",
    city: "",
    state: "",
    postal_code: "",
    phone: "",
    save_information: true,
  });

  const tax_percentage = 18;

  // Fetch cart items data
  const {
    data: cartItemsData,
    isLoading: cartItemsLoading,
    error: cartItemsError,
    refetch: refetchCart,
  } = useProductData({ localURL: "cart" });

  useEffect(() => {
    // Check if cart is empty and redirect to /cart if needed
    if (cartItemsData?.length === 0) {
      router.push("/");
    }
  }, [cartItemsData, router]);

  useEffect(() => {
    setCheckoutInfo({
      email: userData?.email ?? "",
      first_name: userData?.first_name ?? "",
      last_name: userData?.last_name ?? "",
      company: userData?.company ?? "",
      street_address: userData?.address?.street_address ?? "",
      apartment: userData?.address?.apartment ?? "",
      city: userData?.address?.city ?? "",
      state: userData?.address?.state ?? "",
      postal_code: userData?.address?.postal_code ?? "",
      phone: userData?.phone ?? "",
      save_information: true,
    });
  }, [userData]);

  // Fetch coupon items data
  const {
    data: couponItemsData,
    isLoading: couponItemsLoading,
    error: couponItemsError,
  } = useCouponData();

  // Calculate total cart value on cart data change
  useEffect(() => {
    const totalCartValue = cartItemsData?.reduce((total, product) => {
      const actualPrice =
        product?.price -
        (product.price * (product.discountPercentage || 0)) / 100;
      return total + actualPrice * (product?.quantity ?? 1);
    }, 0);

    setCartValue(totalCartValue ?? 0);
    setTaxableAmount(((totalCartValue ?? 0) * tax_percentage) / 100);
  }, [cartItemsLoading]);

  const handleDiscountCodeChange = (event: any) => {
    setCouponCode(event.target.value);
    // Clear previous error message when the discount code changes
    setErrorMessage("");
  };

  const handleApplyDiscount = (event: any, couponCode: string) => {
    event.preventDefault();
    // Clear the error message if the operation was successful
    setErrorMessage("");
    setDiscountCoupon(null);

    // Validate discount code here, and set an error message if validation fails
    if (couponCode === null || couponCode === "") {
      setErrorMessage("Please enter a code.");
      return;
    }

    // Validate coupon
    validateCoupon(couponCode);
  };

  // Function to handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCheckoutInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateCoupon = async (couponCode: string) => {
    try {
      const response = await fetch(
        `/api/coupons/validate/${couponCode}?cuid=${cuid}`
      );
      const data = await response.json();

      if (response.ok) {
        setDiscountCoupon(couponCode);
        setDiscountAmount((cartValue * 10) / 100);
      } else {
        setErrorMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error calling coupon validation API:", error);
      setErrorMessage("Internal server error");
    }
  };

  // Confirm order function
  const handleCheckout = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...checkoutInfo,
          products: cartItemsData,
          coupon_applied: discountCoupon,
          total_amount: cartValue,
          shipping_charge: selectedDeliveryMethod.price,
          discounted_amount: discountAmount,
          tax_amount: taxableAmount,
          purchased_amount:
            Math.floor(cartValue) +
            Math.floor(selectedDeliveryMethod.price) +
            Math.floor(taxableAmount) -
            Math.floor(discountAmount),
          purchased_at: new Date().toISOString(),
          cuid: cuid,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("You order created successfully!");
        router.push("/");
      } else {
        console.error("Error during checkout:", data.message);
      }
    } catch (error) {
      console.error("API error during checkout:", error);
    }
  };

  // JSX structure for the Checkout component
  return (
    <>
      {/* Navbar component */}
      <Navbar cartCount={cartItemsData?.length} />
      <div className="bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Checkout</h2>

          {/* Breadcrumb and title */}
          <span className="text-gray-400 text-sm font-[300]">
            Account / My Account / Product / Cart
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            / Checkout
          </h1>

          {/* Checkout form */}
          <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 mt-12">
            {/* Shipping and contact information */}
            <div>
              {/* Contact information */}
              <div>
                <h2 className="text-xl font-medium text-gray-900">
                  Contact information
                </h2>

                <div className="mt-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address *
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      className="block w-full rounded-md p-2.5 border-[1px] border-gray-300 shadow-sm focus:border-[#DB4444] focus:ring-[#DB4444] sm:text-sm outline-[#DB4444]"
                      required
                      value={checkoutInfo?.email}
                      disabled={userData?.email ? true : false}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping information */}
              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-xl font-medium text-gray-900">
                  Shipping information
                </h2>

                {/* Shipping form inputs */}
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        autoComplete="given-name"
                        className="block w-full rounded-md p-2.5 border-[1px] border-gray-300 shadow-sm focus:border-[#DB4444] focus:ring-[#DB4444] sm:text-sm outline-[#DB4444]"
                        required
                        value={checkoutInfo?.first_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        autoComplete="family-name"
                        className="block w-full rounded-md p-2.5 border-[1px] border-gray-300 shadow-sm focus:border-[#DB4444] focus:ring-[#DB4444] sm:text-sm outline-[#DB4444]"
                        required
                        value={checkoutInfo?.last_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        className="block w-full rounded-md p-2.5 border-[1px] border-gray-300 shadow-sm focus:border-[#DB4444] focus:ring-[#DB4444] sm:text-sm outline-[#DB4444]"
                        value={checkoutInfo?.company}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="street_address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="street_address"
                        id="street_address"
                        autoComplete="street-address"
                        className="block w-full rounded-md p-2.5 border-[1px] border-gray-300 shadow-sm focus:border-[#DB4444] focus:ring-[#DB4444] sm:text-sm outline-[#DB4444]"
                        required
                        value={checkoutInfo?.street_address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="apartment"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Apartment, suite, etc. *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="apartment"
                        id="apartment"
                        className="block w-full rounded-md p-2.5 border-[1px] border-gray-300 shadow-sm focus:border-[#DB4444] focus:ring-[#DB4444] sm:text-sm outline-[#DB4444]"
                        required
                        value={checkoutInfo?.apartment}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md p-2.5 border-[1px] border-gray-300 shadow-sm focus:border-[#DB4444] focus:ring-[#DB4444] sm:text-sm outline-[#DB4444]"
                        required
                        value={checkoutInfo?.city}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State / Province *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="state"
                        id="state"
                        autoComplete="address-level1"
                        className="block w-full rounded-md p-2.5 border-[1px] border-gray-300 shadow-sm focus:border-[#DB4444] focus:ring-[#DB4444] sm:text-sm outline-[#DB4444]"
                        required
                        value={checkoutInfo?.state}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="postal_code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal code *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="postal_code"
                        id="postal_code"
                        autoComplete="postal_code"
                        className="block w-full rounded-md p-2.5 border-[1px] border-gray-300 shadow-sm focus:border-[#DB4444] focus:ring-[#DB4444] sm:text-sm outline-[#DB4444]"
                        required
                        value={checkoutInfo?.postal_code}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone number *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="tel"
                        className="block w-full rounded-md p-2.5 border-[1px] border-gray-300 shadow-sm focus:border-[#DB4444] focus:ring-[#DB4444] sm:text-sm outline-[#DB4444]"
                        required
                        value={checkoutInfo?.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Save information for next time use */}
                  <div className="flex space-x-2 sm:col-span-2">
                    <div className="flex items-center justify-center">
                      <input
                        id="save_information"
                        name="save_information"
                        type="checkbox"
                        className="h-4 w-4 rounded border-[1.5px] border-gray-300 text-white checked:border-0 checked:bg-[#DB4444] checked:fill-white peer relative appearance-none shrink-0"
                        checked={checkoutInfo?.save_information}
                        onChange={handleInputChange}
                      />
                      <svg
                        className="absolute w-3 h-3 pointer-events-none hidden peer-checked:block stroke-white outline-none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <label
                      htmlFor="save_information"
                      className="text-sm text-gray-900"
                    >
                      Save this information for faster check-out next time
                    </label>
                  </div>
                </div>
              </div>

              {/* Delivery information */}
              <div className="mt-10 border-t border-gray-200 pt-10">
                <RadioGroup
                  value={selectedDeliveryMethod}
                  onChange={setSelectedDeliveryMethod}
                >
                  <RadioGroup.Label className="text-xl font-medium text-gray-900">
                    Delivery method
                  </RadioGroup.Label>

                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {deliveryMethods.map((deliveryMethod) => (
                      <RadioGroup.Option
                        key={deliveryMethod.id}
                        value={deliveryMethod}
                        className={({ checked, active }) =>
                          classNames(
                            checked ? "border-transparent" : "border-gray-300",
                            active ? "ring-2 ring-[#DB4444]" : "",
                            "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none appearance-none"
                          )
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <span className="flex flex-1">
                              <span className="flex flex-col">
                                <RadioGroup.Label
                                  as="span"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  {deliveryMethod.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className="mt-1 flex items-center text-sm text-gray-500"
                                >
                                  {deliveryMethod.turnaround}
                                </RadioGroup.Description>
                                <RadioGroup.Description
                                  as="span"
                                  className="mt-6 text-sm font-medium text-gray-900"
                                >
                                  {deliveryMethod.price > 0
                                    ? `${CURRENCY}${deliveryMethod.price}`
                                    : "Free"}
                                </RadioGroup.Description>
                              </span>
                            </span>
                            {checked ? (
                              <CheckCircleIcon
                                className="h-5 w-5 text-[#DB4444]"
                                aria-hidden="true"
                              />
                            ) : null}
                            <span
                              className={classNames(
                                active ? "border" : "border-2",
                                checked
                                  ? "border-[#DB4444]"
                                  : "border-transparent",
                                "pointer-events-none absolute -inset-px rounded-lg"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Payment Information*/}
              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-xl font-medium text-gray-900">Payment</h2>
                {/* Payment method selection */}
                <fieldset className="mt-4">
                  <legend className="sr-only">Payment type</legend>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                      <div key={paymentMethod.id} className="flex items-center">
                        {paymentMethodIdx === 0 ? (
                          <input
                            id={paymentMethod.id}
                            name="payment-type"
                            type="radio"
                            defaultChecked
                            className="h-3 w-3 border-gray-300 text-[#DB4444] focus:ring-[#DB4444] rounded-full ring-offset-1 appearance-none checked:bg-[#DB4444] checked:ring-[2px] checked:ring-[#DB4444]"
                          />
                        ) : (
                          <input
                            id={paymentMethod.id}
                            name="payment-type"
                            type="radio"
                            className="h-3 w-3 border-gray-300 border-gray-300 text-indigo-600 focus:ring-[#DB4444]"
                          />
                        )}

                        <label
                          htmlFor={paymentMethod.id}
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {paymentMethod.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-xl font-medium text-gray-900">
                Order summary
              </h2>
              {/* Cart items and order summary */}
              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul
                  role="list"
                  className="divide-y divide-gray-200 overflow-y-auto max-h-[500px]"
                >
                  {cartItemsData?.map((product) => (
                    <li key={product.id} className="flex px-4 py-6 sm:px-6">
                      <div className="flex-shrink-0">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-20 rounded-md"
                        />
                      </div>

                      <div className="ml-6 flex flex-1 flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <a
                                href={`/product/${product.id}`}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.title}
                              </a>
                            </h4>
                            <div className="mt-1 flex text-sm items-center">
                              <p className="text-gray-500">{product.color}</p>
                              <hr className="h-3.5 w-[1.5px] bg-gray-300 mx-4" />
                              {product.size ? (
                                <p className="text-gray-500">{product.size}</p>
                              ) : null}
                            </div>
                          </div>

                          <div className="ml-4 flow-root flex-shrink-0">
                            <button
                              type="button"
                              className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                              onClick={() => [
                                removeFromCart(product.id, cuid, refetchCart),
                              ]}
                            >
                              <span className="sr-only">Remove</span>
                              <TrashIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-1 items-end justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {CURRENCY}
                            {Math.floor(
                              product.price -
                                (product.price * product?.discountPercentage) /
                                  100
                            )}
                          </p>

                          <div className="ml-4">
                            <label htmlFor="quantity" className="sr-only">
                              Quantity
                            </label>
                            <div className="relative inline-block">
                              <select
                                id={`quantity`}
                                name={`quantity`}
                                className="max-w-full rounded border border-gray-300 py-0.5 px-2 pr-6 text-left text-base font-medium leading-5 text-gray-700 sm:text-sm bg-white appearance-none"
                                value={product?.quantity}
                                disabled
                              >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <ChevronDown className="h-4 w-4" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div>
                    <label
                      htmlFor="discount-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Discount code
                    </label>
                    <div className="mt-1 flex space-x-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          id="discount-code"
                          name="discount-code"
                          placeholder="UNIBLOXSAVE10"
                          className="block w-full rounded-md p-2.5 border-[1px] border-gray-300 shadow-sm focus:border-[#DB4444] focus:ring-[#DB4444] sm:text-sm outline-[#DB4444] "
                          onChange={handleDiscountCodeChange}
                          value={couponCode ?? ""}
                          maxLength={30}
                        />
                        {errorMessage && (
                          <p className="text-red-500 mt-2 text-sm">
                            {errorMessage}
                          </p>
                        )}
                      </div>
                      <button
                        className="rounded-md h-max bg-[#DB4444] px-4 py-2.5 text-sm text-white"
                        onClick={(e: any) => {
                          handleApplyDiscount(e, couponCode ?? "");
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {CURRENCY}
                      {Math.floor(cartValue)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Shipping</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {selectedDeliveryMethod.price > 0
                        ? `${CURRENCY}${selectedDeliveryMethod.price}`
                        : "Free"}
                    </dd>
                  </div>
                  {discountCoupon && (
                    <div className="flex justify-between">
                      <dt className="flex text-sm items-center">
                        Discount
                        <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">
                          {discountCoupon}
                        </span>
                      </dt>
                      <dd className="text-gray-900">
                        -{CURRENCY}
                        {Math.floor(discountAmount)}
                      </dd>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Taxes</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {CURRENCY}
                      {Math.floor(taxableAmount)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">
                      {CURRENCY}
                      {Math.floor(cartValue) +
                        Math.floor(selectedDeliveryMethod.price) +
                        Math.floor(taxableAmount) -
                        Math.floor(discountAmount)}
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-[#DB4444] px-4 py-3 text-base font-medium text-white shadow-sm"
                    onClick={handleCheckout}
                  >
                    Confirm order
                  </button>
                </div>
              </div>

              {couponItemsData && (
                <div className="mt-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Available Coupons
                  </h2>
                  <div className="mt-4 space-y-4">
                    {couponItemsData?.map((coupon) => (
                      <Coupon
                        coupon={coupon}
                        appliedCoupon={discountCoupon}
                        onApply={(e: any) => {
                          setCouponCode(coupon?.code);
                          handleApplyDiscount(e, coupon?.code);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
