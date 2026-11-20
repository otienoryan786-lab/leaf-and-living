# Leaf & Living

Leaf & Living is a React plant catalogue with a simulated JSON Server API.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Backend setup

Install project dependencies:

```bash
npm install
```

Start the JSON Server API in one terminal:

```bash
npm run server
```

The products endpoint is `http://localhost:3001/products`. JSON Server reads and saves product changes in `db.json`.

Start the React app in a second terminal:

```bash
npm run dev
```

## Reset the sample products

The original six products are saved in `db.seed.json`. To discard local product changes and restore the sample catalogue, stop JSON Server and run:

```bash
cp db.seed.json db.json
```

Then start JSON Server again with `npm run server`.

## Product API

- `GET /products` loads all products.
- `POST /products` creates a product.
- `PATCH /products/:id` updates a product.
- `DELETE /products/:id` removes a product.

Products use `id`, `name`, `category`, `careLevel`, `description`, `price`, and `image` fields. The React API functions are in `src/api/productsApi.js`; `src/hooks/useProducts.js` loads products and keeps shared product state in sync after successful requests.

## Checks

```bash
npm test
npm run build
npm run lint
```
