import React, { useState } from "react";
import PropertyManagementTable from "./PropertyManagementTable";
import PropertyDetail from "./PropertyDetail";
import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import PropertyStatusFilter from "../UI/PropertyStatusFilter";
import PostedByFilter from "../UI/PostedByFilter";

const PropertyManagement = () => {
  const showPropertyInfo = useSelector(
    (store) => store.PropertyInfo.showPropertyInfo
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [postedByFilter, setPostedByFilter] = useState("all");

  return (
    <div className="min-h-screen pt-10 p-8 bg-[#F1FBFF] dark:bg-[#001118] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#283655] dark:text-[#597695]">
          Property Management
        </h1>
      </div>
      <hr className="my-4 border-t border-gray-300 dark:border-gray-700" />

      {/* Filters */}
      <div className="my-4 sm:my-6">
        <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 sm:items-center">
          {/* Search Input with Icon */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Property"
              className="w-full h-10 sm:h-12 pl-20 pr-4 py-2 rounded-3xl shadow-sm text-xs sm:text-base
                         bg-white text-gray-900 border border-gray-200
                         dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-600 transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl sm:text-2xl text-gray-600 dark:text-gray-300">
              <FiSearch strokeWidth={3} />
            </span>
          </div>

          {/* Status Filter Dropdown */}
          <PropertyStatusFilter
            value={statusFilter}
            onChange={setStatusFilter}
          />

          {/* Posted By Filter Dropdown */}
          <PostedByFilter value={postedByFilter} onChange={setPostedByFilter} />
        </form>
      </div>

      {/* Table and Detail View */}
      <div className="relative">
        {showPropertyInfo && <PropertyDetail />}
        <PropertyManagementTable
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          postedByFilter={postedByFilter}
        />
      </div>
    </div>
  );
};

export default PropertyManagement;
