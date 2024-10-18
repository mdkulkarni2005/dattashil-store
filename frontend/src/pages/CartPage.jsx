import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";
import axios from "../lib/axios"; // Import axios

const CartPage = () => {
	const { cart, clearCart } = useCartStore(); // Include clearCart to clear the cart
	const handleCheckout = async () => {
		const products = cart; // Send the cart items for payment
		const couponCode = ''; // Add your coupon code handling if needed

		try {
			const { data } = await axios.post('/api/payments/create-checkout-session', { products, couponCode });
			const options = {
				key: process.env.RAZORPAY_KEY_ID, // Your Razorpay key ID
				amount: data.totalAmount * 100, // Convert to paise
				currency: 'INR',
				name: 'Your Company Name',
				description: 'Test Transaction',
				order_id: data.id,
				handler: async function (response) {
					await axios.post('/api/payments/checkout-success', {
						orderId: data.id,
						paymentId: response.razorpay_payment_id,
						signature: response.razorpay_signature,
						products, // Send product information
						totalAmount: data.totalAmount,
					});
					clearCart(); // Clear cart after successful payment
					// Redirect to success page or show confirmation
					window.location.href = "/purchase-success"; // Change to your success page route
				},
				theme: {
					color: '#F37254',
				},
			};
			const razorpay = new window.Razorpay(options);
			razorpay.open();
		} catch (error) {
			console.error('Error initiating payment:', error);
		}
	};

	return (
		<div className='py-8 md:py-16'>
			<div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
				<div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
					<motion.div
						className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						{cart.length === 0 ? (
							<EmptyCartUI />
						) : (
							<div className='space-y-6'>
								{cart.map((item) => (
									<CartItem key={item._id} item={item} />
								))}
							</div>
						)}
						{cart.length > 0 && <PeopleAlsoBought />}
					</motion.div>

					{cart.length > 0 && (
						<motion.div
							className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<OrderSummary />
							<GiftCouponCard />
							<button onClick={handleCheckout} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">
								Checkout
							</button>
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
};
export default CartPage;

const EmptyCartUI = () => (
	<motion.div
		className='flex flex-col items-center justify-center space-y-4 py-16'
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<ShoppingCart className='h-24 w-24 text-gray-300' />
		<h3 className='text-2xl font-semibold '>Your cart is empty</h3>
		<p className='text-gray-400'>Looks like you {"haven't"} added anything to your cart yet.</p>
		<Link
			className='mt-4 rounded-md bg-emerald-500 px-6 py-2 text-white transition-colors hover:bg-emerald-600'
			to='/'
		>
			Start Shopping
		</Link>
	</motion.div>
);
