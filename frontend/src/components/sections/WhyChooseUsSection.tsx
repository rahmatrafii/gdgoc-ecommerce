import {
	CreditCard,
	Globe,
	Headphones,
	RotateCcw,
	ShieldCheck,
	Sparkles,
	type LucideIcon,
} from 'lucide-react';
import { luxuryFeatures } from '../../utils/mockData';
import ValueCard from '../cards/ValueCard';
import SectionHeading from '../ui/SectionHeading';

const iconMap: Record<string, LucideIcon> = {
	Globe,
	ShieldCheck,
	Sparkles,
	CreditCard,
	RotateCcw,
	Headphones,
};

export default function WhyChooseUsSection() {
	return (
		<section
			id="why-us"
			className="section-anchor py-20">
			<SectionHeading
				eyebrow="Why Choose Us"
				title="Premium Operations Behind Every Fashion Purchase"
				description="Built for trust, speed, and personalized shopping decisions that keep your wardrobe one step ahead."
			/>

			<div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{luxuryFeatures.map((feature) => {
					const Icon = iconMap[feature.icon];

					return (
						<ValueCard
							key={feature.title}
							icon={Icon}
							title={feature.title}
							description={feature.description}
						/>
					);
				})}
			</div>
		</section>
	);
}
