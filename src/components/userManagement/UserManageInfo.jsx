import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosPeople } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";
import { toogleUserInfo } from "../../utils/userSlice";
import { updateUserStatus } from "../../utils/ManagementSlice";
import { toast } from "react-toastify";

const UserManageInfo = () => {
  const dispatch = useDispatch();
  const manageUser = useSelector((store) => store.manageUser.userInformation);
  const [isActive, setIsActive] = useState(manageUser?.isActive || false);

  useEffect(() => {
    setIsActive(manageUser?.isActive || false);
  }, [manageUser]);

  const closeUserInfo = () => dispatch(toogleUserInfo());

  const handleToggle = async () => {
    const newStatus = !isActive;
    setIsActive(newStatus);

    if (!manageUser?._id || manageUser._id.length !== 24) {
      toast.error("Invalid user ID. Cannot update status.");
      return;
    }

    try {
      const response = await fetch(
        `https://realstate-2.onrender.com/api/v1/user/status/${manageUser._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: newStatus }),
        }
      );

      if (!response.ok) throw new Error("Failed to update user status");

      dispatch(
        updateUserStatus({ userId: manageUser._id, isActive: newStatus })
      );

      toast.success(newStatus ? "User activated!" : "User deactivated!");
    } catch (error) {
      toast.error("Error updating status: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">
        {/* Close button */}
        <button
          onClick={closeUserInfo}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-white bg-gray-800 dark:bg-gray-700 rounded-md shadow hover:bg-gray-700 dark:hover:bg-gray-600 transition"
        >
          <RiCloseLargeFill className="text-xl" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {manageUser?.username || "N/A"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          {manageUser?.broker === "Yes" ? "Broker" : "User"}
        </p>

        {/* Info Fields in Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Role */}
          <div className="relative">
            <span className="absolute -top-2 left-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs px-2 rounded-full flex items-center gap-1 shadow">
              <IoIosPeople /> Role
            </span>
            <div className="w-full h-12 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center px-3 font-medium text-gray-800 dark:text-gray-100">
              {manageUser?.broker === "Yes" ? "Broker" : "User"}
            </div>
          </div>

          {/* Phone */}
          <div className="relative">
            <span className="absolute -top-2 left-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs px-2 rounded-full flex items-center gap-1 shadow">
              <FaPhoneAlt /> Phone
            </span>
            <div className="w-full h-12 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center px-3 font-medium text-gray-800 dark:text-gray-100">
              {manageUser?.phone_no || "N/A"}
            </div>
          </div>

          {/* Email (full width) */}
          <div className="relative md:col-span-2">
            <span className="absolute -top-2 left-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs px-2 rounded-full flex items-center gap-1 shadow">
              <MdEmail /> Email
            </span>
            <div className="w-full h-12 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center px-3 font-medium text-gray-800 dark:text-gray-100 truncate">
              {manageUser?.email || "N/A"}
            </div>
          </div>
        </div>

        {/* Toggle Section */}
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4 flex items-center justify-between">
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Active
          </span>
          <button
            onClick={handleToggle}
            className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
              isActive ? "bg-green-600" : "bg-gray-400 dark:bg-gray-600"
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition ${
                isActive ? "translate-x-7" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManageInfo;
