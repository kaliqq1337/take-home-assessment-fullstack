import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import type { Product } from '../types';

type CartItem = { productId: string; quantity: number };

function formatMoney(currency: string, amount: number) {
    return `${currency} ${amount.toFixed(2)}`;
}

/**
 * TODO (Assessment Task - Frontend 3): Implement the cart page.
 * - Use local state (useState) or context to hold cart items: { productId, quantity }[].
 * - For each cart item, resolve the product (e.g. from GET /api/products or a single product fetch) to show name and price.
 * - Display each line item (product name, quantity, unit price, line total).
 * - Display the cart total (sum of line totals).
 * You may seed the cart with 1–2 items for demo, or add "Add to cart" on the product detail page.
 */
export default function Cart() {
    // Seed with 1–2 items for demo purposes
    const [items, setItems] = useState<CartItem[]>([
        { productId: 'prod1', quantity: 1 },
        { productId: 'prod2', quantity: 2 },
    ]);

    const [productsById, setProductsById] = useState<Record<string, Product>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadProducts() {
            try {
                setLoading(true);
                setError(null);

                const products = await api.getProducts();
                if (cancelled) return;

                const map: Record<string, Product> = {};
                for (const p of products) map[p.id] = p;

                setProductsById(map);
            } catch (e) {
                if (!cancelled) {
                    const message = e instanceof Error ? e.message : 'Failed to load products';
                    setError(message);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadProducts();

        return () => {
            cancelled = true;
        };
    }, []);

    const rows = useMemo(() => {
        return items.map((item) => {
            const product = productsById[item.productId];
            const unitPrice = product?.price ?? 0;
            const currency = product?.currency ?? 'USD';
            const lineTotal = unitPrice * item.quantity;

            return {
                item,
                product,
                unitPrice,
                currency,
                lineTotal,
            };
        });
    }, [items, productsById]);

    const cartTotal = useMemo(() => rows.reduce((sum, r) => sum + r.lineTotal, 0), [rows]);

    const displayCurrency = useMemo(() => {
        // Keep it simple: assume all items share the same currency; fall back to USD
        for (const r of rows) {
            if (r.product?.currency) return r.product.currency;
        }
        return 'USD';
    }, [rows]);

    function updateQuantity(productId: string, nextQuantity: number) {
        const quantity = Number.isFinite(nextQuantity) ? Math.max(1, Math.min(99, Math.floor(nextQuantity))) : 1;
        setItems((prev) => prev.map((it) => (it.productId === productId ? { ...it, quantity } : it)));
    }

    function removeItem(productId: string) {
        setItems((prev) => prev.filter((it) => it.productId !== productId));
    }

    return (
        <div>
            <h1>Cart</h1>

            {loading && <p>Loading cart…</p>}

            {!loading && error && (
                <p role="alert" style={{ color: 'crimson' }}>
                    Error: {error}
                </p>
            )}

            {!loading && !error && items.length === 0 && (
                <p>
                    Your cart is empty. <Link to="/products">Browse products</Link>.
                </p>
            )}

            {!loading && !error && items.length > 0 && (
                <>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                                <th style={{ padding: '10px 8px' }}>Product</th>
                                <th style={{ padding: '10px 8px', width: 120 }}>Quantity</th>
                                <th style={{ padding: '10px 8px', width: 140 }}>Unit price</th>
                                <th style={{ padding: '10px 8px', width: 140 }}>Line total</th>
                                <th style={{ padding: '10px 8px', width: 90 }} />
                            </tr>
                            </thead>

                            <tbody>
                            {rows.map(({ item, product, unitPrice, currency, lineTotal }) => {
                                const missingProduct = !product;

                                return (
                                    <tr key={item.productId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '10px 8px' }}>
                                            {missingProduct ? (
                                                <div>
                                                    <div style={{ fontWeight: 600 }}>Unknown product</div>
                                                    <div style={{ color: '#6b7280', fontSize: 12 }}>id: {item.productId}</div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <Link to={`/products/${product.id}`} style={{ fontWeight: 600 }}>
                                                        {product.name}
                                                    </Link>
                                                    <div style={{ color: '#6b7280', fontSize: 12 }}>
                                                        {product.inStock ? 'In stock' : 'Out of stock'}
                                                    </div>
                                                </div>
                                            )}
                                        </td>

                                        <td style={{ padding: '10px 8px' }}>
                                            <input
                                                type="number"
                                                min={1}
                                                max={99}
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                                                style={{ width: '100%', padding: 6 }}
                                                aria-label={`Quantity for ${product?.name ?? item.productId}`}
                                            />
                                        </td>

                                        <td style={{ padding: '10px 8px', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                                            {missingProduct ? '—' : formatMoney(currency, unitPrice)}
                                        </td>

                                        <td style={{ padding: '10px 8px', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                                            {missingProduct ? '—' : formatMoney(currency, lineTotal)}
                                        </td>

                                        <td style={{ padding: '10px 8px' }}>
                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.productId)}
                                                style={{
                                                    padding: '6px 10px',
                                                    borderRadius: 6,
                                                    border: '1px solid #e5e7eb',
                                                    background: '#fff',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>

                            <tfoot>
                            <tr>
                                <td colSpan={3} style={{ padding: '12px 8px', textAlign: 'right', fontWeight: 700 }}>
                                    Total
                                </td>
                                <td style={{ padding: '12px 8px', whiteSpace: 'nowrap', fontWeight: 700 }}>
                                    {formatMoney(displayCurrency, cartTotal)}
                                </td>
                                <td />
                            </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div style={{ marginTop: 12, color: '#6b7280', fontSize: 12 }}>
                        Note: This cart is stored in local component state (refresh will reset).
                    </div>
                </>
            )}
        </div>
    );
}