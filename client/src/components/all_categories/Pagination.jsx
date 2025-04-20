// src/components/Pagination.jsx
import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [inputValue, setInputValue] = useState(currentPage);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value); // Update the input field as the user types
  };

  const handleInputBlur = () => {
    const page = Math.max(
      1,
      Math.min(totalPages, Number(inputValue) || currentPage)
    );
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInputBlur(); // Navigate on pressing Enter
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 my-6">
      {currentPage > 1 && (
        <button
          className="px-4 py-2 bg-white text-black rounded border border-black"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <div className="flex items-center text-nowrap">
            <ChevronLeft />
            <p>Prev Page</p>
          </div>
        </button>
      )}
      <span className="text-gray-800 text-xl text-nowrap">
        <input
          value={inputValue}
          type="number"
          min="1"
          max={totalPages}
          className="w-14 text-center px-1 py-0 mt-0 ml-0 bg-white text-black rounded-lg border border-gray-400"
          onChange={handleInputChange}
          onBlur={handleInputBlur} // Trigger navigation on blur
          onKeyDown={handleKeyDown} // Trigger navigation on Enter
        />{" "}
        of {totalPages}
      </span>
      {currentPage < totalPages && (
        <button
          className="px-4 py-2 bg-white text-black rounded border border-black"
          onClick={() => onPageChange(currentPage + 1)}
        >
          <div className="flex items-center text-nowrap">
            <p>Next Page</p>
            <ChevronRight />
          </div>
        </button>
      )}
    </div>
  );
};

export default Pagination;
