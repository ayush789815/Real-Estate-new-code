import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toogleUserInfo } from "../../utils/userSlice";
import useUserManagemnt from "../../Hoocks/useUserManagemnt";
import { showuserInformation } from "../../utils/ManagementSlice";
import Pagination from "../UI/Pagination";

const USERS_PER_PAGE = 7;

const ManagemntTable = () => {
  const dispatch = useDispatch();
  useUserManagemnt();

  const manageUser = useSelector((store) => store.manageUser.userProfile) || [];
  const searchQuery =
    useSelector((store) => store.manageUser.searchQuery) || "";
  const statusFilter =
    useSelector((store) => store.manageUser.statusFilter) || "all";

  const [currentPage, setCurrentPage] = useState(1);

  // Filter users
  const filteredUsers = Array.isArray(manageUser)
    ? manageUser.filter((user) => {
        const name = user.username || "";
        const status = user.isActive ? "active" : "inactive";
        const matchesName = name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || status === statusFilter.toLowerCase();
        return matchesName && matchesStatus;
      })
    : [];

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE
  );

  // Show user info modal
  const showUserInfo = (user) => {
    dispatch(toogleUserInfo());
    dispatch(showuserInformation(user));
  };

  const handlePageClick = (page) => setCurrentPage(page);

  return (
    <div>
      <div className="pb-5 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-900">
        <table className="w-full  sm:min-w-full text-xs sm:text-sm border-separate border-spacing-0 ">
          {/* Table Head */}
          <thead>
            <tr className="bg-[#F9FAFB] dark:bg-gray-800 shadow-[0_1px_0_0_rgba(0,0,0,0.25)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.15)] rounded-t-2xl">
              <th className="px-2 py-4 sm:px-6 sm:py-5 text-left font-medium text-gray-500 dark:text-gray-300 rounded-tl-2xl">
                User Name
              </th>
              <th className="px-2 py-4 sm:px-6 sm:py-5 text-left font-medium text-gray-500 dark:text-gray-300">
                Status
              </th>
              <th className="px-2 py-4 sm:px-6 sm:py-5 text-left font-medium text-gray-500 dark:text-gray-300">
                Phone
              </th>
              <th className="px-2 py-4 sm:px-6 sm:py-5 text-left font-medium text-gray-500 dark:text-gray-300">
                Email
              </th>
              <th className="px-2 py-4 sm:px-6 sm:py-5 text-left font-medium text-gray-500 dark:text-gray-300">
                Role
              </th>
              <th className="px-2 py-4 sm:px-6 sm:py-5 text-left font-medium text-gray-500 dark:text-gray-300 rounded-tr-2xl">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white dark:bg-gray-900 rounded-b-2xl shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-10 text-center">
                  <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
                    <img
                      src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-9887573-8019254.png"
                      alt="No data"
                      className="w-32 sm:w-40 mb-4"
                    />
                    <p className="text-base sm:text-lg font-semibold">
                      No users found
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
                      Try adjusting your search or check back later.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-2 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {user.username || "N/A"}
                  </td>
                  <td className="px-2 py-3 sm:px-6 sm:py-4 text-gray-700 dark:text-gray-200">
                    {user.isActive ? "Active" : "Inactive"}
                  </td>
                  <td className="px-2 py-3 sm:px-6 sm:py-4 text-gray-700 dark:text-gray-200">
                    {user.phone_no || "N/A"}
                  </td>
                  <td className="px-2 py-3 sm:px-6 sm:py-4 text-gray-700 dark:text-gray-200">
                    {user.email || "N/A"}
                  </td>
                  <td className="px-2 py-3 sm:px-6 sm:py-4 text-gray-700 dark:text-gray-200">
                    {user.broker === "Yes" ? "Broker" : "User"}
                  </td>
                  <td className="px-2 py-3 sm:px-6 sm:py-4 text-lg sm:text-xl">
                    <button
                      onClick={() => showUserInfo(user)}
                      className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {filteredUsers.length > USERS_PER_PAGE && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageClick}
          />
        )}
      </div>
    </div>
  );
};

export default ManagemntTable;
