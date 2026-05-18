import { Apple, Smartphone } from 'lucide-react';
import Button from '../ui/Button';
import SectionHeading from '../ui/SectionHeading';

export default function MobileExperienceSection() {
	return (
		<section
			id="mobile"
			className="section-anchor py-20">
			<SectionHeading
				eyebrow="Mobile Shopping Experience"
				title="Luxury Fashion Checkout Optimized for Every Screen"
				description="From immersive browsing to one-tap payments, the mobile flow keeps premium retail performance consistent across devices."
			/>

			<div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
				<div className="space-y-5 text-slate-100/85">
					<p>
						Explore high-end catalog browsing, save your wishlist instantly, and
						receive launch alerts for limited capsules. Our mobile experience is
						crafted for speed and visual richness.
					</p>
					<ul className="space-y-3 text-sm">
						<li className="rounded-2xl border border-white/15 bg-white/[0.03] px-4 py-3">
							Personalized style feed based on your shopping behavior.
						</li>
						<li className="rounded-2xl border border-white/15 bg-white/[0.03] px-4 py-3">
							Seamless checkout with secure tokenized payments.
						</li>
						<li className="rounded-2xl border border-white/15 bg-white/[0.03] px-4 py-3">
							Real-time shipping updates and drop reminders.
						</li>
					</ul>

					<div className="flex flex-wrap gap-3">
						<Button
							variant="secondary"
							leadingIcon={<Apple size={16} />}>
							Download on App Store
						</Button>
						<Button
							variant="ghost"
							leadingIcon={<Smartphone size={16} />}>
							Get it on Google Play
						</Button>
					</div>
				</div>

				<div className="relative mx-auto flex max-w-[480px] items-end justify-center gap-4">
					<div className="float-mid w-48 rounded-[34px] border border-white/20 bg-gradient-to-b from-[#151b36] to-[#0a0d19] p-3 shadow-[0_22px_70px_rgba(35,48,121,0.55)]">
						<div className="overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.04] p-3">
							<div className="mb-2 h-24 rounded-2xl bg-gradient-to-tr from-cyan-400/45 via-indigo-500/30 to-fuchsia-500/45" />
							<div className="space-y-2">
								<div className="h-3 rounded-full bg-white/20" />
								<div className="h-3 w-3/4 rounded-full bg-white/20" />
								<div className="h-10 rounded-xl bg-white/12" />
							</div>
						</div>
					</div>

					<div className="w-56 rounded-[36px] border border-white/25 bg-gradient-to-b from-[#1d2140] to-[#0b0d18] p-3 shadow-[0_24px_80px_rgba(54,80,180,0.5)]">
						<div className="overflow-hidden rounded-[30px] border border-white/15 bg-white/[0.05] p-4">
							<div className="mb-3 h-32 rounded-2xl bg-gradient-to-tr from-fuchsia-400/35 via-transparent to-cyan-400/40" />
							<div className="space-y-2">
								<div className="h-3 rounded-full bg-white/22" />
								<div className="h-3 rounded-full bg-white/18" />
								<div className="h-11 rounded-2xl bg-cyan-300/20" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
