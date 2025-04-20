import { useState, useEffect, useMemo, useCallback } from "react";
import {
	fetchPopularSubcategories,
	fetchTopProducts,
} from "../api/software_api/softwareApi.js";

export const useSoftwareData = () => {
	const [popularSubcategories, setPopularSubcategories] = useState([]);
	const [selectedSubcategory, setSelectedSubcategory] = useState(null);
	const [products, setProducts] = useState([]);
	const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false);
	const [isLoadingProducts, setIsLoadingProducts] = useState(false);
	const [error, setError] = useState(null);

	// Fetch popular subcategories on mount
	useEffect(() => {
		const loadPopularSubcategories = async () => {
			setIsLoadingSubcategories(true);
			try {
				const data = await fetchPopularSubcategories();
				setPopularSubcategories(data);
				// Load products for the first subcategory by default
				if (data.length > 0) {
					setSelectedSubcategory(data[0]);
				}
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoadingSubcategories(false);
			}
		};
		loadPopularSubcategories();
	}, []);

	// Memoize the loadProducts function to prevent unnecessary recreations
	const loadProducts = useCallback(async (subcategoryId) => {
		setIsLoadingProducts(true);
		try {
			const data = await fetchTopProducts(subcategoryId);
			setProducts(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoadingProducts(false);
		}
	}, []); // Empty dependency array as it doesn't depend on any changing values

	// Load products when selectedSubcategory changes
	useEffect(() => {
		if (selectedSubcategory) {
			loadProducts(selectedSubcategory._id);
		}
	}, [selectedSubcategory, loadProducts]);

	// Memoize the handleSubcategorySelect function
	const handleSubcategorySelect = useCallback((subcategory) => {
		setSelectedSubcategory(subcategory);
	}, []);

	// Memoize the return object to prevent unnecessary re-renders of consuming components
	const memoizedValue = useMemo(
		() => ({
			popularSubcategories,
			products,
			isLoadingSubcategories,
			isLoadingProducts,
			error,
			selectedSubcategory,
			handleSubcategorySelect,
		}),
		[
			popularSubcategories,
			products,
			isLoadingSubcategories,
			isLoadingProducts,
			error,
			selectedSubcategory,
			handleSubcategorySelect,
		]
	);

	return memoizedValue;
};
