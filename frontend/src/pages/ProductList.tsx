import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { api } from '../api/client';

/**
 * TODO (Assessment Task - Frontend 1): Implement the product list page.
 * - Fetch products from the API (GET /api/products) when the component mounts.
 * - Show a loading state while fetching.
 * - Show an error message if the request fails.
 * - Display the list of products (name, price, and a link to the product detail page).
 */
export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                setError(null);
                const data = await api.getProducts();
                if (!cancelled) setProducts(data);
            } catch (e) {
                if (!cancelled) {
                    const message = e instanceof Error ? e.message : 'Failed to load products';
                    setError(message);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div>
            <h1>Products</h1>

            {loading && <p>Loading products…</p>}

            {!loading && error && (
                <p role="alert" style={{ color: 'crimson' }}>
                    Error: {error}
                </p>
            )}

            {!loading && !error && (
                <>
                    {products.length === 0 ? (
                        <p>No products found.</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
                            {products.map((p) => (
                                <li
                                    key={p.id}
                                    style={{
                                        border: '1px solid #e5e7eb',
                                        borderRadius: 8,
                                        padding: 12,
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                                        <div>
                                            <Link to={`/products/${p.id}`} style={{ fontWeight: 600 }}>
                                                {p.name}
                                            </Link>
                                            <div style={{ color: '#4b5563', marginTop: 4 }}>
                                                {p.inStock ? 'In stock' : 'Out of stock'}
                                            </div>
                                        </div>

                                        <div style={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                                            {p.currency} {p.price.toFixed(2)}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
}