import React from "react";
import SoftwareCard from "../cards/SoftwareCard";
import { useSoftwareData } from "../../hooks/useSoftwareData";
import { Link } from "react-router-dom";

const SkeletonLoader = ({ className }) => (
	<div className={`bg-gray-300 animate-pulse ${className}`} />
);

const PopularSoftwareCategories = () => {
	const {
		popularSubcategories,
		products,
		isLoadingSubcategories,
		isLoadingProducts,
		error,
		selectedSubcategory,
		handleSubcategorySelect,
	} = useSoftwareData();

	if (error) {
		return <div className="text-center text-red-600">Error: {error}</div>;
	}

	return (
		<div className="bg-gray-100 py-8 md:py-12">
			<div className="mx-auto px-4 md:px-6 ">
				<h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
					Popular Software Categories
				</h2>
				<h2 className="text-center mb-8 md:mb-10 text-base md:text-xl text-gray-600">
					Discover the best software options tailored to your business needs.
				</h2>

				<div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-6 2xl:mx-96">
					{/* Popular Subcategories Sidebar */}
					<div className="bg-gray-100 w-full lg:w-auto">
						{isLoadingSubcategories ? (
							<ul className="grid grid-cols-2 lg:grid-cols-1 gap-2 py-4">
								{Array.from({ length: 6 }).map((_, index) => (
									<SkeletonLoader
										key={index}
										className="h-10 w-full rounded-lg"
									/>
								))}
							</ul>
						) : (
							<div className="w-full overflow-x-auto lg:overflow-x-visible">
								<ul className="flex  lg:flex-col gap-2 mb-4 whitespace-nowrap min-w-min">
									{popularSubcategories.map((subcategory) => (
										<li
											key={subcategory._id}
											onClick={() => handleSubcategorySelect(subcategory)}
											className="flex-shrink-0 lg:flex-shrink font-bold text-sm md:text-xl cursor-pointer py-2  rounded-lg text-center lg:text-left  "
										>
											<Link
												className={`text-[18.6988px] p-2 rounded-lg ${
													subcategory._id === selectedSubcategory?._id
														? "color-custom-gradient text-white"
														: "text-gray-900 hover:bg-gray-100"
												}`}
											>
												{subcategory.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>

					{/* Products Section */}
					<div className="w-full lg:w-[60%]">
						{isLoadingProducts ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{Array.from({ length: 6 }).map((_, index) => (
									<div
										key={index}
										className="p-4 border rounded-lg bg-white shadow-sm"
									>
										<SkeletonLoader className="h-12 w-12 rounded-md mb-4" />
										<SkeletonLoader className="h-4 w-3/4 mb-2" />
										<SkeletonLoader className="h-4 w-1/2" />
									</div>
								))}
							</div>
						) : (
							<div className="min-h-[400px] flex flex-col">
								{products?.topSoftware && products.topSoftware.length > 0 ? (
									<>
										<div className="flex flex-col">
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
												{products.topSoftware.map((product) => (
													<SoftwareCard
														key={product._id}
														title={product.name}
														tekponScore={product.score}
														icon={product.imageUrl.url}
														imageAlt={`${product.name} logo`}
														onClick={() =>
															(window.location.href = `/software/${product._id}`)
														}
													/>
												))}
											</div>

											{selectedSubcategory && (
												<div className="text-center mt-4">
													<a
														href={`/subcategories/${selectedSubcategory._id}`}
														className="text-purple-600 font-medium text-base md:text-xl hover:text-purple-800 underline"
													>
														See All {selectedSubcategory.name} Software
													</a>
												</div>
											)}
										</div>
									</>
								) : (
									<div className="flex-grow flex flex-col justify-center items-center text-center text-gray-500 space-y-4 p-8">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-16 w-16 text-gray-300"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										<p className="text-xl font-semibold">
											No software found for this category
										</p>
										<p className="text-gray-400">
											We are currently updating our software listings for this
											category.
										</p>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PopularSoftwareCategories;
