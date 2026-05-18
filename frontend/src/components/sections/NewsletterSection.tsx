import { Mail } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';

export default function NewsletterSection() {
	const [email, setEmail] = useState<string>('');
	const [submitted, setSubmitted] = useState<boolean>(false);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!email) {
			return;
		}

		setSubmitted(true);
		setEmail('');
	}

	return (
		<section
			id="newsletter"
			className="section-anchor py-20">
			<div className="rounded-[26px] border border-white/20 bg-white/[0.06] p-8 shadow-[0_20px_65px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10 lg:p-12">
				<p className="inline-flex items-center gap-2 rounded-full border border-cyan-100/35 bg-cyan-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
					<Mail size={14} />
					Newsletter Subscription
				</p>

				<h3 className="editorial-heading mt-4 text-balance text-4xl text-white sm:text-5xl">
					Get Exclusive Fashion Drops
				</h3>

				<p className="mt-4 max-w-2xl text-slate-100/80">
					Subscribe for early access to curated launches, limited capsules, and
					AI-powered style edits.
				</p>

				<form
					onSubmit={handleSubmit}
					className="mt-7 flex flex-col gap-3 sm:flex-row">
					<label
						htmlFor="newsletter-email"
						className="sr-only">
						Email address
					</label>
					<input
						id="newsletter-email"
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						className="h-12 flex-1 rounded-[18px] border border-white/25 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-slate-300/75 focus:border-cyan-100/70 focus:ring-2 focus:ring-cyan-100/40"
						required
					/>

					<Button
						type="submit"
						variant="primary"
						size="lg">
						Subscribe Now
					</Button>
				</form>

				{submitted ? (
					<p className="mt-4 text-sm text-emerald-200">
						You are in. Exclusive drops coming soon.
					</p>
				) : null}
			</div>
		</section>
	);
}
