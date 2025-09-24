import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`w-8 h-8 flex items-center justify-center rounded-[12px] shadow-md text-sm font-medium transition
          ${
            currentPage === i
              ? "bg-[#283655] text-white"
              : "bg-[#F5F5F5] text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 mt-4">
      {/* Prev button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`w-12 h-12 flex items-center justify-center rounded-[8px] transition
          ${
            currentPage === 1
              ? "bg-gray-300 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
              : "bg-[#283655] text-white hover:opacity-90"
          }`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page numbers */}
      {pages}

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`w-12 h-12 flex items-center justify-center rounded-[8px] transition
          ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
              : "bg-[#283655] text-white hover:opacity-90"
          }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
