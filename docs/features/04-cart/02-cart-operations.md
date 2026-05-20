# 🛒 Add Item — Tambah Item ke Cart

**Status**: ✅ Done | **Priority Order**: #4.2

## Endpoint: `POST /api/v1/cart/items` | Auth: ☑ Required

## Request

```json
{ "product_id": "665c...", "quantity": 2 }
```

## Business Rules

1. Cek produk exists → 404 jika tidak ada
2. Jika item sudah ada di cart → quantity ditambahkan (bukan replace)
3. Cek stok: `product.Stock >= newQuantity` → 400 jika insufficient
4. Harga diambil dari data produk terbaru
5. SubTotal = price × quantity
6. Total cart di-recalculate
7. `image_url` diambil dari `product.Images[0]` dan disimpan bersama item di cart

## Response (200)

```json
{
    "success": true,
    "message": "Item added to cart successfully",
    "data": {
        "user_id": "664a...",
        "items": [
            {
                "product_id": "665c...",
                "name": "Aero Glide Pro",
                "price": 1299000,
                "quantity": 1,
                "sub_total": 1299000,
                "image_url": "https://images.unsplash.com/photo-xxx?auto=format&fit=crop&w=800&q=80"
            }
        ],
        "total_amount": 1299000,
        "updated_at": "..."
    }
}
```

## Errors: 404 `NOT_FOUND`, 400 `INSUFFICIENT_STOCK`, 409 `CONFLICT`

---

# 🛒 Update Item — Update Quantity

**Status**: ✅ Done | **Priority Order**: #4.3

## Endpoint: `PUT /api/v1/cart/items/{productId}` | Auth: ☑ Required

## Request: `{ "quantity": 3 }` | Quantity <= 0 → auto remove item

## Business Rules

- Harga dan `image_url` di-update dari data produk terbaru saat quantity diubah

## Errors: 404 `NOT_FOUND`, 400 `INSUFFICIENT_STOCK`

---

# 🛒 Remove Item — Hapus Item

**Status**: ✅ Done | **Priority Order**: #4.4

## Endpoint: `DELETE /api/v1/cart/items/{productId}` | Auth: ☑ Required

## Error: 404 `NOT_FOUND` jika item tidak ada di cart

---

# 🛒 Clear Cart — Kosongkan Cart

**Status**: ✅ Done | **Priority Order**: #4.5

## Endpoint: `DELETE /api/v1/cart` | Auth: ☑ Required

Menghapus seluruh cart dari database.
