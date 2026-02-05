import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Product } from '../types';
import { api } from '../api/client';

/**
 * TODO (Assessment Task - Frontend 2): Implement the product detail page.
 * - Fetch the single product by id from the API (GET /api/products/:id) using the route param.
 * - Show loading state while fetching.
 * - Show error state if the request fails or product is not found (404).
 * - Display the product name, description, price, and any other relevant fields.
 */
export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [imageFailed, setImageFailed] = useState(false);

    useEffect(() => {
        if (!id) {
            setProduct(null);
            setLoading(false);
            setError('Missing product id');
            return;
        }

        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                setError(null);
                setImageFailed(false);

                const data = await api.getProduct(id);
                if (!cancelled) setProduct(data);
            } catch (e) {
                if (!cancelled) {
                    const message = e instanceof Error ? e.message : 'Failed to load product';
                    setError(message);
                    setProduct(null);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();

        return () => {
            cancelled = true;
        };
    }, [id]);

    return (
        <div>
            <div style={{ marginBottom: 12 }}>
                <Link to="/products">← Back to products</Link>
            </div>

            {loading && <p>Loading product…</p>}

            {!loading && error && (
                <p role="alert" style={{ color: 'crimson' }}>
                    {error === 'Product not found' ? 'Product not found (404).' : `Error: ${error}`}
                </p>
            )}

            {!loading && !error && product && (
                <>
                    <h1 style={{ marginBottom: 8 }}>{product.name}</h1>

                    <div style={{ color: '#4b5563', marginBottom: 16 }}>
                        {product.inStock ? 'In stock' : 'Out of stock'} · Category: {product.categoryId}
                    </div>

                    {product.imageUrl && !imageFailed ? (
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            onError={() => setImageFailed(true)}
                            style={{ maxWidth: 420, width: '100%', borderRadius: 10, marginBottom: 16 }}
                        />
                    ) : (
                        <div
                            style={{
                                maxWidth: 260,
                                width: '100%',
                                height: 120,
                                borderRadius: 10,
                                marginBottom: 16,
                                border: '1px solid #e5e7eb',
                                background: '#f9fafb',
                                display: 'grid',
                                placeItems: 'center',
                                color: '#6b7280',
                                fontSize: 12,
                            }}
                        >
                            <div style={{ textAlign: 'center', padding: 8 }}>
                                <div style={{ fontWeight: 600, color: '#374151' }}>{product.name}</div>
                                <div>Image unavailable</div>
                            </div>
                        </div>
                    )}

                    <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
                        {product.currency} {product.price.toFixed(2)}
                    </div>

                    <p style={{ lineHeight: 1.5, marginBottom: 16 }}>{product.description}</p>

                    {product.tags?.length > 0 && (
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {product.tags.map((t) => (
                                <span
                                    key={t}
                                    style={{
                                        border: '1px solid #e5e7eb',
                                        borderRadius: 999,
                                        padding: '4px 10px',
                                        fontSize: 12,
                                        color: '#374151',
                                    }}
                                >
                  {t}
                </span>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}