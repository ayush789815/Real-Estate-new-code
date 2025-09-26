import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "/src/assets/logo-with-tag.svg";
import { BiBarChartSquare, BiUserCircle } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { FaSlidersH, FaUserPlus, FaRegUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Navbar = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      if (width >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Goodbye for now. Stay safe and productive!");
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-60">
        <button
          onClick={toggleSidebar}
          className="text-3xl text-gray-700 dark:text-white dark:bg-gray-700 p-2 rounded"
        >
          {isOpen ? <RxCross2 /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && windowWidth < 1024 && (
        <div
          className="fixed inset-0 bg-transparent z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 z-50 bg-[#F1FBFF] dark:bg-[#001118] text-gray-900 dark:text-white
        h-screen transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        w-64 lg:w-70 lg:static lg:translate-x-0`}
        style={{
          boxShadow: darkMode
            ? "2px 70px 10px 0px #000000"
            : "2px 0 10px rgba(0,0,0,0.1)",
        }}
        aria-label="sidebar navigation"
      >
        {/* Logo */}
        <div className="flex items-center justify-center lg:justify-center px-4 py-6  dark:border-gray-600">
          <img
            className="w-15 lg:w-20 dark:lg:w-18"
            src={darkMode ? "/RealEstate-Logo-Darkmode.png" : logo}
            alt="logo"
          />
          <h1 className="hidden lg:block font-black text-[24px] leading-[100%] tracking-normal  text-[#283655] dark:text-[#597695] px-2 py-1">
            Real Estate
          </h1>
        </div>
 <hr className="mt-[3px] border-t border-gray-300 dark:border-gray-700" />
        {/* Sidebar Links */}
        <ul className="mt-6">
          <SidebarItem
            to="/dashboard"
            icon={<BiBarChartSquare className="w-6 h-6" />}
            label="Dashboard"
            onClick={windowWidth < 1024 ? toggleSidebar : undefined}
            end // ✅ ensures Dashboard is only active on exact "/"
          />
          <SidebarItem
            to="/usermanagement"
            icon={<FaRegUserCircle className="w-6 h-6" />}
            label="User Management"
            onClick={windowWidth < 1024 ? toggleSidebar : undefined}
          />
          <SidebarItem
            to="/propertymanagement"
            icon={<VscSaveAs className="w-6 h-6" />}
            label="Property Management"
            onClick={windowWidth < 1024 ? toggleSidebar : undefined}
          />
          <SidebarItem
            to="/inactive-requext"
            icon={<FaUserPlus className="w-6 h-6" />}
            label="Listing/Inactive Request"
            onClick={windowWidth < 1024 ? toggleSidebar : undefined}
          />
          <SidebarItem
            to="/slide-manager"
            icon={<FaSlidersH className="w-6 h-6" />}
            label="Slider Management"
            onClick={windowWidth < 1024 ? toggleSidebar : undefined}
          />
          <SidebarItem
            to="/notification"
            icon={<MdNotificationsActive className="w-6 h-6" />}
            label="Notification"
            onClick={windowWidth < 1024 ? toggleSidebar : undefined}
          />
          <SidebarItem
            to="/settings"
            icon={<AiOutlineSetting className="w-6 h-6" />}
            label="Settings"
            onClick={windowWidth < 1024 ? toggleSidebar : undefined}
          />
        </ul>

        {/* Logout Button */}
        <div className="mt-10 w-full px-4 dark:mt-10">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full px-4 py-3 
              rounded-lg bg-[#1C2B49] dark:bg-[#597695] text-white font-semibold
              hover:bg-[#354d79]
              shadow-md hover:shadow-lg transition-all duration-200"
          >
            <span className="text-2xl">
              <IoMdLogOut />
            </span>
            <span className=" lg:inline">Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
};

const SidebarItem = ({ to, icon, label, onClick, end }) => {
  return (
    <li>
      <NavLink to={to} onClick={onClick} end={end}>
        {({ isActive }) => (
          <div
            className={`flex items-center gap-3 my-2 transition ${
              isActive ? "font-semibold" : "text-gray-800 dark:text-gray-100"
            }`}
          >
            {/* Icon with background */}
            <span
              className={`p-3 px-8 rounded-r-full ${
                isActive
                  ? "bg-[#1C2B49] text-white"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {icon}
            </span>

            {/* Label */}
            <span
              className={`${
                isActive
                  ? "text-gray-900 dark:text-gray-100"
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              {label}
            </span>
          </div>
        )}
      </NavLink>
    </li>
  );
};

export default Navbar;

