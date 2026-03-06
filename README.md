# Neuffer Shopping Cart

A shopping cart built with Vue 3, TypeScript, Pinia, and Tailwind CSS. Products are fetched from the [FakeStore API](https://fakestoreapi.com).

**Live demo:**
https://neuffer-shopping-cart-two.vercel.app/

## Features

- Fetch products from FakeStore API on load
- Add new items to the cart via POST request to FakeStore API
- Update item quantities (1–99 per item)
- Remove individual items or clear the entire cart
- Shipping cost calculation based on country and postcode
- Checkout flow with order confirmation message
- Responsive layout — works on mobile and desktop

## API Usage

Initial product data is loaded from the [FakeStore API](https://fakestoreapi.com) (`GET /products`). When adding a new item, a `POST /products` request is made to demonstrate write operations. Since FakeStore is a mock API, the returned id is replaced with `Date.now()` to keep cart ids unique.

## Tech Stack

- Vue 3 (Composition API, `<script setup>`)
- TypeScript (strict mode)
- Pinia (state management)
- Tailwind CSS v4
- Vite
- Vitest + Vue Test Utils

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests in watch mode |
| `npm run lint` | Run ESLint |

## CI

GitHub Actions runs on every push and pull request to `main`:

1. **Run ESLint** — checks code style
2. **Run tests** — runs the full Vitest suite
3. **Build project** — type-checks and produces a production build

## Testing

Run all tests once:

```bash
npx vitest run
```

The project has three levels of tests:

### Unit tests — store & composable logic
- `src/stores/cartStore.test.ts` — getters (subTotal, VAT, total) and actions (add, delete, clear, checkout, quantity)
- `src/composables/useShipping.test.ts` — shipping form validation and button disable logic

### Component tests — individual component behaviour
- `src/components/CartItem.test.ts` — increment/decrement controls
- `src/components/CartItemList.test.ts` — empty state, rendering, clear cart, add item
- `src/components/CartSummary.test.ts` — checkout button states, success message

### Integration tests — full user flows
- `src/tests/cart.integration.test.ts` — shipping gates checkout, complete checkout flow
