import { useCallback, useEffect, useState } from 'react';
import { fetchCategories } from '../services/categoryService';
import type { Category } from '../types/catalog';

interface UseCategoriesResult {
	categories: Category[];
	isLoading: boolean;
	error: string | null;
	refresh: () => Promise<void>;
}

export function useCategories(): UseCategoriesResult {
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const loadCategories = useCallback(async (showLoading: boolean) => {
		if (showLoading) {
			setIsLoading(true);
		}

		try {
			const data = await fetchCategories();
			setCategories(data);
			setError(null);
		} catch (loadError) {
			const message =
				loadError instanceof Error
					? loadError.message
					: 'Failed to load categories.';
			setError(message);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		void loadCategories(false);
	}, [loadCategories]);

	const refresh = useCallback(async () => {
		await loadCategories(true);
	}, [loadCategories]);

	return {
		categories,
		isLoading,
		error,
		refresh,
	};
}
