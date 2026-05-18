import { ArrowRight, PlayCircle } from 'lucide-react';
import type { FashionProduct } from '../../types/catalog';
import { formatCurrency } from '../../utils/formatters';
import Button from '../ui/Button';
import GlassPanel from '../ui/GlassPanel';

interface HeroSectionProps {
	heroProducts: FashionProduct[];
}

export default function HeroSection({ heroProducts }: HeroSectionProps) {
	return (
		<section
			id="hero"
			className="section-anchor relative min-h-[calc(100svh-84px)] py-12 sm:py-16 lg:py-20">
			<div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-[110px]" />
			<div className="pointer-events-none absolute -right-10 bottom-16 h-72 w-72 rounded-full bg-cyan-500/25 blur-[110px]" />

			<div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
				<div className="space-y-7">
					<p className="inline-flex rounded-full border border-white/20 bg-white/6 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">
						Luxury Streetwear 2026
					</p>

					<h1 className="editorial-heading text-balance text-5xl leading-[0.95] text-white sm:text-6xl lg:text-7xl">
						Redefine Your Style.
						<span className="mt-2 block text-gradient">
							Future of Modern Fashion.
						</span>
					</h1>

					<p className="max-w-2xl text-pretty text-base text-slate-100/85 sm:text-lg">
						Discover a curated luxury marketplace where premium streetwear,
						next-gen accessories, and editorial fashion curation meet a seamless
						shopping experience.
					</p>

					<div className="flex flex-wrap items-center gap-3 pt-1">
						<a href="#new-arrivals">
							<Button
								variant="primary"
								size="lg"
								leadingIcon={<ArrowRight size={17} />}>
								Shop Collection
							</Button>
						</a>
						<a href="#categories">
							<Button
								variant="ghost"
								size="lg"
								leadingIcon={<PlayCircle size={17} />}>
								Explore New Arrivals
							</Button>
						</a>
					</div>

					<div className="grid gap-4 pt-4 sm:grid-cols-3">
						<GlassPanel className="p-4">
							<p className="text-xs uppercase tracking-[0.2em] text-slate-300">
								Items Curated
							</p>
							<p className="mt-2 text-2xl font-semibold text-white">12K+</p>
						</GlassPanel>
						<GlassPanel className="p-4">
							<p className="text-xs uppercase tracking-[0.2em] text-slate-300">
								Daily Orders
							</p>
							<p className="mt-2 text-2xl font-semibold text-white">5.2K</p>
						</GlassPanel>
						<GlassPanel className="p-4">
							<p className="text-xs uppercase tracking-[0.2em] text-slate-300">
								Member Rating
							</p>
							<p className="mt-2 text-2xl font-semibold text-white">4.9/5</p>
						</GlassPanel>
					</div>
				</div>

				<div className="relative min-h-[520px]">
					<GlassPanel
						glow
						className="absolute inset-6 overflow-hidden rounded-[30px] border-white/25">
						<img
							src={
								heroProducts[0]?.hero_image ||
								'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80'
							}
							alt="Premium fashion highlight"
							className="h-full w-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-[#04050d]/85 via-transparent to-transparent" />
					</GlassPanel>

					{heroProducts.slice(0, 3).map((product, index) => {
						const positionClass =
							index === 0
								? '-left-6 top-10'
								: index === 1
									? '-right-4 top-36'
									: 'left-8 bottom-8';

						return (
							<GlassPanel
								key={product.id}
								className={`float-slow absolute w-56 ${positionClass} p-4`}>
								<p className="text-xs uppercase tracking-[0.2em] text-slate-300">
									{product.brand}
								</p>
								<p className="mt-2 text-sm font-semibold text-white">
									{product.name}
								</p>
								<p className="mt-2 text-sm text-cyan-100">
									{formatCurrency(product.price)}
								</p>
							</GlassPanel>
						);
					})}
				</div>
			</div>
		</section>
	);
}
