import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	leadingIcon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
	primary:
		'glass-button-primary text-white shadow-[0_12px_42px_rgba(104,103,255,0.45)]',
	secondary:
		'glass-button-secondary text-white shadow-[0_10px_35px_rgba(117,228,255,0.25)]',
	ghost: 'border border-white/20 bg-white/5 text-white hover:bg-white/12',
};

const sizeClasses: Record<ButtonSize, string> = {
	md: 'h-11 px-5 text-sm',
	lg: 'h-12 px-6 text-base',
};

export default function Button({
	className,
	variant = 'primary',
	size = 'md',
	leadingIcon,
	children,
	...props
}: ButtonProps) {
	return (
		<button
			className={cn(
				'inline-flex items-center justify-center gap-2 rounded-[20px] font-semibold transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07070c] active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-60',
				variantClasses[variant],
				sizeClasses[size],
				className,
			)}
			{...props}>
			{leadingIcon ? <span className="shrink-0">{leadingIcon}</span> : null}
			<span>{children}</span>
		</button>
	);
}
