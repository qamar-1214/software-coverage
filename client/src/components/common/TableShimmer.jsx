const TableShimmer = () => {
	return (
		<div className="w-full">
			<div className="animate-pulse">
				<div className="h-8 bg-gray-200 rounded-md mb-4 w-1/4"></div>
				<div className="space-y-3">
					{[1, 2, 3, 4, 5, 6].map((item) => (
						<div key={item} className="h-16 bg-gray-200 rounded-md"></div>
					))}
				</div>
			</div>
		</div>
	);
};
export default TableShimmer;
