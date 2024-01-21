export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const removeFromCart = async (id: any, cuid: string, callbackFn: () => void) => {
  try {
    const response = await fetch(`/api/cart/delete/${id}?cuid=${cuid}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Product removed from cart successfully:", data.message);
      callbackFn()
    } else {
      console.error("Error removing product from cart:", data.message);
    }
  } catch (error) {
    console.error("API error:", error);
  }
};

export const generateCoupon = (cuid: string, activeCouponNames: Set<string>) => {

  // Add the generated coupon to the data
  const newCoupon = {
    code: generateRandomCoupon(activeCouponNames),
    active: true,
    generated_at: new Date().toISOString(),
    applied_at: "",
  };

  return newCoupon;
};

function generateRandomCoupon(activeCouponNames: Set<string>) {
  const randomWords = [
    "SPECIAL",
    "SAVINGS",
    "DISCOUNT",
    "OFFER",
    "DEAL",
    "EXCLUSIVE",
    "SALE",
    "BARGAIN",
    "PROMO",
    "CODE",
    "VALUE",
    "REWARD",
    "LIMITED",
    "CLEARANCE",
    "MARKDOWN",
    "BONUS",
    "GIFT",
    "VIP",
    "FLASH",
    "FREE",
    "ULTIMATE",
    "PREMIUM",
    "TOP",
    "CHOICE",
    "BEST",
    "SELECT",
    "PRIME",
    "ELITE",
    "SUPER",
    "MAGIC",
    "MUSTHAVE",
    "FABULOUS",
    "EPIC",
    "GRABNOW",
    "HOTDEAL",
    "WINNER",
    "DELUXE",
    "FANTASTIC",
    "AMAZING",
  ];

  let coupon;
  do {
    const randomWord =
      randomWords[Math.floor(Math.random() * randomWords.length)];
    const randomNumber = Math.floor(Math.random() * 90 + 10);
    coupon = `UNIBLOX${randomWord}${randomNumber}`;
  } while (activeCouponNames.has(coupon));

  return coupon;
}
