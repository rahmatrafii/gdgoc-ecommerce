# 🛒 Get Cart — Lihat Cart

**Status**: ✅ Done | **Priority Order**: #4.1

## Endpoint: `GET /api/v1/cart` | Auth: ☑ Required

## Response (200)

```json
{
    "success": true,
    "message": "Cart retrieved successfully",
    "data": {
        "user_id": "664a...",
        "items": [
            {
                "product_id": "665c...",
                "name": "Laptop",
                "price": 15000000,
                "quantity": 2,
                "sub_total": 30000000,
                "image_url": "https://images.unsplash.com/photo-xxx?auto=format&fit=crop&w=800&q=80"
            }
        ],
        "total_amount": 30000000,
        "updated_at": "..."
    }
}
```

## Notes

- Jika belum punya cart → return cart kosong (items: [], total: 0) tanpa save ke DB.
- Field `image_url` di-populasi secara dinamis dari data produk (`product.Images[0]`) saat retrieval. Ini memastikan data cart lama yang tersimpan di MongoDB tanpa `image_url` tetap mendapatkan gambar produk secara otomatis.
