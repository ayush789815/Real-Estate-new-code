import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useUserManagement from "../../Hoocks/useUserManagemnt";
import { toast } from "react-toastify";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";
// Demo notification history
const demoNotifications = [
  {
    id: 1,
    title: "Welcome!",
    message: "Welcome to the platform.",
    date: "2025-09-18",
    recipients: ["John Doe", "Jane Smith"],
  },
  {
    id: 2,
    title: "System Update",
    message: "System will be down for maintenance tonight.",
    date: "2025-09-17",
    recipients: ["All Users"],
  },
];

const Notification = () => {
  useUserManagement();
  const rawUserProfiles = useSelector((state) => state.manageUser.userProfile);
  const userProfiles = useMemo(() => rawUserProfiles || [], [rawUserProfiles]);

  const [activeTab, setActiveTab] = useState("create");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const searchWrapRef = useRef(null);
  const [notifications, setNotifications] = useState(demoNotifications);
  const [activeNotification, setActiveNotification] = useState(null);

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return userProfiles;
    return userProfiles.filter((user) =>
      (user.username || "").toLowerCase().includes(q)
    );
  }, [userProfiles, search]);

  useEffect(() => {
    const onClickAway = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", onClickAway);
    return () => document.removeEventListener("mousedown", onClickAway);
  }, []);

  const toggleUser = (_id) => {
    setSelectedUsers((prev) =>
      prev.includes(_id) ? prev.filter((id) => id !== _id) : [...prev, _id]
    );
  };

  const selectAllFiltered = () => {
    const ids = filteredUsers.map((u) => u._id);
    setSelectedUsers((prev) => Array.from(new Set([...prev, ...ids])));
  };

  const clearSelection = () => setSelectedUsers([]);

  const isValid =
    title.trim() && description.trim() && selectedUsers.length > 0;

  const handleSend = async () => {
    if (!isValid) {
      toast.warning("Please fill in all fields and select recipients.");
      return;
    }
    setIsSending(true);
    try {
      const response = await fetch(
        "https://realstate-2.onrender.com/api/v1/notification",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            message: description.trim(),
            userIds: selectedUsers,
          }),
        }
      );

      if (response.ok) {
        toast.success("Ding! The user has been notified");
        setTitle("");
        setDescription("");
        setSelectedUsers([]);
        setSearch("");
        setShowDropdown(false);
      } else {
        toast.warning("Retry needed — notification failed to send.");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error(
        "Error sending alert. Server might be down — please investigate."
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    if (activeNotification === id) setActiveNotification(null);
    toast.info("Notification deleted");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <main className="flex-1 p-4 md:p-8 bg-[#F3FAFF] dark:bg-[#001118] dark:text-gray-200 overflow-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-[#597695]">
          Notification Centre
        </h1>

        <hr className="my-8 border-t border-gray-300 dark:border-gray-700" />

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setActiveTab("create")}
            className={`px-4 md:px-5 py-2 md:py-3 rounded-xl font-semibold transition-all shadow-sm ${
              activeTab === "create"
                ? "bg-[#1F2A44] dark:bg-[#597695] text-white"
                : "bg-slate-100 dark:bg-[#001118] text-slate-600 dark:text-gray-200"
            }`}
          >
            Create Notification
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 md:px-5 py-2 md:py-3 rounded-xl font-semibold transition-all shadow-sm ${
              activeTab === "history"
                ? "bg-[#1F2A44] dark:bg-[#597695] text-white"
                : "bg-slate-100 dark:bg-[#001118] text-slate-600 dark:text-gray-200"
            }`}
          >
            Notification History
          </button>
        </div>

        {activeTab === "create" ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            <h2 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-gray-200 mb-4">
              Create Notification
            </h2>

            {/* Search + Select */}
            <div className="flex flex-col md:flex-row gap-3 md:items-center mb-4">
              <div className="relative flex-1" ref={searchWrapRef}>
                <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <BsSearch />
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="Search user..."
                  className="w-full h-12 md:h-14 pl-10 pr-4 rounded-full bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 shadow-sm outline-none"
                />
                {showDropdown && (
                  <div className="absolute z-20 mt-2 w-full max-h-64 overflow-auto bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl shadow-lg">
                    {filteredUsers.length === 0 ? (
                      <div className="px-4 py-6 text-center text-slate-500">
                        No users found
                      </div>
                    ) : (
                      filteredUsers.map((user) => {
                        const checked = selectedUsers.includes(user._id);
                        const status =
                          user.status === true
                            ? "Active"
                            : user.status === false
                            ? "Inactive"
                            : "Unknown";
                        return (
                          <label
                            key={user._id}
                            className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800 cursor-pointer"
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-slate-800 dark:text-gray-200 truncate">
                                {user.username || "N/A"}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-gray-400">
                                Status: {status}
                              </p>
                            </div>
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleUser(user._id)}
                              className="h-4 w-4"
                            />
                          </label>
                        );
                      })
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row gap-2 md:gap-2">
                <button
                  onClick={selectAllFiltered}
                  className="px-5 h-12 rounded-xl bg-[#1F2A44] text-white font-semibold shadow-sm"
                >
                  Select all users
                </button>
                {selectedUsers.length > 0 && (
                  <button
                    onClick={clearSelection}
                    className="px-5 h-12 rounded-xl bg-[#1F2A44] text-white font-semibold shadow-sm"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="mt-2 text-sm text-slate-500 dark:text-gray-300">
              Selected: {selectedUsers.length} user
              {selectedUsers.length === 1 ? "" : "s"} (of {filteredUsers.length}{" "}
              shown)
            </div>

            {/* Show selected usernames */}
            {/* Show selected usernames with remove option */}
            {selectedUsers.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedUsers.map((id) => {
                  const user = userProfiles.find((u) => u._id === id);
                  return (
                    <span
                      key={id}
                      className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F2A44] text-white text-sm font-medium shadow-sm dark:bg-[#597695]"
                    >
                      {user?.username || "Unknown"}
                      <button
                        onClick={() => toggleUser(id)}
                        className="ml-1 text-xs font-bold text-white hover:text-red-400"
                      >
                        ✕
                      </button>
                    </span>
                  );
                })}
              </div>
            )}

            <div className="mt-6">
              <input
                type="text"
                placeholder="Title Notification..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-12 md:h-14 px-4 rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 shadow-sm outline-none"
              />
            </div>

            <div className="mt-4">
              <textarea
                placeholder="Description Notification"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-[140px] md:min-h-[160px] p-4 rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 shadow-sm resize-y outline-none"
              />
            </div>

            <div className="mt-6 md:mt-8 flex justify-center">
              <button
                onClick={handleSend}
                disabled={!isValid || isSending}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-sm transition-colors ${
                  !isValid || isSending
                    ? "bg-[#597695] text-white cursor-not-allowed"
                    : "bg-[#1F2A44] text-white hover:bg-[#1B243A]"
                }`}
              >
                <IoSendSharp /> {isSending ? "Sending..." : "Send Notification"}
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            {/* Notification History */}
            <div className="mt-6 space-y-4">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="group transition-all duration-300 ease-in-out 
                 bg-white dark:bg-[#182832] rounded-[22px] 
                 shadow-[0px_1px_0.6px_0px_rgba(0,0,0,0.25)] 
                 p-4 md:p-6 flex gap-4 items-start 
                 w-full md:max-w-[1218px] 
                 cursor-pointer 
                 md:h-[112px] 
                 hover:md:h-[190px] 
                 hover:md:bg-[#283655] 
                 dark:hover:md:bg-[#597695]
                 overflow-hidden
                 hover:md:shadow-[0px_2px_2px_0px_#00000040]"
                >
                  {/* Icon */}
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full 
                      group-hover:md:bg-[#ffffff] 
                      dark:group-hover:md:bg-[#182832] 
                      text-[#1F2A44] group-hover:md:text-[#283655]"
                  >
                    <MdOutlineNotificationsActive className="text-[#597695]" size={24} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Always visible */}
                    <h3 className="font-semibold text-[#1F2A44] dark:text-[#e1e1e1] group-hover:md:text-white">
                      {notif.title}
                    </h3>
                    <p className="text-gray-700 dark:text-[#e1e1e1] group-hover:md:text-gray-200">
                      {notif.message}
                    </p>

                    {/* Hidden until hover */}
                    <div
                      className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out 
                     group-hover:max-h-40 group-hover:opacity-100"
                    >
                      <p className="text-sm text-[#E1E1E1] mt-1 group-hover:md:text-gray-200">
                        Date: {notif.date}
                      </p>
                      <p className="text-sm text-gray-400 truncate dark:text-[#cfd6e0]">
                        Recipients: {notif.recipients.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Notification;
