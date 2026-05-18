import { Star } from 'lucide-react';
import type { TestimonialItem } from '../../utils/mockData';
import GlassPanel from '../ui/GlassPanel';

interface TestimonialCardProps {
	testimonial: TestimonialItem;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
	return (
		<GlassPanel className="h-full p-6 transition duration-500 hover:-translate-y-1 hover:border-pink-200/40 hover:bg-white/[0.09]">
			<div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-sm font-semibold text-white">
				{testimonial.initials}
			</div>

			<p className="text-sm leading-relaxed text-slate-100/85">
				"{testimonial.review}"
			</p>

			<div className="mt-5 flex items-center gap-1 text-yellow-300">
				{Array.from({ length: testimonial.rating }).map((_, index) => (
					<Star
						key={`star-${testimonial.name}-${index}`}
						size={15}
						className="fill-yellow-300"
					/>
				))}
			</div>

			<div className="mt-5">
				<p className="font-semibold text-white">{testimonial.name}</p>
				<p className="text-xs uppercase tracking-[0.18em] text-slate-300/85">
					{testimonial.role}
				</p>
			</div>
		</GlassPanel>
	);
}
