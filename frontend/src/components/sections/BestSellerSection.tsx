import type { FashionProduct } from '../../types/catalog';
import ProductCard from '../cards/ProductCard';
import SectionHeading from '../ui/SectionHeading';

interface BestSellerSectionProps {
	products: FashionProduct[];
	onQuickAdd: (productID: string) => Promise<void> | void;
}

export default function BestSellerSection({
	products,
	onQuickAdd,
}: BestSellerSectionProps) {
	return (
		<section
			id="best-sellers"
			className="section-anchor py-20">
			<SectionHeading
				eyebrow="Best Seller Collection"
				title="Trending Essentials in Cinematic Product Presentation"
				description="A horizontal luxury carousel with elevated card styling for fast discovery and stylish browsing."
			/>

			<div className="no-scrollbar mt-10 flex snap-x gap-6 overflow-x-auto pb-4">
				{products.map((product) => (
					<div
						key={product.id}
						className="min-w-[290px] max-w-[290px] snap-start lg:min-w-[320px]">
						<ProductCard
							product={product}
							onQuickAdd={onQuickAdd}
						/>
					</div>
				))}
			</div>
		</section>
	);
}
