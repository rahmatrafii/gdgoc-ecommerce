import type { LucideIcon } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';

interface ValueCardProps {
	icon: LucideIcon;
	title: string;
	description: string;
}

export default function ValueCard({
	icon: Icon,
	title,
	description,
}: ValueCardProps) {
	return (
		<GlassPanel className="h-full p-6 transition duration-500 hover:-translate-y-1 hover:border-cyan-100/35 hover:bg-white/[0.08]">
			<div className="mb-4 inline-flex rounded-2xl border border-cyan-100/40 bg-cyan-300/10 p-3 text-cyan-100">
				<Icon size={20} />
			</div>
			<h3 className="text-xl font-semibold text-white">{title}</h3>
			<p className="mt-3 text-sm text-slate-200/80">{description}</p>
		</GlassPanel>
	);
}
