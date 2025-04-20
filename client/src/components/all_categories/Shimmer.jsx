const ShimmerCard = () => {
	return (
		<div className="relative overflow-hidden rounded-lg bg-white shadow-md">
			{/* Card header shimmer */}
			<div className="p-4 space-y-3">
				<div className="h-4 w-3/4 bg-gray-200 rounded animate-shimmer"></div>
			</div>

			{/* Grid of software icons shimmer */}
			<div className="grid grid-cols-2 gap-2 p-4">
				{[...Array(4)].map((_, index) => (
					<div
						key={index}
						className="aspect-square bg-gray-200 rounded animate-shimmer"
					></div>
				))}
			</div>
		</div>
	);
};

// ShimmerGrid.jsx
const ShimmerGrid = () => {
	return (
		<div className="space-y-6">
			{/* Filter bar shimmer */}
			<div className="flex justify-between items-center mb-6">
				<div className="h-8 w-32 bg-gray-200 rounded animate-shimmer"></div>
				<div className="h-8 w-40 bg-gray-200 rounded animate-shimmer"></div>
			</div>

			{/* Search bar shimmer */}
			<div className="h-12 w-full bg-gray-200 rounded animate-shimmer mb-6"></div>

			{/* Grid shimmer */}
			<div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-6">
				{[...Array(12)].map((_, index) => (
					<ShimmerCard key={index} />
				))}
			</div>
		</div>
	);
};

export { ShimmerCard, ShimmerGrid };
