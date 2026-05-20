import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterSection from '../components/sections/FooterSection';
import Button from '../components/ui/Button';
import { ApiRequestError } from '../services/apiClient';
import { register } from '../services/authService';

export default function RegisterPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);
		setIsLoading(true);

		try {
			await register({ name, email, password });
			navigate('/login');
		} catch (err) {
			if (err instanceof ApiRequestError) {
				setError(err.message || 'Registration failed. Please try again.');
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
					<div className="text-center">
						<h1 className="editorial-heading text-3xl sm:text-4xl text-white">
							Create Account
						</h1>
						<p className="mt-3 text-sm text-slate-100/80">
							Join Luxe District to access exclusive drops and personalized
							recommendations.
						</p>
					</div>

					<form
						onSubmit={handleSubmit}
						className="mt-8 flex flex-col gap-5">
						<div className="space-y-2">
							<label
								htmlFor="name"
								className="text-xs font-medium uppercase tracking-wider text-cyan-100/80">
								Full Name
							</label>
							<input
								id="name"
								type="text"
								placeholder="John Doe"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="h-12 w-full rounded-[18px] border border-white/25 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-slate-300/50 focus:border-cyan-100/70 focus:ring-2 focus:ring-cyan-100/40"
								required
								minLength={3}
								maxLength={100}
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="email"
								className="text-xs font-medium uppercase tracking-wider text-cyan-100/80">
								Email Address
							</label>
							<input
								id="email"
								type="email"
								placeholder="johndoe@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="h-12 w-full rounded-[18px] border border-white/25 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-slate-300/50 focus:border-cyan-100/70 focus:ring-2 focus:ring-cyan-100/40"
								required
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="password"
								className="text-xs font-medium uppercase tracking-wider text-cyan-100/80">
								Password
							</label>
							<input
								id="password"
								type="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
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
							{isLoading ? 'Creating Account...' : 'Create Account'}
						</Button>

						{error ? (
							<p className="mt-2 text-center text-sm font-medium text-rose-300">
								{error}
							</p>
						) : null}

						<p className="mt-4 text-center text-sm text-slate-100/70">
							Already have an account?{' '}
							<a
								href="/login"
								className="text-cyan-100 transition hover:text-cyan-200">
								Sign in
							</a>
						</p>
					</form>
				</div>
			</main>

			<FooterSection />
		</div>
	);
}
