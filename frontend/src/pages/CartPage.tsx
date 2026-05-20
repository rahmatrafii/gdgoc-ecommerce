import CartSection from '../components/sections/CartSection';
import FooterSection from '../components/sections/FooterSection';
import Navbar from '../components/sections/Navbar';

export default function CartPage() {
	return (
		<div className="luxury-background min-h-screen text-white flex flex-col">
			<Navbar />

			<main className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10 flex-grow">
				<CartSection />
			</main>

			<FooterSection />
		</div>
	);
}
