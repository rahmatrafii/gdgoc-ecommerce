import type { Category } from '../types/catalog';
import { apiRequest } from './apiClient';

export async function fetchCategories(): Promise<Category[]> {
	const response = await apiRequest<Category[]>('/categories');
	return Array.isArray(response.data) ? response.data : [];
}
