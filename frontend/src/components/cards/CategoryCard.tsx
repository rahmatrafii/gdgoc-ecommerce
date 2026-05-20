import { Link } from 'react-router-dom';
import type { CategoryVisual } from '../../utils/mockData';

interface CategoryCardProps {
	category: CategoryVisual;
	categoryId: string;
}

export default function CategoryCard({
	category,
	categoryId,
}: CategoryCardProps) {
	return (
		<Link
			to={`/category/${categoryId}`}
			className="group relative block overflow-hidden rounded-[22px] border border-white/15 bg-white/[0.03] shadow-[0_18px_55px_rgba(4,4,8,0.45)] transition duration-500 hover:-translate-y-1 hover:border-cyan-200/55 hover:shadow-[0_24px_80px_rgba(110,155,255,0.32)]">
			<img
				src={category.image}
				alt={category.name}
				className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
				loading="lazy"
			/>

			<div className="absolute inset-0 bg-gradient-to-t from-[#04040a]/90 via-[#0a0f24]/30 to-transparent" />

			<div className="absolute inset-x-0 bottom-0 p-6">
				<h3 className="editorial-heading text-2xl text-white">
					{category.name}
				</h3>
				<p className="mt-2 text-sm text-slate-200/85">{category.description}</p>
			</div>
		</Link>
	);
}
