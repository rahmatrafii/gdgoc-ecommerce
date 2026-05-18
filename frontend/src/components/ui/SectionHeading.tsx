import { cn } from '../../utils/cn';

interface SectionHeadingProps {
	eyebrow?: string;
	title: string;
	description?: string;
	align?: 'left' | 'center';
}

export default function SectionHeading({
	eyebrow,
	title,
	description,
	align = 'left',
}: SectionHeadingProps) {
	return (
		<header
			className={cn(
				'space-y-4',
				align === 'center' ? 'text-center' : 'text-left',
			)}>
			{eyebrow ? (
				<p className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
					{eyebrow}
				</p>
			) : null}

			<h2 className="editorial-heading text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
				{title}
			</h2>

			{description ? (
				<p
					className={cn(
						'text-pretty text-sm text-slate-200/85 sm:text-base',
						align === 'center' ? 'mx-auto max-w-3xl' : 'max-w-3xl',
					)}>
					{description}
				</p>
			) : null}
		</header>
	);
}
