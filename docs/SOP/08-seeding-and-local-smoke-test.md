# SOP 08 - Seeding Data and Local Smoke Test

> **Tujuan**: memastikan backend berisi data awal yang dibutuhkan frontend landing, lalu memverifikasi integrasi end-to-end secara cepat.

---

## 1) Setup Environment

### Backend

```bash
cd backend
cp .env.example .env
```

Pastikan minimal variabel ini terisi:

- `PORT`
- `MONGODB_URI`
- `DB_NAME`
- `JWT_SECRET`
- `JWT_EXPIRED_HOURS` (atau alias `JWT_EXPIRATION_HOURS`)

### Frontend

```bash
cd frontend
cp .env.example .env
```

Set `VITE_API_URL` sesuai backend aktif (contoh: `http://localhost:8081/api/v1`).

---

## 2) Seed Data Backend

Jalankan seeding untuk kategori + produk landing page:

```bash
cd backend
make seed
```

Alternatif:

```bash
go run cmd/seed/main.go
```

Seeder bersifat upsert berdasarkan nama sehingga aman dijalankan berulang.

---

## 3) Run Services

### Backend

```bash
cd backend
make run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 4) Smoke Test API

Jalankan command berikut:

```bash
curl http://localhost:8081/health
curl "http://localhost:8081/api/v1/categories"
curl "http://localhost:8081/api/v1/products?page=1&per_page=8&in_stock=true"
```

Ekspektasi:

- `/health` mengembalikan `success: true`
- `/categories` berisi array kategori
- `/products` berisi array produk + `meta`

---

## 5) Smoke Test Frontend UX

Checklist manual di landing page:

- New Arrivals tidak menampilkan state kosong default
- Filter produk berfungsi (search, category, in-stock)
- Tombol `Retry Fetching Products` dan `Retry Fetching Categories` berfungsi
- Tombol `Shop Limited Drop` memicu filter + scroll ke katalog
- Quick Add nonaktif untuk produk stok habis
- Footer links tidak lagi `#` placeholder

---

## 6) Troubleshooting Cepat

Jika produk masih kosong:

1. Jalankan ulang `make seed`
2. Cek `DB_NAME` backend mengarah ke database yang benar
3. Cek `VITE_API_URL` frontend ke port backend aktif

Jika request gagal konek:

1. Cek backend listen di port yang benar
2. Cek log backend untuk error Mongo/auth
3. Pastikan CORS tidak dibatasi untuk origin frontend saat local dev