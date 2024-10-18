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
				Explore the compact house plans
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
		</div>
	);
};
export default HomePage;
