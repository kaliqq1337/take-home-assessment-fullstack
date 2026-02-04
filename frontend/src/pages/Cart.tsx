/**
 * TODO (Assessment Task - Frontend 3): Implement the cart page.
 * - Use local state (useState) or context to hold cart items: { productId, quantity }[].
 * - For each cart item, resolve the product (e.g. from GET /api/products or a single product fetch) to show name and price.
 * - Display each line item (product name, quantity, unit price, line total).
 * - Display the cart total (sum of line totals).
 * You may seed the cart with 1–2 items for demo, or add "Add to cart" on the product detail page.
 */
export default function Cart() {
  return (
    <div>
      <h1>Cart</h1>
      <p>Implement: cart state, line items with product details, and total.</p>
    </div>
  );
}
