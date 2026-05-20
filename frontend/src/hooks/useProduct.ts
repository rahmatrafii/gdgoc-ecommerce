import { useCallback, useEffect, useState } from 'react';
import { fetchProductById } from '../services/productService';
import type { FashionProduct, Product } from '../types/catalog';
import { toFashionProduct } from '../utils/fashion';

interface UseProductResult {
	product: FashionProduct | null;
	isLoading: boolean;
	error: string | null;
	refresh: () => Promise<void>;
}

export function useProduct(id?: string): UseProductResult {
	const [product, setProduct] = useState<Product | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const loadProduct = useCallback(
		async (showLoading: boolean) => {
			if (!id) {
				setIsLoading(false);
				return;
			}

			if (showLoading) {
				setIsLoading(true);
			}

			try {
				const data = await fetchProductById(id);
				setProduct(data);
				setError(null);
			} catch (loadError) {
				const message =
					loadError instanceof Error
						? loadError.message
						: 'Failed to load product.';
				setError(message);
			} finally {
				setIsLoading(false);
			}
		},
		[id],
	);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		void loadProduct(true);
	}, [loadProduct]);

	const refresh = useCallback(async () => {
		await loadProduct(true);
	}, [loadProduct]);

	const fashionProduct = product ? toFashionProduct(product, 0) : null;

	return {
		product: fashionProduct,
		isLoading,
		error,
		refresh,
	};
}
