import React from "react";
import ManagemntTable from "./ManagemntTable";
import UserManageInfo from "./UserManageInfo";
import UserInfo from "./UserInfo";
import { useSelector } from "react-redux";

const UserManagement = () => {
  const showUserInfo = useSelector((store) => store.user.showUserInfo);

  return (
    <div
      className="min-h-screen pt-3 
      bg-[#F1FBFF] dark:bg-[#001118]
      text-gray-900 dark:text-gray-100 
      transition-colors duration-300"
    >
      {/* User info modal */}
      {showUserInfo && <UserManageInfo />}

      {/* Top Section */}
      <UserInfo />

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-900 shadow-sm rounded-2xl mx-2 sm:mx-6 transition-colors duration-300">
        <ManagemntTable />
      </div>
    </div>
  );
};

export default UserManagement;
