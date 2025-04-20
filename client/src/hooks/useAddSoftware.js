import { useState } from "react";
import { addSoftware } from "../api/software_api/softwareApi";
export const useAddSoftware = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const addProduct = async (productData) => {
		setLoading(true);
		setError(null);
		try {
			const result = await addSoftware(productData);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return { addProduct, loading, error };
};
