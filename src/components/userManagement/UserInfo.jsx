import React, { useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setSearchQuery, setStatusFilter } from "../../utils/ManagementSlice";
import StatusFilter from "../UI/StatusFilter";

const UserInfo = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);

  const handleManageInfo = () => {
    dispatch(setSearchQuery(searchText.current.value));
  };

  return (
    <div className="sm:px-8 mt-2">
      {/* Page Title */}
      <div className="text-center sm:text-left">
        <h1 className="text-xl sm:text-3xl font-bold text-[#283655] dark:text-[#597695]">
          User Management
        </h1>
        <h4 className="mt-2 text-xs sm:text-[14px] tracking-normal text-gray-600 dark:text-gray-400">
          Manage and Track your employees effectively.
        </h4>
      </div>
      <hr className="my-4 border-t border-gray-300 dark:border-gray-700" />

      {/* Search + Filter */}
      <div className="my-4 sm:my-6">
        <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 sm:items-center">
          {/* Search input */}
          <div className="relative flex-1">
            <input
              onChange={handleManageInfo}
              ref={searchText}
              className="w-full h-10 sm:h-12 pl-20 pr-4 py-2 
                bg-white dark:bg-gray-900
                text-gray-800 dark:text-gray-100 
                rounded-3xl drop-shadow-lg
                border border-gray-200 dark:border-gray-700
                text-xs sm:text-base outline-none
                placeholder-gray-400 dark:placeholder-gray-500"
              type="text"
              placeholder="Search employees..."
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl sm:text-2xl text-gray-500 dark:text-gray-400">
              <FiSearch strokeWidth={3} />
            </span>
          </div>

          {/* Status filter */}
          <StatusFilter onChange={(val) => dispatch(setStatusFilter(val))} />
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
