export interface CategoryVisual {
	name: string;
	description: string;
	image: string;
}

export interface FeatureHighlight {
	title: string;
	description: string;
	icon:
		| 'Globe'
		| 'ShieldCheck'
		| 'Sparkles'
		| 'CreditCard'
		| 'RotateCcw'
		| 'Headphones';
}

export interface LookbookItem {
	title: string;
	subtitle: string;
	image: string;
}

export interface TestimonialItem {
	name: string;
	role: string;
	review: string;
	rating: number;
	initials: string;
}

export const requiredCategoryVisuals: CategoryVisual[] = [
	{
		name: 'Streetwear',
		description: 'Oversized fits, layered essentials, and urban staples.',
		image:
			'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80',
	},
	{
		name: 'Sneakers',
		description: 'Collector-level silhouettes with daily comfort.',
		image:
			'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80',
	},
	{
		name: 'Luxury Watches',
		description: 'Precision timepieces with modern craftsmanship.',
		image:
			'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1400&q=80',
	},
	{
		name: 'Bags',
		description: 'Structured silhouettes for sharp everyday carry.',
		image:
			'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1400&q=80',
	},
	{
		name: 'Accessories',
		description: 'Signature details that complete your look.',
		image:
			'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1400&q=80',
	},
	{
		name: 'Women Collection',
		description: 'Editorial-ready pieces for progressive styling.',
		image:
			'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80',
	},
	{
		name: 'Men Collection',
		description: 'Contemporary tailoring with street luxury attitude.',
		image:
			'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1400&q=80',
	},
];

export const luxuryFeatures: FeatureHighlight[] = [
	{
		title: 'Fast Worldwide Shipping',
		description:
			'Premium logistics coverage in 120+ countries with express options.',
		icon: 'Globe',
	},
	{
		title: 'Authentic Products',
		description:
			'Every item is verified with quality checks and authenticity seals.',
		icon: 'ShieldCheck',
	},
	{
		title: 'AI Style Recommendations',
		description:
			'Smart product curation based on your fashion profile and habits.',
		icon: 'Sparkles',
	},
	{
		title: 'Secure Payments',
		description:
			'Encrypted checkout with trusted payment rails and anti-fraud checks.',
		icon: 'CreditCard',
	},
	{
		title: 'Easy Returns',
		description:
			'Simple return flow and instant support for eligible products.',
		icon: 'RotateCcw',
	},
	{
		title: '24/7 Fashion Support',
		description:
			'Always-on style and order support from our retail care specialists.',
		icon: 'Headphones',
	},
];

export const lookbookItems: LookbookItem[] = [
	{
		title: 'Neo Utility Layering',
		subtitle: 'Hoodie + tactical coat + statement sneakers',
		image:
			'https://images.unsplash.com/photo-1503341733017-1901578f9f1e?auto=format&fit=crop&w=1400&q=80',
	},
	{
		title: 'Monochrome Velocity',
		subtitle: 'Black set with silver accents and high-top energy',
		image:
			'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80',
	},
	{
		title: 'Soft Neon Balance',
		subtitle: 'Minimal silhouette elevated by pastel glow accessories',
		image:
			'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80',
	},
];

export const testimonials: TestimonialItem[] = [
	{
		name: 'Mira Adeline',
		role: 'Fashion Creator',
		review:
			'The interface feels editorial and modern. Checkout is smooth, and the curated picks actually match my style direction.',
		rating: 5,
		initials: 'MA',
	},
	{
		name: 'Rafa Kenzie',
		role: 'Streetwear Collector',
		review:
			'I can discover drops faster, compare silhouettes clearly, and secure limited pieces before they are gone.',
		rating: 5,
		initials: 'RK',
	},
	{
		name: 'Luna Satria',
		role: 'Luxury Shopper',
		review:
			'Premium look, premium feel. The product cards and lookbook inspire full outfit combinations instantly.',
		rating: 4,
		initials: 'LS',
	},
];

export const footerColumns = {
	navigation: [
		'New Arrivals',
		'Best Sellers',
		'Lookbook',
		'Limited Drops',
		'Gift Cards',
	],
	shop: ['Streetwear', 'Sneakers', 'Luxury Watches', 'Bags', 'Accessories'],
	support: [
		'Help Center',
		'Shipping',
		'Returns',
		'Order Tracking',
		'Size Guide',
	],
	social: ['Instagram', 'TikTok', 'YouTube', 'Pinterest', 'X'],
};
