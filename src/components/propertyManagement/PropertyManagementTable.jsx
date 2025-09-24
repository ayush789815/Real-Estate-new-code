import React, { useEffect, useMemo, useState } from "react";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import usePropertyManagement from "../../Hoocks/usePropertyManagement";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addtoggleInformation,
  deleteProject,
  showPropertyInformation,
} from "../../utils/PropertyManagementSlice";
import Pagination from "../UI/Pagination";

const ROWS_PER_PAGE = 7;

const PropertyManagementTable = ({
  searchQuery,
  postedByFilter,
  statusFilter,
}) => {
  const dispatch = useDispatch();
  const propertyInformation = useSelector(
    (store) => store.PropertyInfo.propertyInformation
  );
  usePropertyManagement();

  const [localData, setLocalData] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openId, setOpenId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  useEffect(() => {
    if (Array.isArray(propertyInformation)) setLocalData(propertyInformation);
  }, [propertyInformation]);

  const updateStatus = async (id, selectedValue) => {
    const newStatus = selectedValue === "Active";
    setLoadingId(id);

    try {
      const response = await fetch(
        `https://realstate-2.onrender.com/api/v1/project/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) throw new Error("Update failed");

      setLocalData((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );

      toast[newStatus ? "success" : "warning"](
        `Property is now ${newStatus ? "Active" : "Inactive"}.`
      );
    } catch (error) {
      toast.error("Failed to update status.");
    } finally {
      setLoadingId(null);
    }
  };

  const handlePropertInfo = (property) => {
    dispatch(addtoggleInformation());
    dispatch(showPropertyInformation(property));
  };

  const handleDeleteClick = (id) => {
    setSelectedPropertyId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteProject(selectedPropertyId)).unwrap();
      toast.success("Project deleted successfully");
      setLocalData((prev) =>
        prev.filter((item) => item._id !== selectedPropertyId)
      );
    } catch {
      toast.error("Failed to delete project");
    } finally {
      setShowDeleteModal(false);
      setSelectedPropertyId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedPropertyId(null);
  };

  const filteredData = useMemo(() => {
    return localData.filter((item) => {
      const matchesSearch = item.projectname
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPostedBy =
        postedByFilter === "all" ||
        item.postedBy?.toLowerCase() === postedByFilter.toLowerCase();
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "Active" && item.status === true) ||
        (statusFilter === "Inactive" && item.status === false) ||
        (statusFilter === "For Sale" && item.saleType === "For Sale") ||
        (statusFilter === "For Rent" && item.saleType === "For Rent");
      return matchesSearch && matchesPostedBy && matchesStatus;
    });
  }, [localData, searchQuery, postedByFilter, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ROWS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, postedByFilter, statusFilter]);

  return (
    <div className="px-1">
      <div className="pb-5 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-900">
        <table className="w-full min-w-[800px] text-xs sm:text-sm border-separate border-spacing-0">
          <thead>
            <tr className="bg-[#F9FAFB] dark:bg-gray-900 shadow-[0_1px_0_0_rgba(0,0,0,0.25)] rounded-t-2xl">
              <th className="px-2 py-4 sm:px-6 sm:py-5 text-left font-medium text-gray-500 dark:text-gray-300 rounded-tl-2xl">
                Project Name
              </th>
              <th className="px-2 py-4 sm:px-6 sm:py-5 text-left font-medium text-gray-500 dark:text-gray-300">
                Status
              </th>
              <th className="px-2 py-4 sm:px-6 sm:py-5 text-left font-medium text-gray-500 dark:text-gray-300">
                Location
              </th>
              <th className="px-2 py-4 sm:px-6 sm:py-5 text-center font-medium text-gray-500 dark:text-gray-300 rounded-tr-2xl">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-800 rounded-b-2xl shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-10 text-center">
                  <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
                    <img
                      src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-9887573-8019254.png"
                      alt="No data"
                      className="w-32 sm:w-40 mb-4"
                    />
                    <p className="text-base sm:text-lg font-semibold">
                      No properties found
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-300">
                      Try adjusting your search or check back later.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((property) => (
                <tr
                  key={property._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-2 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                    {property.projectname || "N/A"}
                  </td>
                  <td className="px-2 py-3 sm:px-6 sm:py-4">
                    <div className="relative w-[140px]">
                      <button
                        type="button"
                        disabled={loadingId === property._id}
                        className={`h-9 sm:h-10 w-full flex items-center justify-between px-3 py-1 rounded-2xl shadow border transition
                        ${
                          loadingId === property._id
                            ? "text-gray-400 cursor-not-allowed bg-gray-200 dark:bg-gray-700"
                            : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                        }`}
                        onClick={() =>
                          !loadingId &&
                          setOpenId(
                            openId === property._id ? null : property._id
                          )
                        }
                      >
                        <span>
                          {loadingId === property._id
                            ? "Updating..."
                            : property.status
                            ? "Active"
                            : "Inactive"}
                        </span>
                        <IoMdArrowDropdown className="text-lg ml-2" />
                      </button>

                      {openId === property._id && !loadingId && (
                        <div className="absolute left-0 mt-2 w-full z-50 bg-white dark:bg-gray-800 flex flex-col gap-2 rounded-2xl shadow-lg ring-1 ring-black/5 p-1">
                          {["Active", "Inactive"].map((opt) => (
                            <div
                              key={opt}
                              className={`cursor-pointer py-2 px-3 rounded-2xl transition-colors duration-200 ${
                                (property.status ? "Active" : "Inactive") ===
                                opt
                                  ? "bg-[#1C2B49] text-white"
                                  : "hover:bg-[#1C2B49] hover:text-white dark:hover:bg-gray-700"
                              }`}
                              onClick={() => {
                                updateStatus(property._id, opt);
                                setOpenId(null);
                              }}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-2 py-3 sm:px-6 sm:py-4 text-gray-900 dark:text-gray-100">
                    {property.city || "N/A"}
                  </td>
                  <td className="px-2 py-3 sm:px-6 sm:py-4 text-lg sm:text-xl">
                    <div className="flex justify-center items-center gap-3">
                      <button
                        className="text-green-500 text-xl hover:text-green-600 dark:hover:text-green-400 transition"
                        onClick={() => handlePropertInfo(property)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="text-red-500 text-xl hover:text-red-600 dark:hover:text-red-400 transition"
                        onClick={() => handleDeleteClick(property._id)}
                      >
                        <RiDeleteBin5Line />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] max-w-md text-center transition-colors">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this project? This action cannot
              be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 dark:hover:bg-red-400 text-white px-4 py-2 rounded transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyManagementTable;
