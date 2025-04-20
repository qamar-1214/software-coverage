import { BASE_URL } from "../../url";
import axios from "axios";

export const fetchSubcategories = async (page = 1, limit = 5) => {
	try {
		const response = await fetch(
			`${BASE_URL}api/v1/sub-category/get-all-subcategories?page=${page}&limit=${limit}`
		);
		const data = await response.json();
		return {
			subCategories: data.data.subCategories,
			totalPages: Math.ceil(data.data.total / limit),
			currentPage: page,
			total: data.data.total,
		};
	} catch (error) {
		console.error("Error fetching categories:", error);
		return {
			subCategories: [],
			totalPages: 0,
			currentPage: 1,
			total: 0,
		};
	}
};
export const fetchSubCategoriesByCategoryId = async (categoryId) => {
	try {
		if (!categoryId) return [];

		const response = await fetch(
			`${BASE_URL}api/v1/sub-category/${categoryId}/get-sub-categories`
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to fetch subcategories");
		}

		const data = await response.json();

		// Extract subCategories from the nested structure
		return data?.data?.subCategories || [];
	} catch (error) {
		console.error("Error fetching subcategories:", error);
		throw error;
	}
};

// export const fetchSubcategoriesWithDescription = async (
// 	page = 1,
// 	limit = 5
// ) => {
// 	try {
// 		const response = await fetch(
// 			`${BASE_URL}api/v1/sub-category/get-all-subcategories-with-description?page=${page}&limit=${limit}`
// 		);
// 		const data = await response.json();
// 		return {
// 			subCategories: data.data.subCategories,
// 		};
// 	} catch (error) {
// 		console.error("Error fetching categories:", error);
// 		return {
// 			subCategories: [],
// 			totalPages: 0,
// 			currentPage: 1,
// 			total: 0,
// 		};
// 	}
// };

export const fetchSubcategoriesWithDescription = async () => {
	try {
		const response = await fetch(
			`${BASE_URL}api/v1/sub-category/get-sub-category-admin`
		);
		const data = await response.json();
		return {
			subCategories: data.data.subCategories,
		};
	} catch (error) {
		console.error("Error fetching categories:", error);
		return {
			subCategories: [],
		};
	}
};

export const addSubCategory = async (formData) => {
	try {
		const response = await fetch(
			`${BASE_URL}api/v1/sub-category/add-subcategory`,
			{
				method: "POST",
				body: formData, // Use FormData directly as the request body
			}
		);

		if (!response.ok) {
			// Handle HTTP errors
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to add subcategory");
		}

		const result = await response.json();
		return result; // Return the response data
	} catch (error) {
		console.error("Error adding sub-category:", error.message);
		throw error; // Re-throw the error for further handling
	}
};

export const updateSubcategory = async (subcategoryId, updatedData) => {
	try {
		const response = await axios.put(
			`${BASE_URL}api/v1/sub-category/update-subcategory/${subcategoryId}`,
			updatedData
		);

		return {
			success: true,
			message: "Subcategory updated successfully",
			subcategory: response.data,
		};
	} catch (error) {
		console.error("Error updating subcategory:", error);
		throw error;
	}
};
export const deleteSubCategory = async (subCategoryId) => {
	try {
		const response = await fetch(
			`${BASE_URL}api/v1/sub-category/delete-subcategory/${subCategoryId}`,
			{
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			}
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to delete subcategory");
		}

		return await response.json(); // Return the response if needed
	} catch (error) {
		console.error("Error deleting csubategory:", error);
		throw error; // Rethrow the error for handling in the calling function
	}
};
