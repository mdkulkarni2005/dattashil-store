import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
	{ href: "/Residential Floor Plans", name: "Residential Floor Plans", imageUrl: "/1.jpg" },
	{ href: "/Commercial Floor Plans", name: "Commercial Floor Plans", imageUrl: "/2.jpg" },
	{ href: "/Row House Floor Plans", name: "Row House Floor Plans", imageUrl: "/3.jpg" },
	{ href: "/Interior Design Floor Plan", name: "Interior Design Floor Plan", imageUrl: "/4.jpg" },
	{ href: "/Residential Layout Plan", name: "Residential Layout Plan", imageUrl: "/5.webp" },
	{ href: "/Commercial Layout Plan", name: "Commercial Layout Plan", imageUrl: "/6.webp" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
					Explore Our Categories
				</h1>
				<p className='text-center text-xl text-gray-300 mb-12'>
					Discover the latest trends in eco-friendly fashion
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
			</div>
			<div className="text-center mb-5">
				After The Payment the PDF will sent to your Register Email
			</div>

			<div className="text-center text-xl mb-5">
				Terms & Conditions

				<p className="flex text-center">
					1. Introduction Welcome to .https://dattashil-store.onrender.com/ By using our website, you agree to these Terms and Conditions. If you do not agree, please do not use our website.

					2. User Accounts You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your account information and for all activities under your account.

					3. Products and Services All products and services provided on our website are subject to availability. We reserve the right to modify or discontinue any product or service without notice.

					4. Pricing All prices are listed in INR and are subject to change without notice. We make every effort to ensure prices are accurate but are not liable for any errors.

					5. Payment Payments can be made through accepted payment methods. By providing payment information, you represent and warrant that you have the legal right to use the payment method.

					6. Refunds and Cancellations Refunds will be processed in line with our Refund Policy. Please allow 5-7 working days for the refund to reflect in your bank account.

					7. Privacy Policy Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your personal information.

					8. Changes to Terms We may update these Terms and Conditions from time to time. Any changes will be posted on this page, and your continued use of the website constitutes acceptance of the new terms.

					9. Contact Us For any questions or concerns regarding these Terms and Conditions, please contact us at:

					Email: dattatray.bahalkar@gmail.com
					Phone: +91 9403236363 
				</p>
			</div>
		</div>
	);
};
export default HomePage;
