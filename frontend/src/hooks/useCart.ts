import { useEffect, useState } from 'react';
import {
	getCart,
	removeItemFromCart,
	updateItemQuantity,
} from '../services/cartService';
import type { CartResponse } from '../types/catalog';

export function useCart() {
	const [cart, setCart] = useState<CartResponse | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	const fetchCart = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const data = await getCart();
			setCart(data);
		} catch (err) {
			setError(err instanceof Error ? err : new Error('Failed to fetch cart'));
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchCart();
	}, []);

	const updateQuantity = async (productID: string, quantity: number) => {
		try {
			const updatedCart = await updateItemQuantity(productID, quantity);
			setCart(updatedCart);
		} catch (err) {
			setError(err instanceof Error ? err : new Error('Failed to update quantity'));
		}
	};

	const removeItem = async (productID: string) => {
		try {
			const updatedCart = await removeItemFromCart(productID);
			setCart(updatedCart);
		} catch (err) {
			setError(err instanceof Error ? err : new Error('Failed to remove item'));
		}
	};

	return {
		cart,
		isLoading,
		error,
		updateQuantity,
		removeItem,
		refresh: fetchCart,
	};
}
