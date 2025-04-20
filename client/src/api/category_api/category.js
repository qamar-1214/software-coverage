import { BASE_URL } from "../../url";

export const fetchCategories = async () => {
	try {
		const response = await fetch(
			`${BASE_URL}api/v1/category/get-all-categories`
		);
		const data = await response.json();
		return data.data.categories;
	} catch (error) {
		console.error("Error fetching categories:", error);
		return [];
	}
};

export const fetchCategoriesWithDescription = async () => {
	try {
		const response = await fetch(
			`${BASE_URL}api/v1/category/get-all-categories-with-description`
		);
		const data = await response.json();
		return data.data.categories;
	} catch (error) {
		console.error("Error fetching categories:", error);
		return [];
	}
};

export const addCategory = async (categoryData) => {
	try {
		const response = await fetch(`${BASE_URL}api/v1/category/add-category`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(categoryData),
		});

		if (!response.ok) {
			// Handle HTTP errors
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to add category");
		}

		const result = await response.json();
		return result; // Return the response data
	} catch (error) {
		console.error("Error adding category:", error.message);
		throw error; // Re-throw the error for further handling
	}
};

export const updateCategory = async (categoryId, updatedData) => {
	try {
		const response = await fetch(
			`${BASE_URL}api/v1/category/update-category/${categoryId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedData),
			}
		);
		console.log(updatedData);

		// Check if the response is successful
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to update category");
		}

		// Parse and return the response data
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error updating category:", error.message);
		throw error; // Re-throw error to be handled by the caller
	}
};

export const deleteCategory = async (categoryId) => {
	try {
		const response = await fetch(
			`${BASE_URL}api/v1/category/delete-category/${categoryId}`,
			{
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			}
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to delete category");
		}

		return await response.json(); // Return the response if needed
	} catch (error) {
		console.error("Error deleting category:", error);
		throw error; // Rethrow the error for handling in the calling function
	}
};

export const fetchCategoryById = async (categoryId) => {
	try {
		const response = await fetch(
			`${BASE_URL}api/v1/category/get-category-by-id/${categoryId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();

		if (data.success) {
			console.log("Category fetched successfully:", data.data.category);
			return data.data.category;
		} else {
			throw new Error(data.message || "Failed to fetch category");
		}
	} catch (error) {
		console.error("Error fetching category:", error);
		throw error;
	}
};
