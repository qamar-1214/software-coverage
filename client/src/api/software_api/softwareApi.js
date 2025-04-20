import axios from "axios";
import { BASE_URL } from "../../url";

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});
export const fetchPopularSubcategories = async () => {
	try {
		const response = await api.get(
			"api/v1/sub-category/get-popular-subcategories"
		);
		if (response.data.success) {
			return response.data.data.subCategories;
		}
		throw new Error(response.data.message);
	} catch (error) {
		console.error("Error fetching popular subcategories:", error);
		throw error.response?.data?.message || error.message;
	}
};

export const fetchTopProducts = async (subcategoryId) => {
	try {
		const response = await api.get(
			`api/v1/software/${subcategoryId}/get-top-software`
		);
		if (response.data.success) {
			return response.data.data;
		}
		throw new Error(response.data.message);
	} catch (error) {
		console.error("Error fetching products:", error);
		throw error.response?.data?.message || error.message;
	}
};

export const fetchAllProducts = async () => {
	try {
		const response = await api.get(
			`${BASE_URL}api/v1/software/get-all-softwares`
		);
		if (response.data.success) {
			return response.data.data;
		}
		throw new Error(response.data.message);
	} catch (error) {
		console.error("Error fetching products:", error);
		throw error.response?.data?.message || error.message;
	}
};

export const fetchAllSoftwareAdmin = async () => {
	try {
		const response = await api.get(
			`${BASE_URL}api/v1/software/get-all-softwares-admin`
		);
		if (response.data.success) {
			return response.data.data;
		}
		throw new Error(response.data.message);
	} catch (error) {
		console.error("Error fetching products:", error);
		throw error.response?.data?.message || error.message;
	}
};
export const addSoftware = async (productData) => {
	try {
		const formData = new FormData();

		// Append all product data to FormData
		Object.keys(productData).forEach((key) => {
			formData.append(key, productData[key]);
		});

		const response = await fetch(`${BASE_URL}api/v1/software/add-software`, {
			method: "POST",
			body: formData,
			// Don't set Content-Type header when sending FormData
			// The browser will automatically set it with the correct boundary
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to add software");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error adding software:", error);
		throw error;
	}
};

// Example usage in a custom hook

export const deleteSoftware = async (softwareId) => {
	try {
		const response = await fetch(
			`${BASE_URL}api/v1/software/delete-software/${softwareId}`,
			{
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			}
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to delete software");
		}

		return await response.json(); // Return the response if needed
	} catch (error) {
		console.error("Error deleting software:", error);
		throw error; // Rethrow the error for handling in the calling function
	}
};
