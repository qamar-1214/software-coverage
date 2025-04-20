import React, { useState, useEffect } from "react";
import { Pen } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchAllSoftwareAdmin } from "../../api/software_api/softwareApi";

const SoftwareDescriptionForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [softwares, setSoftwares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSoftware, setSelectedSoftware] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    features: "",
  });

  const ITEMS_PER_PAGE = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchSoftwares();
  }, []);

  // Fetch software list from API
  const fetchSoftwares = async () => {
    setLoading(true);
    try {
      const response = await fetchAllSoftwareAdmin();
      setSoftwares(response.softwares);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Open the form with pre-filled data
  const handleOpenForm = (software) => {
    setSelectedSoftware(software);
    setFormData({
      name: software.name || "",
      description: software.description || "",
      category: software.category || "",
      features: software.features ? software.features.join(", ") : "",
    });
    setIsFormOpen(true);
  };

  // Close the form
  const handleCloseForm = () => {
    setSelectedSoftware(null);
    setIsFormOpen(false);
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/software-description", {
        ...formData,
        features: formData.features.split(","), // Convert features to array
      });
      toast.success("Software Description Added Successfully!");
      fetchSoftwares(); // Refresh the table
      handleCloseForm();
    } catch (error) {
      console.error(error);
      toast.error("Error adding software description");
    }
  };

  // Filter software based on search term
  const filteredSoftwares = softwares.filter((software) =>
    software.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredSoftwares.length / ITEMS_PER_PAGE);
  const displayedSoftwares = filteredSoftwares.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Software Descriptions</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search software..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 my-4"
        />

        {/* Software Table */}
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Image
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedSoftwares.map((software) => (
              <tr key={software._id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-4 py-2">
                  <img src={software.imageUrl?.url} alt={software.name} className="w-12 h-12 object-cover rounded-md" />
                </td>
                <td className="px-4 py-2 text-gray-700">{software.name}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    className="text-blue-600 hover:text-blue-900 flex items-center"
                    onClick={() => handleOpenForm(software)}
                  >
                    <Pen size={18} className="mr-1" /> Description Form
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md text-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-300 rounded-md text-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Description Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Software Description</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Software Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Features (comma separated)</label>
                <input
                  type="text"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Submit
                </button>
                <button type="button" onClick={handleCloseForm} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SoftwareDescriptionForm;
