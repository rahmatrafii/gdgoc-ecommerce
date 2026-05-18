import { lookbookItems } from '../../utils/mockData';
import SectionHeading from '../ui/SectionHeading';

export default function LookbookSection() {
	return (
		<section
			id="lookbook"
			className="section-anchor py-20">
			<SectionHeading
				eyebrow="Fashion Lookbook"
				title="Editorial Outfit Stories for Modern Street Luxury"
				description="Campaign-style visual combinations helping shoppers imagine complete wardrobe direction instead of isolated products."
			/>

			<div className="mt-10 grid gap-6 lg:grid-cols-3">
				{lookbookItems.map((item, index) => (
					<article
						key={item.title}
						className={`group relative overflow-hidden rounded-[26px] border border-white/15 ${
							index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
						}`}>
						<img
							src={item.image}
							alt={item.title}
							className="h-full min-h-[300px] w-full object-cover transition duration-700 group-hover:scale-105"
							loading="lazy"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-[#050712]/90 via-transparent to-transparent" />
						<div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
							<p className="text-xs uppercase tracking-[0.22em] text-cyan-100/90">
								Lookbook Edit
							</p>
							<h3 className="editorial-heading mt-3 text-3xl text-white">
								{item.title}
							</h3>
							<p className="mt-2 text-sm text-slate-200/85">{item.subtitle}</p>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
