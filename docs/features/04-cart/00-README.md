# 🛒 Feature: Shopping Cart

> **Status**: ✅ Done (Phase 3)  
> **Priority**: 🔴 High — Fitur #4, diimplementasi setelah Product

---

## 📂 Isi Folder

| # | File | Sub-Feature | Status |
|---|------|-------------|--------|
| 1 | [get-cart.md](get-cart.md) | Lihat Cart User | ✅ Done |
| 2 | [add-item.md](add-item.md) | Tambah Item ke Cart | ✅ Done |
| 3 | [update-item.md](update-item.md) | Update Quantity Item | ✅ Done |
| 4 | [remove-item.md](remove-item.md) | Hapus Item dari Cart | ✅ Done |
| 5 | [clear-cart.md](clear-cart.md) | Kosongkan Cart | ✅ Done |

---

## 🏗️ Urutan Implementasi

```
1. Domain Layer   → Cart, CartItem entities, DTOs, interfaces
2. Repository     → MongoDB Cart repo (GetByUserID, Save, Delete)
3. UseCase        → Cart logic (stock check, price sync, total calc)
4. Handler        → HTTP handlers + Swagger
5. Router         → All endpoints require auth
6. Tests          → Unit tests per layer
```

---

## 📐 Arsitektur

```
backend/internal/
├── domain/cart.go           → Entities + DTOs + Interfaces
├── usecase/cart_usecase.go  → Business logic + test
├── repository/mongo/cart_repository.go → MongoDB + test
└── delivery/http/
    ├── handler/cart_handler.go → Handlers + test
    └── router/router.go       → RegisterCartRoutes
```

---

## ⚙️ Business Rules

1. Semua endpoint membutuhkan auth (JWT)
2. 1 user = 1 active cart
3. Stok dicek saat add/update (tanpa reserve)
4. Harga selalu di-sync dari produk terbaru
5. Quantity <= 0 → auto remove item
6. Optimistic locking via `version` field
7. Cart auto-clear setelah checkout (Order usecase)
8. `image_url` produk disimpan saat add/update item, dan di-populasi secara dinamis saat `GetCart` untuk data lama yang belum punya `image_url`

---

## 🔗 Dependencies

- **Depends on**: Auth, Product (stock + price lookup)
- **Depended by**: Order (checkout reads cart)

---

*Terakhir diperbarui: 2026-05-20*
