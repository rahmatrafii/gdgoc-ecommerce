import { ArrowLeft, Check, Heart, ShoppingBag, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BestSellerSection from '../components/sections/BestSellerSection';
import FooterSection from '../components/sections/FooterSection';
import Navbar from '../components/sections/Navbar';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { useProduct } from '../hooks/useProduct';
import { useProducts } from '../hooks/useProducts';
import { ApiRequestError } from '../services/apiClient';
import { addItemToCart } from '../services/cartService';
import { cn } from '../utils/cn';
import { formatCompactNumber, formatCurrency } from '../utils/formatters';

type BannerTone = 'success' | 'error';

interface BannerState {
	message: string;
	tone: BannerTone;
}

export default function ProductDetailPage() {
	const { id } = useParams<{ id: string }>();
	const { product, isLoading, error } = useProduct(id);
	const { bestSellers } = useProducts();
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const [banner, setBanner] = useState<BannerState | null>(null);
	const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
	const [isAdding, setIsAdding] = useState<boolean>(false);
	const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [id]);

	useEffect(() => {
		if (!banner) {
			return;
		}
		const timeoutID = window.setTimeout(() => {
			setBanner(null);
		}, 3200);
		return () => {
			window.clearTimeout(timeoutID);
		};
	}, [banner]);

	const images = product
		? product.images.length > 0
			? product.images
			: [product.hero_image]
		: [];

	async function handleAddToCart() {
		if (!isAuthenticated) {
			navigate('/login');
			return;
		}

		if (!product || product.stock <= 0) {
			return;
		}

		try {
			setIsAdding(true);
			await addItemToCart(product.id, 1);
			setBanner({
				message: 'Item added to cart successfully.',
				tone: 'success',
			});
		} catch (err) {
			if (err instanceof ApiRequestError && err.status === 401) {
				setBanner({
					message: 'Please sign in first to add products to cart.',
					tone: 'error',
				});
				return;
			}
			setBanner({
				message: 'Unable to add item to cart right now. Please try again.',
				tone: 'error',
			});
		} finally {
			setIsAdding(false);
		}
	}

	async function handleQuickAdd(productID: string) {
		if (!isAuthenticated) {
			navigate('/login');
			return;
		}

		try {
			await addItemToCart(productID, 1);
			setBanner({
				message: 'Item added to cart successfully.',
				tone: 'success',
			});
		} catch (err) {
			if (err instanceof ApiRequestError && err.status === 401) {
				setBanner({
					message: 'Please sign in first to add products to cart.',
					tone: 'error',
				});
				return;
			}
			setBanner({
				message: 'Unable to add item to cart right now. Please try again.',
				tone: 'error',
			});
		}
	}

	return (
		<div className="luxury-background min-h-screen text-white">
			<Navbar />

			<main className="mx-auto w-full max-w-[1240px] px-4 pb-24 pt-24 sm:px-6 lg:px-10">
				{isLoading ? (
					<div className="flex min-h-[50vh] items-center justify-center">
						<div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"></div>
					</div>
				) : error || !product ? (
					<div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
						<h2 className="text-2xl font-bold text-white">Product Not Found</h2>
						<p className="mt-2 text-slate-300">
							{error || "The product you're looking for doesn't exist."}
						</p>
						<Link
							to="/"
							className="mt-6 inline-flex items-center gap-2 text-cyan-400 transition hover:text-cyan-300">
							<ArrowLeft size={16} />
							Back to Home
						</Link>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
						{/* Left Column - Image Gallery */}
						<div className="space-y-4">
							<div className="group relative overflow-hidden rounded-[22px] border border-white/15 bg-white/[0.03] shadow-[0_14px_48px_rgba(6,8,18,0.45)]">
								<img
									src={images[activeImageIndex]}
									alt={product.name}
									className="h-auto max-h-[600px] w-full object-cover transition duration-700 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#05050f]/60 via-transparent to-transparent pointer-events-none" />
								{product.badge && (
									<p className="absolute left-6 top-6 rounded-full border border-cyan-100/45 bg-[#070b20]/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100 backdrop-blur">
										{product.badge}
									</p>
								)}
							</div>
							
							{/* Thumbnails */}
							{images.length > 1 && (
								<div className="grid grid-cols-4 gap-4">
									{images.map((img, index) => (
										<button
											key={index}
											type="button"
											onClick={() => setActiveImageIndex(index)}
											className={cn(
												'relative overflow-hidden rounded-[14px] border transition',
												activeImageIndex === index
													? 'border-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
													: 'border-white/15 opacity-60 hover:opacity-100'
											)}>
											<img
												src={img}
												alt={`${product.name} thumbnail ${index + 1}`}
												className="aspect-square w-full object-cover"
											/>
										</button>
									))}
								</div>
							)}
						</div>

						{/* Right Column - Product Details */}
						<div className="flex flex-col justify-center space-y-8 lg:py-10">
							<div>
								<p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
									{product.brand}
								</p>
								<h1 className="mt-3 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
									{product.name}
								</h1>
							</div>

							<div className="flex items-end justify-between border-b border-white/10 pb-6">
								<p className="text-3xl font-semibold text-white">
									{formatCurrency(product.price)}
								</p>
								<div className="flex items-center gap-2">
									<div className="flex gap-0.5">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												size={18}
												className={cn(
													i < Math.floor(product.rating)
														? 'fill-yellow-300 text-yellow-300'
														: 'fill-white/10 text-white/20'
												)}
											/>
										))}
									</div>
									<span className="text-sm text-slate-300">
										{product.rating.toFixed(1)} ({formatCompactNumber(product.review_count)})
									</span>
								</div>
							</div>

							<div className="space-y-4">
								<h3 className="text-lg font-semibold text-white">Description</h3>
								<p className="leading-relaxed text-slate-300/85">
									{product.description}
								</p>
							</div>

							<div className="space-y-6 pt-4">
								<div className="flex items-center gap-3 text-sm">
									{product.stock > 0 ? (
										<>
											<div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
												<Check size={14} />
											</div>
											<span className="text-emerald-300">In Stock and ready to ship</span>
										</>
									) : (
										<>
											<div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
												<div className="h-1.5 w-1.5 rounded-full bg-rose-400"></div>
											</div>
											<span className="text-rose-300">Currently out of stock</span>
										</>
									)}
								</div>

								<div className="flex gap-4">
									<Button
										type="button"
										variant="secondary"
										className="flex-1 py-4 text-base"
										leadingIcon={<ShoppingBag size={20} />}
										onClick={handleAddToCart}
										disabled={isAdding || product.stock <= 0}>
										{product.stock <= 0
											? 'Out of Stock'
											: isAdding
												? 'Adding...'
												: 'Add to Cart'}
									</Button>
									
									<button
										type="button"
										aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
										onClick={() => {
											if (!isAuthenticated) {
												navigate('/login');
												return;
											}
											setIsWishlisted((state) => !state);
										}}
										className={cn(
											"flex items-center justify-center rounded-xl border border-white/25 px-6 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-100",
											isWishlisted 
												? "bg-pink-300/20 border-pink-200/70 text-pink-200" 
												: "bg-black/35 hover:border-pink-200/70 hover:bg-pink-300/20 hover:text-pink-200"
										)}>
										<Heart
											size={24}
											className={cn(
												'transition',
												isWishlisted ? 'fill-pink-300 text-pink-200' : '',
											)}
										/>
									</button>
								</div>
							</div>
						</div>
					</div>
				)}

				{!isLoading && !error && product && bestSellers.length > 0 && (
					<div className="mt-32">
						<BestSellerSection
							products={bestSellers}
							onQuickAdd={handleQuickAdd}
						/>
					</div>
				)}
			</main>

			<FooterSection />

			{banner ? (
				<div
					className={`fixed right-4 top-24 z-50 rounded-2xl border px-4 py-3 text-sm backdrop-blur-xl transition ${
						banner.tone === 'success'
							? 'border-emerald-200/45 bg-emerald-500/18 text-emerald-100'
							: 'border-rose-200/45 bg-rose-500/18 text-rose-100'
					}`}>
					{banner.message}
				</div>
			) : null}
		</div>
	);
}
