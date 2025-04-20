import { useState, useEffect } from "react";
import { fetchSubCategoriesByCategoryId } from "../api/subcategory_api/subcatgegory";
export const useSubCategories = (categoryId) => {
	const [subCategories, setSubCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getSubCategories = async () => {
			if (!categoryId) {
				setSubCategories([]);
				return;
			}

			setLoading(true);
			setError(null);

			try {
				const data = await fetchSubCategoriesByCategoryId(categoryId);
				setSubCategories(data);
			} catch (err) {
				setError(err.message);
				setSubCategories([]);
			} finally {
				setLoading(false);
			}
		};

		getSubCategories();
	}, [categoryId]);

	return { subCategories, loading, error };
};
