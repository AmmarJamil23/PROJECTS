# ShopCraft — Technical Explanation

> A production-grade React e-commerce application demonstrating modern frontend architecture.
> Use this document to explain the project in interviews, code reviews, or portfolio presentations.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture & Folder Structure](#2-architecture--folder-structure)
3. [React Concept: Context API + useReducer (Cart)](#3-react-concept-context-api--usereducer-cart)
4. [React Concept: React Query (Server State)](#4-react-concept-react-query-server-state)
5. [React Concept: Compound Components + Portals (Modal, Drawer, Toasts)](#5-react-concept-compound-components--portals)
6. [React Concept: Code Splitting + Performance (Lazy Routes)](#6-react-concept-code-splitting--performance)
7. [Custom Hooks Deep Dive](#7-custom-hooks-deep-dive)
8. [Service Layer & Mock API](#8-service-layer--mock-api)
9. [Routing Strategy](#9-routing-strategy)
10. [State Management Philosophy](#10-state-management-philosophy)
11. [Design System & Tailwind Architecture](#11-design-system--tailwind-architecture)
12. [Production Readiness Checklist](#12-production-readiness-checklist)
13. [How to Extend This Project](#13-how-to-extend-this-project)
14. [Interview Questions & Answers](#14-interview-questions--answers)

---

## 1. Project Overview

**ShopCraft** is a full-featured e-commerce storefront built with:

| Technology | Purpose |
|---|---|
| React 18 | UI rendering, concurrent features |
| React Router v6 | Client-side routing, URL state |
| TanStack Query v5 | Server state, caching, async data |
| React Context API | Client state (cart, wishlist, UI) |
| Tailwind CSS v3 | Utility-first styling with design tokens |
| Vite | Build tooling, HMR, code splitting |

**What it does:**
- Browse a 15-product catalog with category filtering, price range filters, search, and sort
- View full product detail pages with image galleries and related products
- Add/remove items from a persistent cart (localStorage-backed)
- Save products to a wishlist
- Complete a 3-step checkout flow (shipping → payment → confirm)
- View order history
- Toast notifications for all user actions
- Responsive layout for mobile and desktop

---

## 2. Architecture & Folder Structure

```
src/
├── components/
│   ├── ui/             # Reusable primitives: Button, Badge, Spinner, Input, Modal, Toast
│   ├── layout/         # Navbar, Footer — structural, always mounted
│   ├── product/        # ProductCard, ProductGrid — domain components
│   ├── cart/           # CartDrawer — domain-specific overlay
│   ├── filters/        # FilterSidebar — domain-specific form
│   └── checkout/       # CheckoutForm — multi-step domain form
├── context/
│   ├── CartContext.jsx  # Cart state (useReducer + localStorage)
│   └── UIContext.jsx    # WishlistContext + UIContext (toasts, drawer)
├── hooks/
│   └── index.js         # All custom hooks — useProducts, useFilters, useDebounce, etc.
├── pages/               # One file per route — lazy-loaded
├── services/
│   └── productService.js # Mock async API — swap for real API with zero refactoring
├── constants/
│   └── index.js          # Enums, labels, storage keys
└── utils/
    └── index.js           # Pure functions: cn(), formatPrice(), filterProducts()
```

**Design principles:**
- **Separation of concerns**: UI components never fetch data directly. Pages orchestrate hooks, pass data down.
- **Single responsibility**: Each file does one thing. `CartContext` only manages cart state. `productService` only handles data fetching.
- **Dependency inversion**: Components depend on hooks/context, not on the service layer directly.

---

## 3. React Concept: Context API + useReducer (Cart)

**File:** `src/context/CartContext.jsx`

### The Problem
Cart state must be accessible from: Navbar (item count), CartDrawer (full list), ProductCard (add button), ProductDetailPage (quantity selector), CheckoutForm (totals). Prop-drilling this through the component tree would be unmanageable.

### The Solution: Context + useReducer

```jsx
// Context creates a "channel" for state to flow without props
const CartContext = createContext(null)

// useReducer replaces useState for complex state with multiple transition types
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': { /* ... */ }
    case 'REMOVE_ITEM': { /* ... */ }
    case 'UPDATE_QTY': { /* ... */ }
    case 'CLEAR_CART': { /* ... */ }
  }
}

// Provider wraps the tree — any child can subscribe
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  // Persist to localStorage on every state change
  useEffect(() => {
    localStorage.setItem('shopcraft_cart', JSON.stringify(state.items))
  }, [state.items])

  // Derived state: computed from items, never stored separately
  const totals    = calcCartTotals(state.items)
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)

  return <CartContext.Provider value={{ items, totals, addItem, removeItem, ... }}>
    {children}
  </CartContext.Provider>
}

// Public hook with error guard
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within <CartProvider>')
  return ctx
}
```

### Key decisions:
- `useReducer` over `useState` because there are 4 action types and each one modifies the same `items` array — a reducer makes every transition explicit and testable.
- `derived state` (totals, itemCount) is computed on every render from `items` rather than stored separately. This prevents state inconsistency.
- `useCallback` wraps all dispatchers to prevent unnecessary re-renders in child components.
- `localStorage` is written in a `useEffect` that runs after every render — never synchronously during a dispatch.

### Interview talking points:
- **Why Context instead of Redux/Zustand?** For a single domain (cart), Context is sufficient. No middleware needed, no thunks. If you had 10+ domains, Zustand or Redux makes sense.
- **What's the tradeoff of useReducer?** More boilerplate upfront, but each state transition is pure, predictable, and unit-testable in isolation.
- **How would you prevent unnecessary re-renders?** Split the context into CartStateContext and CartDispatchContext. Components that only dispatch (like a remove button) don't re-render when the item count changes.

---

## 4. React Concept: React Query (Server State)

**File:** `src/hooks/index.js`

### The Problem
Fetching products involves: loading states, error states, caching (don't re-fetch on every navigation), background refresh, deduplication (if two components call useProducts simultaneously, only one request fires).

### The Solution: TanStack Query

```jsx
// Query keys are the cache address — centralised for easy invalidation
export const queryKeys = {
  products: ['products'],
  product:  (id) => ['products', id],
  related:  (id) => ['products', id, 'related'],
}

// useProducts — fetches all products, caches for 5 minutes
export function useProducts() {
  return useQuery({
    queryKey:  queryKeys.products,
    queryFn:   productService.getAll,
    staleTime: 5 * 60 * 1000, // Data is "fresh" for 5 min — no refetch
  })
}

// usePlaceOrder — mutation with cache invalidation on success
export function usePlaceOrder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: orderService.place,
    onSuccess: () => {
      // Invalidate orders cache so the orders page shows the new order
      queryClient.invalidateQueries({ queryKey: queryKeys.orders })
    },
  })
}
```

### Server state vs. client state distinction:
- **Server state** (React Query): Products catalog, order history — lives on the server, fetched async, needs caching.
- **Client state** (Context): Cart items, wishlist, toast queue — lives in the browser, synchronous, no network involved.

Mixing these in the same state manager is an anti-pattern. React Query manages server state. Context manages client state.

### Interview talking points:
- **What does staleTime do?** While data is "fresh", React Query returns cached data immediately without a network request. After staleTime, the next component mount triggers a background refetch.
- **What's the difference between staleTime and gcTime?** staleTime controls when to refetch. gcTime controls how long unused data stays in memory before being garbage collected.
- **How do you test React Query?** Wrap components in a fresh `QueryClient` in tests, use `msw` (Mock Service Worker) to intercept fetch calls.

---

## 5. React Concept: Compound Components + Portals

**Files:** `src/components/ui/Modal.jsx`, `CartDrawer.jsx`, `ToastContainer.jsx`

### Portal Pattern

React Portals render components outside the normal React DOM tree. Critical for overlays that need to escape `overflow: hidden` or `z-index` stacking contexts.

```jsx
// createPortal(children, container)
// "children" renders into document.body, not into the parent component's DOM node
return createPortal(
  <div className="fixed inset-0 z-50">
    {/* This renders at the <body> level regardless of where CartDrawer is mounted */}
    <div className="drawer">...</div>
  </div>,
  document.body
)
```

**Why this matters:** If CartDrawer were rendered inside a `position: relative` parent with `overflow: hidden`, the drawer would be clipped. Portals escape this entirely.

### Compound Component Pattern

The Modal is broken into sub-components that share implicit state via a local Context:

```jsx
// ModalContext provides onClose to all sub-components
const ModalCtx = createContext(null)

// Root provides context
function Modal({ isOpen, onClose, children }) {
  return (
    <ModalCtx.Provider value={{ onClose }}>
      {createPortal(<div>...</div>, document.body)}
    </ModalCtx.Provider>
  )
}

// Sub-components consume context — the consumer doesn't pass onClose manually
Modal.Header = function({ children }) {
  const { onClose } = useContext(ModalCtx)
  return <div>...<button onClick={onClose}>✕</button></div>
}

// Usage — clean, readable, no prop threading
<Modal isOpen={open} onClose={() => setOpen(false)}>
  <Modal.Header>Title</Modal.Header>
  <Modal.Body>Content</Modal.Body>
  <Modal.Footer>Actions</Modal.Footer>
</Modal>
```

### Interview talking points:
- **What problem do Portals solve?** CSS stacking contexts. A modal inside a card with `z-index: 1` would be trapped beneath sibling elements. Portaling to `document.body` escapes all parent stacking contexts.
- **When would you use Compound Components?** When a set of components are tightly coupled and share implicit state — Tabs/Tab, Select/Option, Accordion/AccordionItem. It avoids the need to manually thread state props through multiple layers.
- **What's the difference between Compound Components and render props?** Compound components use Context for implicit sharing. Render props use an explicit callback. Compound components produce cleaner JSX.

---

## 6. React Concept: Code Splitting + Performance

**File:** `src/App.jsx`

### The Problem
Without code splitting, every route's JavaScript is bundled into one file. Users visiting the homepage download the checkout code they may never use.

### The Solution: React.lazy + Suspense

```jsx
// Each lazy() call becomes a separate JS chunk
const HomePage          = lazy(() => import('@/pages/HomePage'))
const ShopPage          = lazy(() => import('@/pages/ShopPage'))
const CheckoutPage      = lazy(() => import('@/pages/CheckoutPage')
  .then(m => ({ default: m.CheckoutPage })))  // Named export pattern

// Suspense provides a fallback while the chunk loads
<Suspense fallback={<PageLoader />}>
  <Routes>
    <Route path="/"         element={<HomePage />} />
    <Route path="/checkout" element={<CheckoutPage />} />
  </Routes>
</Suspense>
```

### Build output proves it works:
```
dist/assets/HomePage-crGQ93Pe.js          6.34 kB   ← only loads on /
dist/assets/ShopPage-C4yGrbOK.js          8.18 kB   ← only loads on /shop
dist/assets/CheckoutPage-HnVPvkB7.js     11.64 kB   ← only loads on /checkout
dist/assets/index-DsySjEFV.js           242.37 kB   ← shared vendor bundle
```

### Other performance patterns used:
- **`staleTime: 5min`** on React Query — zero refetches while browsing
- **`loading="lazy"`** on all product images — browser defers offscreen image loads
- **`useCallback` on all context dispatchers** — stable references prevent child re-renders
- **`useMemo` in useFilters** — filter + sort computation is memoised, only reruns when products/filters change

### Interview talking points:
- **What's the difference between lazy loading and code splitting?** Code splitting is the bundler technique (Vite creates multiple files). Lazy loading is the runtime technique (React.lazy defers the import until render). They work together.
- **When does Suspense trigger?** When a lazy component is rendered for the first time and its chunk hasn't been downloaded yet.
- **How would you preload a route?** Call `import('@/pages/CheckoutPage')` on cart hover — the browser downloads the chunk before the user clicks checkout.
- **What's tree-shaking?** Vite/Rollup removes unused exports from the bundle at build time. This is why importing `{ cn }` from utils only includes `cn`, not all of utils.

---

## 7. Custom Hooks Deep Dive

**File:** `src/hooks/index.js`

Custom hooks are functions that start with `use` and can call other hooks. They extract stateful logic so it's reusable and testable without being tied to a component.

### useFilters
The most complex hook in the project. It:
- Syncs `category` and `sort` to URL search params (sharable, back-button compatible)
- Keeps `search`, `priceRange`, `inStockOnly` as local state
- Computes `filteredProducts` via `useMemo` — only recalculates when deps change
- Returns both state values and setters — the component is just a view

```jsx
export function useFilters(products = []) {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || 'all'

  const filteredProducts = useMemo(() =>
    sortProducts(filterProducts(products, { category, priceRange, search, inStockOnly }), sortKey),
    [products, category, priceRange, search, inStockOnly, sortKey]
  )

  return { category, filteredProducts, setCategory, ... }
}
```

### useDebounce
Prevents search queries from firing on every keypress:

```jsx
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)  // cleanup cancels the previous timer
  }, [value, delay])
  return debounced
}
```

### useClickOutside
Used by dropdowns and menus to close on outside click:
```jsx
export function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return
      handler(e)
    }
    document.addEventListener('mousedown', listener)
    return () => document.removeEventListener('mousedown', listener)
  }, [ref, handler])
}
```

### useScrollLock
Prevents body scroll when a modal or drawer is open:
```jsx
export function useScrollLock(locked) {
  useEffect(() => {
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [locked])
}
```

---

## 8. Service Layer & Mock API

**File:** `src/services/productService.js`

All data access is abstracted behind a service layer with async functions that return Promises. This is the repository pattern applied to a frontend.

```jsx
export const productService = {
  async getAll() {
    await delay(300)       // simulates network latency
    return PRODUCTS        // returns from in-memory catalog
  },
  async getById(id) { ... },
  async getRelated(id) { ... },
}
```

**Why this matters:**
To swap from mock data to a real REST API, you only change `productService.js`. Every React Query hook, every component, every test remains unchanged. This is the dependency inversion principle.

Real-world swap would look like:
```jsx
async getAll() {
  const res = await fetch('/api/products')
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}
```

---

## 9. Routing Strategy

React Router v6 with fully client-side routing.

| Route | Component | Notes |
|---|---|---|
| `/` | HomePage | Hero + featured products |
| `/shop` | ShopPage | URL-synced filters (?category=ceramics&sort=price_asc) |
| `/products/:id` | ProductDetailPage | Dynamic segment, useParams |
| `/checkout` | CheckoutPage | Guards against empty cart |
| `/order-success/:orderId` | OrderSuccessPage | Reads orderId from URL |
| `/wishlist` | WishlistPage | Reads from WishlistContext |
| `/orders` | OrdersPage | Reads from React Query |
| `*` | 404 | Catch-all |

**URL as state:** The ShopPage syncs category and sort to URL search params. This means:
- Sharing `/shop?category=ceramics&sort=price_asc` loads the page already filtered
- The browser back button restores previous filter state
- Bookmarking a filtered view works correctly

---

## 10. State Management Philosophy

This project uses three distinct state buckets:

| Bucket | Tool | What goes here |
|---|---|---|
| Server state | TanStack Query | Products, orders — async, cacheable |
| Shared client state | React Context | Cart, wishlist, UI overlays |
| Local component state | useState | Form fields, image index, qty picker |

**The rule:** Never put server state in Context. Never put client UI state in React Query. The separation keeps each tool focused on what it does best.

---

## 11. Design System & Tailwind Architecture

Custom design tokens are defined in `tailwind.config.js`:

```js
colors: {
  cream: { 50: '#fdfcf8', 100: '#f9f6ef', 200: '#f0eada' },  // backgrounds
  ink:   { 900: '#1c1a16', 600: '#4a4537', 200: '#b8b3a8' }, // text
  copper:{ 400: '#c07840', 500: '#a85e28' },                  // accent/CTA
}
```

Component classes are extracted into `@layer components` in `index.css`:
```css
.btn-primary   { @apply inline-flex items-center ... }
.input-base    { @apply w-full px-4 py-3 border ... }
.label-overline { @apply font-mono text-xs uppercase tracking-[0.15em] ... }
```

This means:
- Changing the primary button style is a one-line change in `index.css`
- Components use semantic class names (`btn-primary`) not utility strings
- The design language is consistent and documented

---

## 12. Production Readiness Checklist

| Concern | Implementation |
|---|---|
| ✅ Loading states | Skeleton cards on every data-dependent view |
| ✅ Error states | Inline error UI on ProductDetailPage, empty states everywhere |
| ✅ Form validation | Client-side validation with field-level error messages |
| ✅ Accessibility | aria-labels, role="dialog", keyboard Escape to close modals |
| ✅ Responsive design | Mobile-first, tested at sm/md/lg breakpoints |
| ✅ Performance | Code splitting, lazy images, memoised filters, staleTime config |
| ✅ Persistence | Cart + wishlist survive page refresh via localStorage |
| ✅ Feedback | Toast notifications for every user action |
| ✅ Type safety | PropTypes could be added; structure is ready for TypeScript migration |
| ✅ Env separation | Service layer is swappable; no hardcoded URLs in components |
| ⬜ Testing | Structure is ready for Vitest + React Testing Library |
| ⬜ Auth | Context pattern is ready for an AuthContext |
| ⬜ Analytics | Events can be fired in service layer mutations |

---

## 13. How to Extend This Project

### Add a real backend
1. Replace `productService.js` with real `fetch()` calls
2. Change `orderService.place()` to hit a payment endpoint
3. No component changes required

### Add authentication
```jsx
// Add AuthContext alongside CartContext
<AuthProvider>
  <CartProvider>
    ...
  </CartProvider>
</AuthProvider>
```

### Add TypeScript
1. Rename `.jsx` → `.tsx`
2. Add interfaces for `Product`, `CartItem`, `Order`
3. Type all hook return values

### Add unit tests
```jsx
// useCart.test.jsx
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '@/context/CartContext'

test('adds item to cart', () => {
  const { result } = renderHook(() => useCart(), { wrapper: CartProvider })
  act(() => result.current.addItem(mockProduct))
  expect(result.current.items).toHaveLength(1)
})
```

---

## 14. Interview Questions & Answers

**Q: Why did you use React Context instead of Redux?**
A: This app has three discrete state domains — cart, wishlist, and UI. Each is small and self-contained. Context + useReducer handles this cleanly without the overhead of Redux's action creators, reducers, selectors, and middleware. If this scaled to a large team with 20+ state slices and complex async flows, I'd switch to Redux Toolkit or Zustand.

**Q: What happens if two components call useProducts() at the same time?**
A: React Query deduplicates requests. Both components share the same cache entry. One network request fires, both components get the same data. This is a key advantage over raw useEffect + fetch patterns.

**Q: How does the cart survive a page refresh?**
A: In CartContext, a `useEffect` watches `state.items` and writes to localStorage on every change. On mount, a separate `useEffect` reads from localStorage and dispatches `LOAD_CART` to hydrate the reducer. The initial state is always `{ items: [] }` — we never pass localStorage data as the initial reducer state, because that would prevent `StrictMode` from detecting issues.

**Q: What is a Portal and why did you use one for CartDrawer?**
A: `createPortal(children, container)` renders children into a different DOM node than where the component is mounted. CartDrawer is used inside Navbar but portals to `document.body`. This ensures the drawer always renders above all other content, regardless of the `z-index` or `overflow` of the parent DOM tree.

**Q: How would you add infinite scroll to the ShopPage?**
A: Replace `useQuery` with `useInfiniteQuery` from TanStack Query. The `queryFn` receives `pageParam`, the service returns paginated data. In the component, use an `IntersectionObserver` hook to trigger `fetchNextPage()` when the last product card enters the viewport.

**Q: What's the performance impact of the useFilters hook?**
A: `filteredProducts` is wrapped in `useMemo` with `[products, category, priceRange, search, inStockOnly, sortKey]` as dependencies. The filter + sort computation (O(n log n)) only runs when those deps change. On a 10,000 product catalog, this matters significantly — without memoisation, it would rerun on every keystroke, every parent re-render.

---

*Built with React 18, TanStack Query v5, React Router v6, Tailwind CSS v3, Vite 5.*
