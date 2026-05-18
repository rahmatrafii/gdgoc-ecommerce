import type { CartResponse } from '../types/catalog';
import { apiRequest, ApiRequestError } from './apiClient';

function getAuthToken(): string | null {
	if (typeof window === 'undefined') {
		return null;
	}

	return (
		window.localStorage.getItem('access_token') ||
		window.localStorage.getItem('token')
	);
}

function addItemToGuestCart(productID: string, quantity: number): CartResponse {
	if (typeof window === 'undefined') {
		return {
			user_id: 'guest',
			total_amount: 0,
			updated_at: new Date().toISOString(),
			items: [],
		};
	}

	const storageKey = 'guest_cart_items';
	const existingRaw = window.localStorage.getItem(storageKey);
	const existingItems = existingRaw ? JSON.parse(existingRaw) : [];

	const currentIndex = existingItems.findIndex(
		(item: { product_id: string }) => item.product_id === productID,
	);

	if (currentIndex >= 0) {
		existingItems[currentIndex].quantity += quantity;
	} else {
		existingItems.push({
			product_id: productID,
			name: 'Selected Product',
			price: 0,
			quantity,
			sub_total: 0,
		});
	}

	window.localStorage.setItem(storageKey, JSON.stringify(existingItems));

	return {
		user_id: 'guest',
		total_amount: 0,
		updated_at: new Date().toISOString(),
		items: existingItems,
	};
}

export async function addItemToCart(
	productID: string,
	quantity = 1,
): Promise<CartResponse> {
	const authToken = getAuthToken();

	if (!authToken) {
		return addItemToGuestCart(productID, quantity);
	}

	try {
		const response = await apiRequest<CartResponse>('/cart/items', {
			method: 'POST',
			authToken,
			body: JSON.stringify({
				product_id: productID,
				quantity,
			}),
		});

		return response.data;
	} catch (error) {
		if (
			error instanceof ApiRequestError &&
			(error.status === 401 || error.status === 403)
		) {
			return addItemToGuestCart(productID, quantity);
		}

		throw error;
	}
}
