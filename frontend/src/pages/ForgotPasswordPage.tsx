import { useState } from 'react';
import { Link } from 'react-router-dom';
import FooterSection from '../components/sections/FooterSection';
import Button from '../components/ui/Button';
import { ApiRequestError } from '../services/apiClient';
import { forgotPassword } from '../services/authService';

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isSubmitted, setIsSubmitted] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);
		setIsLoading(true);

		try {
			await forgotPassword({ email });
			setIsSubmitted(true);
		} catch (err) {
			if (err instanceof ApiRequestError) {
				setError(err.message || 'Something went wrong. Please try again.');
			} else {
				setError('An unexpected error occurred. Please try again.');
			}
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="luxury-background min-h-screen text-white flex flex-col">
			<main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 my-10">
				<div className="w-full max-w-lg rounded-[26px] border border-white/20 bg-white/[0.06] p-8 shadow-[0_20px_65px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10">
					{isSubmitted ? (
						/* ── Success State ── */
						<div className="text-center py-4">
							<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-10 w-10 text-emerald-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<h1 className="editorial-heading text-3xl sm:text-4xl text-white">
								Check Your Email
							</h1>
							<p className="mt-4 text-sm leading-relaxed text-slate-100/80">
								If your email is registered, you will receive a password reset
								token shortly. Please check your inbox and use the token to
								reset your password.
							</p>
							<div className="mt-8 flex flex-col gap-3">
								<Link to="/reset-password">
									<Button
										variant="primary"
										size="lg"
										className="w-full">
										I Have My Reset Token
									</Button>
								</Link>
								<Link to="/login">
									<Button
										variant="ghost"
										size="lg"
										className="w-full">
										Back to Sign In
									</Button>
								</Link>
							</div>
						</div>
					) : (
						/* ── Form State ── */
						<>
							<div className="text-center">
								<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-100/20 bg-cyan-100/5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-10 w-10 text-cyan-100/80"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={1.5}>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
										/>
									</svg>
								</div>
								<h1 className="editorial-heading text-3xl sm:text-4xl text-white">
									Forgot Password?
								</h1>
								<p className="mt-3 text-sm text-slate-100/80">
									Enter the email address associated with your account and
									we'll send you a reset token.
								</p>
							</div>

							<form
								onSubmit={handleSubmit}
								className="mt-8 flex flex-col gap-5">
								<div className="space-y-2">
									<label
										htmlFor="forgot-email"
										className="text-xs font-medium uppercase tracking-wider text-cyan-100/80">
										Email Address
									</label>
									<input
										id="forgot-email"
										type="email"
										placeholder="johndoe@example.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="h-12 w-full rounded-[18px] border border-white/25 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-slate-300/50 focus:border-cyan-100/70 focus:ring-2 focus:ring-cyan-100/40"
										required
									/>
								</div>

								<Button
									type="submit"
									variant="primary"
									size="lg"
									className="mt-4 w-full"
									disabled={isLoading}>
									{isLoading ? 'Sending...' : 'Send Reset Token'}
								</Button>

								{error ? (
									<p className="mt-2 text-center text-sm font-medium text-rose-300">
										{error}
									</p>
								) : null}

								<p className="mt-4 text-center text-sm text-slate-100/70">
									Remember your password?{' '}
									<Link
										to="/login"
										className="text-cyan-100 transition hover:text-cyan-200">
										Sign in
									</Link>
								</p>
							</form>
						</>
					)}
				</div>
			</main>

			<FooterSection />
		</div>
	);
}
