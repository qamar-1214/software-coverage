import React from "react";
import TopSection from "../../components/all_categories/TopSection";
import CategoryGrid from "../../components/all_categories/CategoryGrid";

const AllCategories = () => {
	return (
		<>
			<div
				className="
					px-4 
					sm:px-8 
					md:px-12 
					lg:px-24 
					xl:px-30
					2xl:px-60 
					py-10
					
				"
			>
				<TopSection />
				<CategoryGrid />
			</div>
		</>
	);
};

export default AllCategories;
