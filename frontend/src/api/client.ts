import type { Product, Category, Order } from '../types';

const API_BASE = '/api';

export async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error?: string }).error ?? res.statusText);
  }
  return res.json();
}

export const api = {
  getProducts: () => fetchApi<Product[]>('/products'),
  getProduct: (id: string | undefined) => fetchApi<Product>(`/products/${id}`),
  getCategories: () => fetchApi<Category[]>('/categories'),
  createOrder: (body: { customerEmail?: string; items: Array<{ productId: string; quantity: number }> }) =>
    fetchApi<Order>('/orders', { method: 'POST', body: JSON.stringify(body) }),
};
