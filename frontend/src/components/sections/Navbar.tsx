import { Menu, ShoppingBag, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const navLinks = [
	{ label: 'New Arrivals', href: '#new-arrivals' },
	{ label: 'Best Sellers', href: '#best-sellers' },
	{ label: 'Lookbook', href: '#lookbook' },
	{ label: 'Support', href: '#footer' },
];

interface NavbarProps {
	onCartClick?: () => void;
}

export default function Navbar({ onCartClick }: NavbarProps) {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
	const profileMenuRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const { isAuthenticated, user, logout } = useAuth();

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
				setProfileMenuOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	function goTo(sectionId: string) {
		document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' });
		setMenuOpen(false);
	}

	function handleCartClick() {
		if (onCartClick) {
			onCartClick();
			setMenuOpen(false);
			return;
		}

		navigate('/cart');
	}

	function handleAuthAction() {
		if (isAuthenticated) {
			logout();
		} else {
			navigate('/login');
		}
	}

	return (
		<header className="sticky top-0 z-50 border-b border-white/10 bg-[#06070f]/65 backdrop-blur-xl">
			<div className="mx-auto flex h-20 w-full max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
				<a
					href="/"
					className="inline-flex items-center gap-3"
					onClick={(e) => { e.preventDefault(); navigate('/'); }}
				>
					<span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-100/45 bg-cyan-100/12 text-sm font-bold tracking-[0.18em] text-cyan-100">
						LX
					</span>
					<span className="editorial-heading text-xl text-white">
						LUXE DISTRICT
					</span>
				</a>

				<nav className="hidden items-center gap-8 text-sm text-slate-100/85 lg:flex">
					{navLinks.map((link) => (
						<a
							key={link.label}
							href={link.href}
							className="transition hover:text-cyan-100 focus-visible:outline-none focus-visible:text-cyan-100">
							{link.label}
						</a>
					))}
				</nav>

				<div className="flex items-center gap-2">

					<button
						type="button"
						className="rounded-full border border-white/20 bg-white/6 p-2 text-slate-100 transition hover:border-cyan-100/60 hover:text-cyan-100"
						aria-label="Open cart"
						onClick={handleCartClick}>
						<ShoppingBag size={17} />
					</button>
					{isAuthenticated ? (
						<div className="relative hidden sm:block" ref={profileMenuRef}>
							<button
								type="button"
								className="flex items-center gap-2 rounded-full border border-white/20 bg-white/6 pl-2 pr-3 py-1 text-slate-100 transition hover:border-cyan-100/60 hover:text-cyan-100"
								onClick={() => setProfileMenuOpen(!profileMenuOpen)}
							>
								<div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-100/20 text-xs font-bold text-cyan-100">
									{user?.name ? user.name.charAt(0).toUpperCase() : <User size={14} />}
								</div>
								<span className="text-sm font-medium">{user?.name?.split(' ')[0] || 'User'}</span>
								<ChevronDown size={14} className={`transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
							</button>

							{profileMenuOpen && (
								<div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#0a0b14] py-1 shadow-xl backdrop-blur-xl">
									<div className="border-b border-white/10 px-4 py-3">
										<p className="truncate text-sm font-medium text-white">{user?.name}</p>
										<p className="truncate text-xs text-slate-400">{user?.email}</p>
									</div>
									<div className="p-1">
										<button
											type="button"
											className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-400 transition hover:bg-white/5"
											onClick={() => {
												setProfileMenuOpen(false);
												logout();
											}}
										>
											<LogOut size={15} />
											Sign Out
										</button>
									</div>
								</div>
							)}
						</div>
					) : (
						<button
							type="button"
							className="hidden rounded-full border border-white/20 bg-white/6 p-2 text-slate-100 transition hover:border-cyan-100/60 hover:text-cyan-100 sm:inline-flex"
							aria-label="Login"
							onClick={handleAuthAction}>
							<User size={17} />
						</button>
					)}
					<button
						type="button"
						className="inline-flex rounded-full border border-white/20 bg-white/6 p-2 text-slate-100 transition hover:border-cyan-100/60 hover:text-cyan-100 lg:hidden"
						aria-label="Open menu"
						onClick={() => setMenuOpen((state) => !state)}>
						{menuOpen ? <X size={17} /> : <Menu size={17} />}
					</button>
				</div>
			</div>

			{menuOpen ? (
				<div className="border-t border-white/10 px-4 py-3 lg:hidden">
					<nav className="grid gap-2 text-sm text-slate-100/90">
						{navLinks.map((link) => (
							<button
								key={link.label}
								type="button"
								onClick={() => goTo(link.href)}
								className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-left transition hover:border-cyan-100/45 hover:bg-white/[0.07]">
								{link.label}
							</button>
						))}
						{isAuthenticated ? (
							<div className="mt-2 space-y-2">
								<div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100/20 text-sm font-bold text-cyan-100">
										{user?.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
									</div>
									<div className="min-w-0 flex-1">
										<p className="truncate text-sm font-medium text-white">{user?.name}</p>
										<p className="truncate text-xs text-slate-400">{user?.email}</p>
									</div>
								</div>
								<button
									type="button"
									onClick={() => { setMenuOpen(false); logout(); }}
									className="flex w-full items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-left text-red-400 transition hover:bg-red-500/20">
									<LogOut size={15} />
									Sign Out
								</button>
							</div>
						) : (
							<button
								type="button"
								onClick={() => { setMenuOpen(false); navigate('/login'); }}
								className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-left transition hover:border-cyan-100/45 hover:bg-white/[0.07]">
								<User size={15} />
								Sign In
							</button>
						)}
					</nav>
				</div>
			) : null}
		</header>
	);
}
