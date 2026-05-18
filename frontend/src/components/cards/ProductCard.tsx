import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { FashionProduct } from '../../types/catalog';
import { cn } from '../../utils/cn';
import { formatCompactNumber, formatCurrency } from '../../utils/formatters';
import Button from '../ui/Button';

interface ProductCardProps {
	product: FashionProduct;
	onQuickAdd?: (productID: string) => Promise<void> | void;
}

export default function ProductCard({ product, onQuickAdd }: ProductCardProps) {
	const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [imageFailed, setImageFailed] = useState<boolean>(false);
	const isOutOfStock = product.stock <= 0;

	const imageSource = useMemo(() => {
		if (imageFailed) {
			return product.hero_image;
		}

		return product.images[0] || product.hero_image;
	}, [imageFailed, product.hero_image, product.images]);

	async function handleQuickAdd() {
		if (!onQuickAdd || isOutOfStock) {
			return;
		}

		try {
			setIsSubmitting(true);
			await onQuickAdd(product.id);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<article className="group relative overflow-hidden rounded-[22px] border border-white/15 bg-white/[0.03] shadow-[0_14px_48px_rgba(6,8,18,0.45)] transition duration-500 hover:-translate-y-1 hover:border-cyan-200/45 hover:shadow-[0_24px_70px_rgba(88,102,255,0.35)]">
			<div className="relative overflow-hidden">
				<img
					src={imageSource}
					alt={product.name}
					className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
					loading="lazy"
					onError={() => setImageFailed(true)}
				/>

				<div className="absolute inset-0 bg-gradient-to-t from-[#05050f]/85 via-transparent to-transparent" />

				<p className="absolute left-4 top-4 rounded-full border border-cyan-100/45 bg-[#070b20]/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100 backdrop-blur">
					{product.badge}
				</p>

				<button
					type="button"
					aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
					onClick={() => setIsWishlisted((state) => !state)}
					className="absolute right-4 top-4 rounded-full border border-white/25 bg-black/35 p-2 text-white transition hover:border-pink-200/70 hover:bg-pink-300/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-100">
					<Heart
						size={17}
						className={cn(
							'transition',
							isWishlisted ? 'fill-pink-300 text-pink-200' : '',
						)}
					/>
				</button>
			</div>

			<div className="space-y-4 p-5">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300/85">
						{product.brand}
					</p>
					<h3 className="mt-2 text-balance text-xl font-semibold text-white">
						{product.name}
					</h3>
					<p className="mt-2 line-clamp-2 text-sm text-slate-200/75">
						{product.description}
					</p>
				</div>

				<div className="flex items-center justify-between gap-4 text-sm text-slate-200/80">
					<p className="text-lg font-semibold text-white">
						{formatCurrency(product.price)}
					</p>
					<p className="inline-flex items-center gap-1">
						<Star
							size={15}
							className="fill-yellow-300 text-yellow-300"
						/>
						<span>
							{product.rating} ({formatCompactNumber(product.review_count)})
						</span>
					</p>
				</div>

				<Button
					type="button"
					variant="secondary"
					className="w-full"
					leadingIcon={<ShoppingBag size={16} />}
					onClick={handleQuickAdd}
					disabled={isSubmitting || isOutOfStock}>
					{isOutOfStock
						? 'Out of Stock'
						: isSubmitting
							? 'Adding...'
							: 'Quick Add to Cart'}
				</Button>
			</div>
		</article>
	);
}
