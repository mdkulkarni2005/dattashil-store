import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
	{ href: "/Residential Floor Plans", name: "Residential Floor Plans", imageUrl: "/1.jpg" },
	{ href: "/Commercial Floor Plans", name: "Commercial Floor Plans", imageUrl: "/2.jpg" },
	{ href: "/Row House Floor Plans", name: "Row House Floor Plans", imageUrl: "/3.jpg" },
	{ href: "/Electrical Plan", name: "Electrical Plan", imageUrl: "/7.jpg" },
	{ href: "/Plumbing Plan", name: "Plumbing Plan", imageUrl: "/8.jpg" },
	{ href: "/Interior Design Floor Plan", name: "Interior Design Floor Plan", imageUrl: "/4.jpg" },
	{ href: "/Ceiling POP Plan", name: "Ceiling POP Plan", imageUrl: "/9.jpg" },
	{ href: "/Residential Layout Plan", name: "Residential Layout Plan", imageUrl: "/5.webp" },
	{ href: "/Commercial Layout Plan", name: "Commercial Layout Plan", imageUrl: "/6.webp" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className="relative min-h-screen text-white overflow-hidden">
			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
					Explore Our Categories
				</h1>
				<p className="text-center text-xl text-gray-300 mb-12">
					Explore the compact house plans
				</p>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
			</div>

			<div className="text-center mb-8 text-lg">
				After The Payment, the PDF will be sent to your registered email.
			</div>

			<div className="text-center text-base mb-5">
				<h2 className="font-semibold mb-4 text-xl">Terms & Conditions</h2>
				<div className="space-y-3">
					<p>
						<strong>1. Introduction:</strong> Welcome to <a href="https://dattashil-store.onrender.com/" className="text-blue-500 underline">https://dattashil-store.onrender.com/</a>. By using our website, you agree to these Terms and Conditions. If you do not agree, please do not use our website.
					</p>

					<p>
						<strong>2. User Accounts:</strong> You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your account information and for all activities under your account.
					</p>

					<p>
						<strong>3. Products and Services:</strong> All products and services provided on our website are subject to availability. We reserve the right to modify or discontinue any product or service without notice.
					</p>

					<p>
						<strong>4. Pricing:</strong> All prices are listed in INR and are subject to change without notice. We make every effort to ensure prices are accurate but are not liable for any errors.
					</p>

					<p>
						<strong>5. Payment:</strong> Payments can be made through accepted payment methods. By providing payment information, you represent and warrant that you have the legal right to use the payment method.
					</p>

					<p>
						<strong>6. Refunds and Cancellations:</strong> Refunds will be processed in line with our Refund Policy. Please allow 5-7 working days for the refund to reflect in your bank account.
					</p>

					<p>
						<strong>7. Privacy Policy:</strong> Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your personal information.
					</p>

					<p>
						<strong>8. Changes to Terms:</strong> We may update these Terms and Conditions from time to time. Any changes will be posted on this page, and your continued use of the website constitutes acceptance of the new terms.
					</p>

					<p>
						<strong>9. Contact Us:</strong> For any questions or concerns regarding these Terms and Conditions, please contact us at:
						<br />
						<strong>Email:</strong> <a href="mailto:dattatray.bahalkar@gmail.com" className="text-blue-500 underline">dattatray.bahalkar@gmail.com</a>
						<br />
						<strong>Phone:</strong> +91 9403236363
						<br />
						<strong>Office:</strong> DATTASHIL Planning & Construction, Varkhedi Road, Opp. of Bhole Baba Bhuvan, Old Dhule, Dhule.
					</p>

					<p>
						<strong>10. Working Days and Hours:</strong> Monday to Saturday, 9am to 10pm
					</p>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
