# DecryptCode E-commerce Assessment

Simple e-commerce full-stack assessment: **React** frontend + **Node.js** backend.

📋 **Instructions for candidates:** See [ASSESSMENT.md](./ASSESSMENT.md) for tasks and time estimate (40–60 min).

## Quick start

**Terminal 1 — Backend**
```bash
cd backend && npm install && npm run dev
```
API: http://localhost:3001

**Terminal 2 — Frontend**
```bash
cd frontend && npm install && npm run dev
```
App: http://localhost:5173 (proxies `/api` to backend)

## Structure

- **backend/** — Express API in Node.js (routes, middleware, controllers, mock data).
- **frontend/** — React + Vite app (product list, product detail, cart pages).
