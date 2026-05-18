import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
	glow?: boolean;
}

export default function GlassPanel({
	className,
	glow = false,
	...props
}: GlassPanelProps) {
	return (
		<div
			className={cn(
				'glass-card rounded-[22px] border border-white/15 bg-white/[0.04] backdrop-blur-xl',
				glow
					? 'shadow-[0_18px_60px_rgba(125,130,255,0.35)]'
					: 'shadow-[0_12px_38px_rgba(0,0,0,0.28)]',
				className,
			)}
			{...props}
		/>
	);
}
