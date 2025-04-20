const renderSection = (title, items, type) => {
	if (!items || items.length === 0) return null;

	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold mb-4 text-left">{title}</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{items.map((item) => (
					<Link
						key={item._id}
						to={handleItemClick(item._id, type)}
						className="flex items-center p-4 bg-white border border-gray-100 rounded-lg drop-shadow-lg hover:shadow-2xl transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
					>
						{item.imageUrl?.url && (
							<img
								src={item.imageUrl.url}
								alt={item.name}
								className="w-12 h-12 object-contain mr-4"
							/>
						)}
						<span className="font-medium text-gray-800 text-left">
							{item.name}
						</span>
					</Link>
				))}
			</div>
		</div>
	);
};

const shouldRenderSection = (sectionName) => {
	return (
		selectedOptions.includes("All Options") ||
		selectedOptions.includes(sectionName)
	);
};

const renderSearchResults = () => {
	if (isLoading) {
		return <div className="p-4 text-center text-gray-500">Searching...</div>;
	}

	return (
		<>
			{shouldRenderSection("Software") &&
				renderSection(
					"Software Reviews",
					searchResults?.software?.length > 0
						? searchResults.software
						: staticData?.softwares,
					"software"
				)}

			{shouldRenderSection("Categories") &&
				renderSection(
					"Categories",
					searchResults?.categories?.length > 0
						? searchResults.categories
						: staticData?.subcategories,
					"category"
				)}

			{shouldRenderSection("Deals") &&
				renderSection("Free Trials", initialData.freeTrials, "freeTrial")}

			{shouldRenderSection("Insights") &&
				renderSection("Insights", initialData.insights, "insight")}

			{shouldRenderSection("PR") &&
				renderSection("Press Releases", initialData.pressRelases, "press")}

			{shouldRenderSection("News") &&
				renderSection("News", initialData.news, "news")}

			{shouldRenderSection("Products") &&
				renderSection("Podcasts", initialData.podcasts, "podcast")}
		</>
	);
};

export { renderSearchResults, renderSection, shouldRenderSection };
