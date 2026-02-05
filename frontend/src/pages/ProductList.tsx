import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Category, Product } from '../types';
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
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [categoryId, setCategoryId] = useState<string>('all');
    const [sort, setSort] = useState<'name-asc' | 'price-asc' | 'price-desc'>('name-asc');

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                setError(null);

                const productsPromise = api.getProducts();
                const categoriesPromise = api.getCategories();

                const productsData = await productsPromise;
                const categoriesData = await categoriesPromise;

                if (!cancelled) {
                    setProducts(productsData);
                    setCategories(categoriesData);
                }
            } catch (e) {
                if (!cancelled) {
                    const message = e instanceof Error ? e.message : 'Failed to load products';
                    setError(message);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        void load();

        return () => {
            cancelled = true;
        };
    }, []);

    const visibleProducts = useMemo(() => {
        let list = products;

        if (categoryId !== 'all') {
            list = list.filter((p) => p.categoryId === categoryId);
        }

        const sorted = [...list];
        sorted.sort((a, b) => {
            if (sort === 'price-asc') return a.price - b.price;
            if (sort === 'price-desc') return b.price - a.price;
            return a.name.localeCompare(b.name);
        });

        return sorted;
    }, [products, categoryId, sort]);

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
                    <div
                        style={{
                            display: 'flex',
                            gap: 12,
                            flexWrap: 'wrap',
                            alignItems: 'end',
                            marginBottom: 16,
                            padding: 12,
                            border: '1px solid #e5e7eb',
                            borderRadius: 8,
                            background: '#fff',
                        }}
                    >
                        <label style={{ display: 'grid', gap: 6 }}>
                            <span style={{ fontSize: 12, color: '#4b5563' }}>Category</span>
                            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} style={{ padding: 8 }}>
                                <option value="all">All</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label style={{ display: 'grid', gap: 6 }}>
                            <span style={{ fontSize: 12, color: '#4b5563' }}>Sort</span>
                            <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} style={{ padding: 8 }}>
                                <option value="name-asc">Name (A → Z)</option>
                                <option value="price-asc">Price (low → high)</option>
                                <option value="price-desc">Price (high → low)</option>
                            </select>
                        </label>

                        <div style={{ marginLeft: 'auto', color: '#6b7280', fontSize: 12 }}>
                            Showing {visibleProducts.length} of {products.length}
                        </div>
                    </div>

                    {visibleProducts.length === 0 ? (
                        <p>No products match your filters.</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
                            {visibleProducts.map((p) => (
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