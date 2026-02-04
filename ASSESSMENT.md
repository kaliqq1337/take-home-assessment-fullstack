# DecryptCode — Senior Full-Stack Engineer Assessment

**Time:** 40–60 minutes  
**Stack:** React (frontend), Node.js (backend)

This is a simple e-commerce app. The backend serves products, categories, and orders from in-memory mock data. The frontend should let users browse products, view a product detail page, and see a cart. Complete the **5 required tasks** below (3 frontend, 2 backend). The **2 nice-to-have** tasks are optional.

---

## Setup

1. **Backend**
   - `cd backend`
   - `npm install`
   - `npm run dev` — API runs at `http://localhost:3001`

2. **Frontend**
   - `cd frontend`
   - `npm install`
   - `npm run dev` — App runs at `http://localhost:5173` (proxies `/api` to the backend)

---

## Required Tasks (5 total)

### Frontend (3 tasks)

1. **Product list page** (`frontend/src/pages/ProductList.tsx`)
   - Fetch products from `GET /api/products` when the page loads.
   - Show a **loading** state while fetching.
   - Show an **error** message if the request fails.
   - Display the list (e.g. name, price, link to product detail).

2. **Product detail page** (`frontend/src/pages/ProductDetail.tsx`)
   - Fetch a single product with `GET /api/products/:id` using the route param.
   - Show **loading** and **error** states (including 404 when the product is not found).
   - Display the product’s name, description, price, and any other useful fields.

3. **Cart page** (`frontend/src/pages/Cart.tsx`)
   - Keep cart items in state (e.g. `{ productId, quantity }[]`). You may seed with 1–2 items or add “Add to cart” on the product detail page.
   - For each item, get product details (e.g. from the products API) and show **line items** (name, quantity, unit price, line total).
   - Show the **cart total** (sum of all line totals).

### Backend (2 tasks)

4. **GET /api/products/:id** (`backend/src/controllers/productsController.js`)
   - Implement `getProductById` so that it returns the product when found, and responds with **404** and `{ error: 'Product not found' }` when the id does not match any product.

5. **Order validation middleware** (`backend/src/middleware/validateOrderBody.js`)
   - Implement `validateOrderBody` for `POST /api/orders`.
   - Validate that `req.body` has an **items** array; each item must have **productId** (non-empty string) and **quantity** (positive integer).
   - If invalid, respond with **400** and `{ error: '...' }` and do not call `next()`.

---

## Nice-to-have (optional, 2 tasks)

6. **Filter or sort products** — On the product list page, add filtering by category (e.g. dropdown or tabs) and/or sorting (e.g. by price). Use `GET /api/categories` if needed.

7. **Place order** — Add a way to place an order from the cart (e.g. “Place order” button) that calls `POST /api/orders` with `{ customerEmail?: string, items: [{ productId, quantity }] }` and shows a success (or error) message.

---

## API reference

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/health | Health check |
| GET | /api/products | List all products |
| GET | /api/products/:id | Get one product (implement in backend task 4) |
| GET | /api/categories | List all categories |
| GET | /api/orders | List all orders (for reference) |
| POST | /api/orders | Create order. Body: `{ customerEmail?, items: [{ productId, quantity }] }`. Validate in backend task 5. |

---

## What we look for

- Clear, readable code and sensible structure.
- Correct handling of loading and error states on the frontend.
- Backend: proper use of routes, middleware, and controllers; validation that returns 400 with a clear message.
- You may use any built-in React patterns (useState, useEffect, or context) and the existing `api` client in `frontend/src/api/client.ts`.

Good luck.
