import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import axios from "../lib/axios";

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	const handlePayment = async () => {
		console.log("Initiating payment...");

		try {
			const res = await axios.post("/payments/create-order", {
				products: cart,
				couponCode: coupon ? coupon.code : null,
			});

			console.log("Order created:", res.data);

			const order = res.data;

			const options = {
				key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay key id
				amount: order.amount, // Amount is in currency subunits
				currency: "INR",
				name: "Your Company Name",
				description: "Test Transaction",
				order_id: order.id, // Use the id obtained from the previous step
				handler: async function (response) {
					// Handle the success response
					const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
					await axios.post("/payments/checkout-success", {
						orderId: razorpay_order_id,
						paymentId: razorpay_payment_id,
						signature: razorpay_signature,
						products: cart,
						totalAmount: total,
					});
					alert("Payment successful!");
					// Redirect or update UI as needed
				},
				prefill: {
					name: "Your Name",
					email: "your.email@example.com",
					contact: "9999999999",
				},
				notes: {
					address: "Sample Address",
				},
				theme: {
					color: "#F37254",
				},
			};

			const rzp1 = new window.Razorpay(options);
			rzp1.open();
		} catch (error) {
			console.error("Payment error:", error);
		}
	};

	return (
		<motion.div
			className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className='text-xl font-semibold text-emerald-400'>Order summary</p>

			<div className='space-y-4'>
				<div className='space-y-2'>
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-300'>Original price</dt>
						<dd className='text-base font-medium text-white'>${formattedSubtotal}</dd>
					</dl>

					{savings > 0 && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-gray-300'>Savings</dt>
							<dd className='text-base font-medium text-emerald-400'>-${formattedSavings}</dd>
						</dl>
					)}

					{coupon && isCouponApplied && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-gray-300'>Coupon ({coupon.code})</dt>
							<dd className='text-base font-medium text-emerald-400'>-{coupon.discountPercentage}%</dd>
						</dl>
					)}
					<dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
						<dt className='text-base font-bold text-white'>Total</dt>
						<dd className='text-base font-bold text-emerald-400'>${formattedTotal}</dd>
					</dl>
				</div>

				<motion.button
					className='flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handlePayment}
				>
					Proceed to Checkout
				</motion.button>

				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm font-normal text-gray-400'>or</span>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline'
					>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>
			</div>
		</motion.div>
	);
};

export default OrderSummary;
