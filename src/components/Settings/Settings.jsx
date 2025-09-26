import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../utils/themeSlice";
import { Moon, Sun, UserRound, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const hasMounted = useRef(false);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [username, setUsername] = useState("Admin");
  const [email, setEmail] = useState("admin123@gmail.com");
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    // Only toast after first mount
    if (hasMounted.current) {
      if (darkMode) {
        toast.success("🌙 Dark Mode enabled");
      } else {
        toast.success("☀️ Light Mode enabled");
      }
    } else {
      hasMounted.current = true;
    }
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("✅ Profile saved");
  };

  const handleToggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  const isLight = !darkMode;

  return (
    <div className="min-h-screen bg-[#EAF4FF] dark:bg-gray-950 text-gray-900 dark:text-gray-50">
      <div className="px-6 lg:px-10 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-3xl font-bold text-[#283655] dark:text-[#597695]">
              Settings
            </h1>
          </div>
          <hr className="my-10 border-gray-200 dark:border-gray-800" />
        </div>

        {/* Card */}
        <div className="relative mx-auto max-w-5xl">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800">
            {/* "Profile" tab/pill */}
            <div className="-mt-6 ml-6">
              <span className="inline-flex items-center gap-2 rounded-2xl bg-[#22314A] text-white px-4 py-2 shadow-md">
                <UserRound size={18} />
                <span className="font-medium">Profile</span>
              </span>
            </div>

            <div className="p-6 md:p-8">
              {/* Title */}
              <div className="mb-6">
                <h3 className="text-2xl md:text-[26px] font-semibold text-[#22314A] dark:text-white">
                  Profile setting
                </h3>
                <div className="mt-3 border-t border-gray-200 dark:border-gray-800" />
              </div>

              {/* Form */}
              <form
                onSubmit={handleSave}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Admin"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin123@gmail.com"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>

                <div className="space-y-2 md:col-span-2 md:max-w-sm">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Language
                  </label>
                  <div className="relative">
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                      <option>English</option>
                      <option>Hindi</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                {/* Theme toggle */}
                <div className="md:col-span-2 flex items-center gap-6 mt-2">
                  <span className="text-base font-medium text-gray-800 dark:text-gray-200">
                    {isLight ? "Light Mode" : "Dark Mode"}
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isLight}
                    onClick={handleToggleTheme}
                    className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 ${
                      isLight ? "bg-gray-300 dark:bg-gray-700" : "bg-blue-200"
                    }`}
                  >
                    <span
                      className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow flex items-center justify-center transition-transform duration-300 ${
                        isLight ? "translate-x-0" : "translate-x-8"
                      }`}
                    >
                      {isLight ? (
                        <Sun size={16} className="text-yellow-500" />
                      ) : (
                        <Moon size={16} className="text-gray-600" />
                      )}
                    </span>
                  </button>
                </div>

                {/* Save */}
                <div className="md:col-span-2 flex justify-end pt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-xl bg-[#22314A] text-white px-6 py-2.5 shadow-md hover:shadow-lg transition"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
