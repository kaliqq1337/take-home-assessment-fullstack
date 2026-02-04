import { useParams } from 'react-router-dom';

/**
 * TODO (Assessment Task - Frontend 2): Implement the product detail page.
 * - Fetch the single product by id from the API (GET /api/products/:id) using the route param.
 * - Show loading state while fetching.
 * - Show error state if the request fails or product is not found (404).
 * - Display the product name, description, price, and any other relevant fields.
 */
export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>Product Detail</h1>
      <p>Implement: fetch product {id} from /api/products/:id, loading/error states, and display details.</p>
    </div>
  );
}
