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
