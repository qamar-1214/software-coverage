// hooks/useProductForm.js

import { useState, useEffect } from "react";
import { addSoftware } from "../api/software_api/softwareApi";
import { useSubCategories } from "./useSubcategory";

export const useProductForm = (onSuccess) => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		score: "",
		category: "",
		subCategory: "",
		image: null,
	});
	const [imagePreview, setImagePreview] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Get subcategories based on selected category
	const {
		subCategories,
		loading: subCategoriesLoading,
		error: subCategoriesError,
	} = useSubCategories(formData.category);

	// Reset subcategory when category changes
	useEffect(() => {
		setFormData((prev) => ({
			...prev,
			subCategory: "",
		}));
	}, [formData.category]);

	const handleChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleImageChange = (file) => {
		if (file) {
			setFormData((prev) => ({
				...prev,
				image: file,
			}));

			// Create preview URL
			const previewUrl = URL.createObjectURL(file);
			setImagePreview(previewUrl);
		}
	};

	const resetForm = () => {
		setFormData({
			name: "",
			description: "",
			score: "",
			category: "",
			subCategory: "",
			image: null,
		});
		setImagePreview(null);
		setError(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			await addSoftware(formData);
			resetForm();
			onSuccess?.();
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return {
		formData,
		imagePreview,
		loading,
		error,
		subCategories,
		subCategoriesLoading,
		subCategoriesError,
		handleChange,
		handleImageChange,
		handleSubmit,
		resetForm,
	};
};
