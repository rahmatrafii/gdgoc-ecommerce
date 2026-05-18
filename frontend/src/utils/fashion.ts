import type { FashionProduct, Product, ProductBadge } from '../types/catalog';
import { clampRating } from './formatters';

const brandPool = [
	'Aether Mode',
	'Noir Circuit',
	'Urban Halo',
	'Monolith Co',
	'Silverline Studio',
	'Pulse Atelier',
	'Elevn Street',
	'Nexus Archive',
];

const fallbackImages = [
	'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
	'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1200&q=80',
	'https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&w=1200&q=80',
	'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
	'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
	'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?auto=format&fit=crop&w=1200&q=80',
	'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80',
	'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80',
];

function hashString(input: string): number {
	let hash = 0;

	for (let index = 0; index < input.length; index += 1) {
		hash = (hash << 5) - hash + input.charCodeAt(index);
		hash |= 0;
	}

	return Math.abs(hash);
}

function resolveBadge(seed: number): ProductBadge {
	if (seed % 9 === 0) {
		return 'Limited Drop';
	}

	if (seed % 2 === 0) {
		return 'Best Seller';
	}

	return 'New';
}

export function toFashionProduct(
	product: Product,
	index: number,
): FashionProduct {
	const seed = hashString(`${product.id}-${product.name}-${index}`);
	const baseRating = 3.7 + (seed % 15) / 10;
	const selectedImage =
		product.images.length > 0
			? product.images[0]
			: fallbackImages[seed % fallbackImages.length];

	return {
		...product,
		brand: brandPool[seed % brandPool.length],
		rating: clampRating(baseRating),
		review_count: 120 + (seed % 4600),
		hero_image: selectedImage,
		badge: resolveBadge(seed),
	};
}
