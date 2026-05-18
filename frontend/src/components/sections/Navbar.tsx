import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
	{ label: 'New Arrivals', href: '#new-arrivals' },
	{ label: 'Best Sellers', href: '#best-sellers' },
	{ label: 'Lookbook', href: '#lookbook' },
	{ label: 'Support', href: '#footer' },
];

interface NavbarProps {
	onSearchClick?: () => void;
	onCartClick?: () => void;
}

export default function Navbar({ onSearchClick, onCartClick }: NavbarProps) {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	function goTo(sectionId: string) {
		document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' });
		setMenuOpen(false);
	}

	function handleSearchClick() {
		if (onSearchClick) {
			onSearchClick();
			setMenuOpen(false);
			return;
		}

		goTo('#new-arrivals');
	}

	function handleCartClick() {
		if (onCartClick) {
			onCartClick();
			setMenuOpen(false);
			return;
		}

		goTo('#new-arrivals');
	}

	return (
		<header className="sticky top-0 z-50 border-b border-white/10 bg-[#06070f]/65 backdrop-blur-xl">
			<div className="mx-auto flex h-20 w-full max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
				<a
					href="#hero"
					className="inline-flex items-center gap-3">
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
						className="hidden rounded-full border border-white/20 bg-white/6 p-2 text-slate-100 transition hover:border-cyan-100/60 hover:text-cyan-100 sm:inline-flex"
						aria-label="Search products"
						onClick={handleSearchClick}>
						<Search size={17} />
					</button>
					<button
						type="button"
						className="rounded-full border border-white/20 bg-white/6 p-2 text-slate-100 transition hover:border-cyan-100/60 hover:text-cyan-100"
						aria-label="Open cart"
						onClick={handleCartClick}>
						<ShoppingBag size={17} />
					</button>
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
					</nav>
				</div>
			) : null}
		</header>
	);
}
