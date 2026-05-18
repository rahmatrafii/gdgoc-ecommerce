import { footerColumns } from '../../utils/mockData';

interface ResolvedFooterLink {
	label: string;
	href: string;
	isExternal: boolean;
}

function resolveFooterLink(label: string): ResolvedFooterLink {
	const internalMap: Record<string, string> = {
		'New Arrivals': '#new-arrivals',
		'Best Sellers': '#best-sellers',
		Lookbook: '#lookbook',
		'Limited Drops': '#limited-drop',
		'Gift Cards': '#newsletter',
		Streetwear: '#categories',
		Sneakers: '#categories',
		'Luxury Watches': '#categories',
		Bags: '#categories',
		Accessories: '#categories',
		'Help Center': '#footer',
		Shipping: '#footer',
		Returns: '#footer',
		'Order Tracking': '#new-arrivals',
		'Size Guide': '#categories',
	};

	const socialMap: Record<string, string> = {
		Instagram: 'https://www.instagram.com',
		TikTok: 'https://www.tiktok.com',
		YouTube: 'https://www.youtube.com',
		Pinterest: 'https://www.pinterest.com',
		X: 'https://x.com',
	};

	if (internalMap[label]) {
		return {
			label,
			href: internalMap[label],
			isExternal: false,
		};
	}

	if (socialMap[label]) {
		return {
			label,
			href: socialMap[label],
			isExternal: true,
		};
	}

	return {
		label,
		href: '#footer',
		isExternal: false,
	};
}

export default function FooterSection() {
	return (
		<footer
			id="footer"
			className="section-anchor border-t border-white/10 bg-[#06070f] py-16">
			<div className="mx-auto grid w-full max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr_1fr_1fr_1fr] lg:px-10">
				<div>
					<p className="editorial-heading text-2xl text-white">LUXE DISTRICT</p>
					<p className="mt-3 max-w-sm text-sm text-slate-300/85">
						Futuristic fashion commerce combining editorial aesthetics and
						conversion-focused shopping flows.
					</p>
					<p className="mt-4 text-sm text-slate-200">
						support@luxedistrict.com
					</p>
					<p className="text-sm text-slate-200">+62 812-7890-1045</p>
				</div>

				<FooterColumn
					title="Navigation"
					links={footerColumns.navigation}
				/>
				<FooterColumn
					title="Shop"
					links={footerColumns.shop}
				/>
				<FooterColumn
					title="Support"
					links={footerColumns.support}
				/>
				<FooterColumn
					title="Social"
					links={footerColumns.social}
				/>
			</div>

			<div className="mx-auto mt-10 flex w-full max-w-[1240px] flex-col items-start justify-between gap-3 border-t border-white/8 px-4 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:px-6 lg:px-10">
				<p>2026 Luxe District. All rights reserved.</p>
				<p>Privacy Policy | Terms of Service | Cookies</p>
			</div>
		</footer>
	);
}

interface FooterColumnProps {
	title: string;
	links: string[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
	return (
		<div>
			<p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">
				{title}
			</p>
			<ul className="mt-3 space-y-2 text-sm text-slate-300/85">
				{links.map((link) => {
					const resolvedLink = resolveFooterLink(link);

					return (
						<li key={link}>
							<a
								href={resolvedLink.href}
								target={resolvedLink.isExternal ? '_blank' : undefined}
								rel={resolvedLink.isExternal ? 'noreferrer' : undefined}
								className="transition hover:text-cyan-100">
								{resolvedLink.label}
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
