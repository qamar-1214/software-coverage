import axios from "axios";
import { BASE_URL } from "../../url";
export const fetchStaticData = async () => {
	try {
		const response = await axios.get(
			`${BASE_URL}api/v1/search/get-static-searchitems`
		); // Adjust the endpoint as needed
		return response.data;
	} catch (error) {
		console.error("Error fetching static data:", error);
		throw error; // Rethrow the error for further handling
	}
};
