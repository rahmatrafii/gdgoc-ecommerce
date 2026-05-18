import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../services/productService';
import type { FashionProduct, Product, ProductQuery } from '../types/catalog';
import { toFashionProduct } from '../utils/fashion';

interface UseProductsResult {
	products: FashionProduct[];
	newArrivals: FashionProduct[];
	bestSellers: FashionProduct[];
	isLoading: boolean;
	error: string | null;
	refresh: () => Promise<void>;
}

const defaultQuery: ProductQuery = {
	page: 1,
	per_page: 24,
	in_stock: true,
};

export function useProducts(
	query: ProductQuery = defaultQuery,
): UseProductsResult {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const loadProducts = useCallback(
		async (showLoading: boolean) => {
			if (showLoading) {
				setIsLoading(true);
			}

			try {
				const { items } = await fetchProducts(query);
				setProducts(items);
				setError(null);
			} catch (loadError) {
				const message =
					loadError instanceof Error
						? loadError.message
						: 'Failed to load products.';
				setError(message);
			} finally {
				setIsLoading(false);
			}
		},
		[query],
	);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		void loadProducts(false);
	}, [loadProducts]);

	const refresh = useCallback(async () => {
		await loadProducts(true);
	}, [loadProducts]);

	const fashionProducts = useMemo(
		() => products.map((product, index) => toFashionProduct(product, index)),
		[products],
	);

	const newArrivals = useMemo(
		() => fashionProducts.slice(0, 8),
		[fashionProducts],
	);

	const bestSellers = useMemo(() => {
		return [...fashionProducts]
			.sort((left, right) => {
				if (right.rating === left.rating) {
					return right.review_count - left.review_count;
				}

				return right.rating - left.rating;
			})
			.slice(0, 10);
	}, [fashionProducts]);

	return {
		products: fashionProducts,
		newArrivals,
		bestSellers,
		isLoading,
		error,
		refresh,
	};
}
