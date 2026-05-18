import { Flame } from 'lucide-react';
import { useCountdown } from '../../hooks/useCountdown';
import Button from '../ui/Button';

const countDownTarget = '2026-12-31T23:59:59Z';

interface LimitedEditionSectionProps {
	onShopLimitedDrop?: () => void;
}

export default function LimitedEditionSection({
	onShopLimitedDrop,
}: LimitedEditionSectionProps) {
	const countdown = useCountdown(countDownTarget);

	const countItems = [
		{ label: 'Days', value: countdown.days },
		{ label: 'Hours', value: countdown.hours },
		{ label: 'Minutes', value: countdown.minutes },
		{ label: 'Seconds', value: countdown.seconds },
	];

	return (
		<section
			id="limited-drop"
			className="section-anchor py-20">
			<div className="relative overflow-hidden rounded-[28px] border border-white/20 bg-gradient-to-r from-[#1a1133]/80 via-[#0f1e45]/70 to-[#131731]/80 p-8 shadow-[0_25px_90px_rgba(53,69,168,0.45)] backdrop-blur-xl sm:p-10 lg:p-12">
				<div className="pointer-events-none absolute -left-16 top-12 h-56 w-56 rounded-full bg-fuchsia-400/35 blur-[110px]" />
				<div className="pointer-events-none absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-cyan-400/30 blur-[110px]" />

				<div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
					<div>
						<p className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
							<Flame size={15} />
							Limited Edition
						</p>
						<h3 className="editorial-heading mt-4 text-balance text-4xl text-white sm:text-5xl">
							Exclusive Seasonal Drop: Night Pulse Capsule
						</h3>
						<p className="mt-4 max-w-2xl text-base text-slate-100/85">
							Secure premium hoodies, chrome accessories, and collector sneakers
							from our cinematic capsule release before countdown expires.
						</p>
						<Button
							className="mt-6"
							variant="primary"
							size="lg"
							onClick={onShopLimitedDrop}>
							Shop Limited Drop
						</Button>
					</div>

					<div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
						{countItems.map((item) => (
							<div
								key={item.label}
								className="rounded-[20px] border border-white/20 bg-white/[0.08] px-4 py-5 text-center">
								<p className="text-3xl font-semibold text-white">
									{String(item.value).padStart(2, '0')}
								</p>
								<p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-200/80">
									{item.label}
								</p>
							</div>
						))}

						{countdown.isExpired ? (
							<p className="col-span-full rounded-2xl border border-emerald-200/35 bg-emerald-400/10 px-4 py-3 text-center text-sm text-emerald-100">
								Drop is now live. Explore latest limited release now.
							</p>
						) : null}
					</div>
				</div>
			</div>
		</section>
	);
}
