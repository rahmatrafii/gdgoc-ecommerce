import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FooterSection from '../components/sections/FooterSection';
import Button from '../components/ui/Button';
import { ApiRequestError } from '../services/apiClient';
import { resetPassword } from '../services/authService';

export default function ResetPasswordPage() {
	const [token, setToken] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);

	const navigate = useNavigate();

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);

		if (password !== confirmPassword) {
			setError('Passwords do not match.');
			return;
		}

		setIsLoading(true);

		try {
			await resetPassword({ token, password });
			setIsSuccess(true);
		} catch (err) {
			if (err instanceof ApiRequestError) {
				setError(err.message || 'Failed to reset password. Please try again.');
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
					{isSuccess ? (
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
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<h1 className="editorial-heading text-3xl sm:text-4xl text-white">
								Password Reset!
							</h1>
							<p className="mt-4 text-sm leading-relaxed text-slate-100/80">
								Your password has been reset successfully. You can now sign in
								with your new password.
							</p>
							<div className="mt-8">
								<Button
									variant="primary"
									size="lg"
									className="w-full"
									onClick={() => navigate('/login')}>
									Go to Sign In
								</Button>
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
											d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
										/>
									</svg>
								</div>
								<h1 className="editorial-heading text-3xl sm:text-4xl text-white">
									Reset Password
								</h1>
								<p className="mt-3 text-sm text-slate-100/80">
									Enter the reset token you received via email and set your
									new password.
								</p>
							</div>

							<form
								onSubmit={handleSubmit}
								className="mt-8 flex flex-col gap-5">
								<div className="space-y-2">
									<label
										htmlFor="reset-token"
										className="text-xs font-medium uppercase tracking-wider text-cyan-100/80">
										Reset Token
									</label>
									<input
										id="reset-token"
										type="text"
										placeholder="Paste your reset token here"
										value={token}
										onChange={(e) => setToken(e.target.value)}
										className="h-12 w-full rounded-[18px] border border-white/25 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-slate-300/50 focus:border-cyan-100/70 focus:ring-2 focus:ring-cyan-100/40 font-mono"
										required
									/>
								</div>

								<div className="space-y-2">
									<label
										htmlFor="new-password"
										className="text-xs font-medium uppercase tracking-wider text-cyan-100/80">
										New Password
									</label>
									<input
										id="new-password"
										type="password"
										placeholder="••••••••"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="h-12 w-full rounded-[18px] border border-white/25 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-slate-300/50 focus:border-cyan-100/70 focus:ring-2 focus:ring-cyan-100/40"
										required
										minLength={6}
									/>
									<p className="text-xs text-slate-100/50">
										Must be at least 6 characters.
									</p>
								</div>

								<div className="space-y-2">
									<label
										htmlFor="confirm-password"
										className="text-xs font-medium uppercase tracking-wider text-cyan-100/80">
										Confirm Password
									</label>
									<input
										id="confirm-password"
										type="password"
										placeholder="••••••••"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										className="h-12 w-full rounded-[18px] border border-white/25 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-slate-300/50 focus:border-cyan-100/70 focus:ring-2 focus:ring-cyan-100/40"
										required
										minLength={6}
									/>
								</div>

								<Button
									type="submit"
									variant="primary"
									size="lg"
									className="mt-4 w-full"
									disabled={isLoading}>
									{isLoading ? 'Resetting...' : 'Reset Password'}
								</Button>

								{error ? (
									<p className="mt-2 text-center text-sm font-medium text-rose-300">
										{error}
									</p>
								) : null}

								<div className="mt-4 flex flex-col items-center gap-2 text-sm text-slate-100/70">
									<p>
										Don't have a token?{' '}
										<Link
											to="/forgot-password"
											className="text-cyan-100 transition hover:text-cyan-200">
											Request one
										</Link>
									</p>
									<p>
										Remember your password?{' '}
										<Link
											to="/login"
											className="text-cyan-100 transition hover:text-cyan-200">
											Sign in
										</Link>
									</p>
								</div>
							</form>
						</>
					)}
				</div>
			</main>

			<FooterSection />
		</div>
	);
}
