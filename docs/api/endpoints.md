# API Endpoints - Current Backend Implementation

This document reflects endpoints currently implemented in `backend/internal/delivery/http/router/router.go`.

## Base URL

```
http://localhost:<PORT>/api/v1
```

`PORT` follows backend env (`PORT`, default `8080`).

## Public Endpoints

### Health

```
GET /health
```

### Swagger

```
GET /swagger/*
```

### Auth

```
POST /auth/register
POST /auth/login
POST /auth/forgot-password
POST /auth/reset-password
```

### Categories

```
GET /categories
GET /categories/{id}
```

### Products

```
GET /products
GET /products/{id}
```

Supported product query params:

- `page`
- `per_page`
- `category`
- `min_price`
- `max_price`
- `in_stock`
- `q`

## Authenticated Endpoints

Require header:

```
Authorization: Bearer <access_token>
```

### Auth

```
POST /auth/logout
```

### Cart

```
GET /cart
POST /cart/items
PUT /cart/items/{productId}
DELETE /cart/items/{productId}
DELETE /cart
```

### Orders

```
POST /orders
GET /orders
GET /orders/{id}
PUT /orders/{id}/cancel
```

## Admin-Only Endpoints

User must be authenticated and role `admin`.

### Categories

```
POST /categories
PUT /categories/{id}
```

### Products

```
POST /products
PUT /products/{id}
DELETE /products/{id}
```

### Orders

```
PUT /admin/orders/{id}/status
```

## Notes

- This project currently does **not** expose user profile, payment, or review endpoints.
- For request/response schema details, use Swagger:

```
http://localhost:<PORT>/swagger/index.html
```