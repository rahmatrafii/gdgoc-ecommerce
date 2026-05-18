# 📋 Master To-Do List — E-Commerce Backend

> **Checklist pengembangan proyek E-Commerce Backend.**  
> Update status setiap kali ada progress.

---

## Phase 0: Project Setup ⚙️

- [x] Initialize Go module (`go mod init`)
- [x] Setup project folder structure (clean architecture)
- [x] Setup MongoDB Atlas connection
- [x] Create configuration management (env vars)
- [x] Setup Makefile
- [x] Setup `.gitignore` & `.env.example`
- [x] Setup `golangci-lint` configuration
- [x] Setup Swagger (Swaggo)
- [x] Setup build artifact binary untuk staging/production
- [x] Setup basic middleware (CORS, logging, recovery)
- [x] Setup standard response helpers

---

## Phase 1: Authentication & User Management 🔐

- [x] **Domain Layer**
  - [x] User entity
  - [x] UserRepository interface
  - [x] AuthUseCase interface
  - [x] Domain errors
  - [x] Request/Response DTOs

- [x] **Repository Layer**
  - [x] MongoDB User repository implementation
  - [x] Create indexes (email unique)

- [x] **UseCase Layer**
  - [x] Register use case
  - [x] Login use case
  - [x] Refresh token use case
  - [x] Password hashing (bcrypt)
  - [x] JWT token generation

- [x] **Handler Layer**
  - [x] Register handler + Swagger
  - [x] Login handler + Swagger
  - [x] Refresh handler + Swagger
  - [x] Auth middleware (JWT validation)

- [x] **Testing**
  - [x] Domain validation tests
  - [x] UseCase unit tests (mock repo)
  - [x] Handler HTTP tests
  - [x] Integration tests

---

## Phase 2: Product Catalog 📦

- [x] **Domain Layer**
  - [x] Product entity
  - [x] Category entity
  - [x] ProductRepository interface
  - [x] CategoryRepository interface

- [x] **Repository Layer**
  - [x] MongoDB Product repository
  - [x] MongoDB Category repository
  - [x] Search & filter implementation
  - [x] Pagination implementation

- [x] **UseCase Layer**
  - [x] Product CRUD use cases
  - [x] Category CRUD use cases
  - [x] Product search & filter

- [x] **Handler Layer**
  - [x] Product handlers + Swagger
  - [x] Category handlers + Swagger

- [x] **Testing**
  - [x] Unit tests
  - [x] Integration tests

---

## Phase 3: Shopping Cart 🛒

- [x] **Domain Layer**
  - [x] Cart entity
  - [x] CartRepository interface

- [x] **Repository Layer**
  - [x] MongoDB Cart repository

- [x] **UseCase Layer**
  - [x] Add/Remove/Update cart items
  - [x] Stock validation
  - [x] Cart total calculation

- [x] **Handler Layer**
  - [x] Cart handlers + Swagger

- [x] **Testing**
  - [x] Unit tests
  - [x] Integration tests

---

## Phase 4: Order Management 📑

- [x] **Domain Layer**
  - [x] Order entity
  - [x] OrderRepository interface
  - [x] Order status enum & state machine

- [x] **Repository Layer**
  - [x] MongoDB Order repository

- [x] **UseCase Layer**
  - [x] Checkout (cart → order)
  - [x] Order status management
  - [x] Stock deduction on order

- [x] **Handler Layer**
  - [x] Order handlers + Swagger

- [x] **Testing**
  - [x] Unit tests
  - [x] Integration tests

---

## Phase 5: Payment 💳

- [ ] **Domain Layer**
  - [ ] Payment entity
  - [ ] PaymentRepository interface

- [ ] **Repository & UseCase**
  - [ ] Payment processing
  - [ ] Payment status tracking

- [ ] **Handler Layer**
  - [ ] Payment handlers + Swagger

---

## Phase 6: Reviews & Admin ⭐🛡️

- [ ] **Reviews**
  - [ ] Review CRUD
  - [ ] Rating calculation

- [ ] **Admin Panel**
  - [ ] User management
  - [ ] Order management
  - [ ] Dashboard statistics

---

## Phase 7: Polish & Optimization 🔧

- [ ] Rate limiting middleware
- [ ] Request validation middleware
- [ ] API versioning
- [ ] Database indexing optimization
- [ ] Error response standardization
- [ ] Performance testing
- [ ] Security audit
- [ ] Documentation review
- [ ] CI/CD pipeline setup

---

## Phase 8: Frontend Landing Experience (React) 🎨⚛️

- [x] Initialize frontend project with Vite + React + TypeScript
- [x] Configure Tailwind-based styling workflow
- [x] Add local premium fonts into project assets
- [x] Build reusable component system (`components/ui`, `components/cards`)
- [x] Implement 11-section luxury landing page
- [x] Integrate backend API via `services/` and custom `hooks/`
- [x] Add quick add-to-cart flow (auth-aware)
- [x] Ensure responsive desktop/mobile behavior
- [x] Run frontend lint checks (`npm run lint`)
- [x] Run frontend production build (`npm run build`)

---

## 📈 Progress Tracker

| Phase | Status | Progress |
|-------|--------|----------|
| Phase 0: Setup | ✅ Done | 100% |
| Phase 1: Auth & User | ✅ Done | 100% |
| Phase 2: Products | ✅ Done | 100% |
| Phase 3: Cart | ✅ Done | 100% |
| Phase 4: Orders | ✅ Done | 100% |
| Phase 5: Payment | 📋 Not Started | 0% |
| Phase 6: Reviews & Admin | 📋 Not Started | 0% |
| Phase 7: Polish | 📋 Not Started | 0% |
| Phase 8: Frontend Landing | ✅ Done | 100% |

---

*Terakhir diperbarui: 2026-05-17*
