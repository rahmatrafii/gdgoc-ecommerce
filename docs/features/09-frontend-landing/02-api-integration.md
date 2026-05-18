# API Integration: Frontend Landing to Backend

## Base URL Strategy

- Primary env: `VITE_API_URL` (declared in `frontend/.env.example`)
- Current local default in example: `http://localhost:8081/api/v1`
- Built-in fallback candidates (when `VITE_API_URL` is not set):
  - `http://localhost:8080/api/v1`
  - `http://localhost:8081/api/v1`
  - `http://localhost:18080/api/v1`

This fallback is implemented in `frontend/src/services/apiClient.ts` to prevent blank data when local backend port changes.

## Service Layer

All API calls are isolated under `frontend/src/services`:

- `apiClient.ts`
  - Generic fetch wrapper, error normalization (`ApiRequestError`), and query helper.
  - Smart local fallback across common backend ports.
- `productService.ts`
  - `GET /products` with query params (`page`, `per_page`, `category`, `q`, `in_stock`, etc).
- `categoryService.ts`
  - `GET /categories`.
- `cartService.ts`
  - `POST /cart/items` with bearer token when available.
  - Guest fallback via local storage when token is absent or unauthorized.

## Hooks Layer

- `useProducts.ts`
  - Fetches product list from backend using `ProductQuery`.
  - Transforms backend product entities into UI-oriented fashion cards.
  - Exposes `newArrivals` and `bestSellers` slices.
- `useCategories.ts`
  - Fetches categories and exposes loading/error/retry state.
- `useCountdown.ts`
  - Supports limited-drop timer display.

## Landing Page Data Flow

- `LandingPage.tsx` controls product query state:
  - Search keyword (`q`)
  - Category filter (`category`)
  - In-stock toggle (`in_stock`)
- `NewArrivalsSection.tsx` provides filter controls and forwards changes to `LandingPage`.
- `LimitedEditionSection.tsx` CTA now triggers a product filter action (`q=limited`) and scrolls users to catalog.

## Error Handling & Retry UX

- Request failures throw `ApiRequestError`.
- UI now exposes retry actions in both:
  - `NewArrivalsSection` (products)
  - `CategoriesSection` (categories)
- Empty product state is context-aware:
  - No data from backend: prompts seeding + retry
  - Active filter with no match: prompts filter reset

## Cart & Quick Shopping Behavior

- Quick Add button is disabled for out-of-stock products.
- Navbar cart shortcut scrolls to catalog and shows guest cart summary from local storage.
- If authentication exists, cart mutation is sent to backend; otherwise guest cart remains functional.