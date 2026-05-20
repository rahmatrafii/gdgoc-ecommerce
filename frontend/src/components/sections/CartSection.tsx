import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import Button from '../ui/Button';
import GlassPanel from '../ui/GlassPanel';
import SectionHeading from '../ui/SectionHeading';

export default function CartSection() {
	const navigate = useNavigate();
	const { cart, isLoading, updateQuantity, removeItem } = useCart();

	if (isLoading) {
		return (
			<section className="py-20 min-h-[50vh] flex flex-col items-center justify-center">
				<div className="animate-spin text-cyan-100">
					<ShoppingBag size={32} />
				</div>
				<p className="mt-4 text-slate-300">Loading your cart...</p>
			</section>
		);
	}

	const hasItems = cart && cart.items && cart.items.length > 0;

	return (
		<section className="py-20 min-h-[70vh]">
			<SectionHeading
				eyebrow="Your Bag"
				title="Ready to Checkout?"
				description="Review your selected luxury items before finalizing your purchase."
			/>

			{!hasItems ? (
				<div className="mt-16 flex flex-col items-center justify-center text-center">
					<div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400">
						<ShoppingBag size={40} />
					</div>
					<h3 className="mt-6 text-xl font-medium text-white">
						Your cart is empty
					</h3>
					<p className="mt-2 max-w-sm text-sm text-slate-400">
						Looks like you haven't added anything to your cart yet. Discover
						our exclusive collections to find something you'll love.
					</p>
					<div className="mt-8">
						<Button
							variant="primary"
							onClick={() => navigate('/')}
							className="px-6 py-3 font-semibold">
							Explore Collections
						</Button>
					</div>
				</div>
			) : (
				<div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
					<div className="lg:col-span-8">
						<GlassPanel className="p-1 sm:p-2">
							<div className="grid gap-2">
								{cart.items.map((item) => (
									<div
										key={item.product_id}
										className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:bg-white/[0.04]">
										<div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/[0.05]">
											{item.image_url ? (
												<img
													src={item.image_url}
													alt={item.name}
													className="h-full w-full object-cover"
												/>
											) : (
												<ShoppingBag
													size={28}
													className="text-white/20"
												/>
											)}
										</div>

										<div className="flex flex-1 flex-col gap-1 text-center sm:text-left w-full">
											<h4 className="text-base font-medium text-white">
												{item.name}
											</h4>
											<p className="text-sm font-medium text-cyan-100">
												${item.price.toFixed(2)}
											</p>
										</div>

										<div className="flex items-center gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
											<div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-1">
												<button
													type="button"
													disabled={item.quantity <= 1}
													onClick={() =>
														updateQuantity(item.product_id, item.quantity - 1)
													}
													className={`flex h-8 w-8 items-center justify-center rounded-md text-slate-300 transition ${
														item.quantity <= 1
															? 'cursor-not-allowed opacity-50'
															: 'hover:bg-white/10 hover:text-white'
													}`}
													aria-label="Decrease quantity">
													<Minus size={14} />
												</button>
												<span className="w-6 text-center text-sm font-medium text-white">
													{item.quantity}
												</span>
												<button
													type="button"
													onClick={() =>
														updateQuantity(item.product_id, item.quantity + 1)
													}
													className="flex h-8 w-8 items-center justify-center rounded-md text-slate-300 transition hover:bg-white/10 hover:text-white"
													aria-label="Increase quantity">
													<Plus size={14} />
												</button>
											</div>

											<div className="w-20 text-right text-sm font-medium text-white hidden sm:block">
												${item.sub_total.toFixed(2)}
											</div>

											<button
												type="button"
												onClick={() => removeItem(item.product_id)}
												className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400"
												aria-label="Remove item">
												<Trash2 size={16} />
											</button>
										</div>
									</div>
								))}
							</div>
						</GlassPanel>
					</div>

					<div className="lg:col-span-4">
						<GlassPanel className="sticky top-28 p-6">
							<h3 className="text-lg font-medium text-white">Order Summary</h3>
							<div className="mt-6 grid gap-4 border-b border-white/10 pb-6 text-sm text-slate-300">
								<div className="flex justify-between">
									<span>Subtotal</span>
									<span className="font-medium text-white">
										${cart.total_amount.toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between">
									<span>Shipping</span>
									<span className="font-medium text-white">Calculated at checkout</span>
								</div>
							</div>
							<div className="mt-6 flex justify-between text-base font-medium text-white">
								<span>Total</span>
								<span>${cart.total_amount.toFixed(2)}</span>
							</div>

							<Button
								variant="primary"
								className="mt-8 w-full justify-center"
								onClick={() => {
									alert('Checkout flow will be implemented later.');
								}}>
								Proceed to Checkout
							</Button>
						</GlassPanel>
					</div>
				</div>
			)}
		</section>
	);
}
