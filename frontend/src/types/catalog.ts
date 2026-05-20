import type { PaginationMeta } from './api';

export interface Category {
	id: string;
	name: string;
	description: string;
	created_at: string;
	updated_at: string;
}

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
	category_id: string;
	images: string[];
	created_at: string;
	updated_at: string;
}

export interface ProductQuery {
	page?: number;
	per_page?: number;
	category?: string;
	min_price?: number;
	max_price?: number;
	in_stock?: boolean;
	q?: string;
}

export interface ProductListResult {
	items: Product[];
	meta: PaginationMeta | null;
	message: string;
}

export type ProductBadge = 'Limited Drop' | 'New' | 'Best Seller';

export interface FashionProduct extends Product {
	brand: string;
	rating: number;
	review_count: number;
	hero_image: string;
	badge: ProductBadge;
}

export interface CartLineItem {
	product_id: string;
	name: string;
	price: number;
	quantity: number;
	sub_total: number;
	image_url?: string;
}

export interface CartResponse {
	user_id: string;
	total_amount: number;
	updated_at: string;
	items: CartLineItem[];
}
