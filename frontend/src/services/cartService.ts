import type { CartResponse } from '../types/catalog';
import { apiRequest } from './apiClient';

function getAuthToken(): string | null {
	if (typeof window === 'undefined') {
		return null;
	}

	return (
		window.localStorage.getItem('access_token') ||
		window.localStorage.getItem('token')
	);
}

export async function addItemToCart(
	productID: string,
	quantity = 1,
): Promise<CartResponse> {
	const authToken = getAuthToken();

	if (!authToken) {
		throw new Error('Unauthorized');
	}

	const response = await apiRequest<CartResponse>('/cart/items', {
		method: 'POST',
		authToken,
		body: JSON.stringify({
			product_id: productID,
			quantity,
		}),
	});

	return response.data;
}

export async function getCart(): Promise<CartResponse> {
	const authToken = getAuthToken();

	if (!authToken) {
		throw new Error('Unauthorized');
	}

	const response = await apiRequest<CartResponse>('/cart', {
		method: 'GET',
		authToken,
	});

	return response.data;
}

export async function updateItemQuantity(
	productID: string,
	quantity: number,
): Promise<CartResponse> {
	const authToken = getAuthToken();

	if (!authToken) {
		throw new Error('Unauthorized');
	}

	if (quantity <= 0) {
		return removeItemFromCart(productID);
	}

	const response = await apiRequest<CartResponse>(`/cart/items/${productID}`, {
		method: 'PUT',
		authToken,
		body: JSON.stringify({
			product_id: productID,
			quantity,
		}),
	});

	return response.data;
}

export async function removeItemFromCart(
	productID: string,
): Promise<CartResponse> {
	const authToken = getAuthToken();

	if (!authToken) {
		throw new Error('Unauthorized');
	}

	const response = await apiRequest<CartResponse>(`/cart/items/${productID}`, {
		method: 'DELETE',
		authToken,
	});

	return response.data;
}
