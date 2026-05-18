import type {
	Product,
	ProductListResult,
	ProductQuery,
} from '../types/catalog';
import { apiRequest, buildQueryString } from './apiClient';

export async function fetchProducts(
	query: ProductQuery = {},
): Promise<ProductListResult> {
	const queryString = buildQueryString(query);
	const response = await apiRequest<Product[]>(`/products${queryString}`);

	return {
		items: Array.isArray(response.data) ? response.data : [],
		meta: response.meta ?? null,
		message: response.message,
	};
}
