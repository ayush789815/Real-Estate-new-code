import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtoggleInformation } from "../../utils/PropertyManagementSlice";
import { FiPhone, FiMail, FiUser } from "react-icons/fi";

// Tab button for UI
const TabButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`relative px-3 sm:px-4 py-2 text-sm sm:text-base font-medium transition-colors
    ${
      active
        ? "text-slate-900 dark:text-slate-100"
        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
    }`}
  >
    {children}
    <span
      className={`absolute left-0 -bottom-[1px] h-[2px] rounded-full transition-all
      ${
        active ? "w-full bg-slate-800 dark:bg-slate-200" : "w-0 bg-transparent"
      }`}
    />
  </button>
);

// Chip field for UI
const ChipField = ({ icon, label, value, className = "" }) => (
  <div className={`relative ${className}`}>
    <div className="absolute -top-3 left-4 bg-white dark:bg-gray-800 text-slate-500 dark:text-slate-400 text-xs sm:text-[13px] font-semibold rounded-full shadow-sm px-2.5 py-1 flex items-center gap-1.5">
      {icon}
      <span>{label}</span>
    </div>
    <div className="w-full rounded-2xl bg-sky-50 dark:bg-gray-700 text-slate-700 dark:text-slate-200 px-4 py-3 sm:py-3.5 h-12 sm:h-[52px] flex items-center font-medium">
      {value ?? "N/A"}
    </div>
  </div>
);

// Readonly toggle component
const ReadonlyToggle = ({ checked = false }) => (
  <div
    role="switch"
    aria-checked={checked}
    aria-readonly="true"
    className={`relative inline-flex items-center h-9 w-20 rounded-full px-1 shadow-sm select-none 
      ${checked ? "justify-end" : "justify-start"} 
      bg-slate-100 dark:bg-gray-700`}
  >
    <span
      className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold text-white shadow
        ${
          checked
            ? "bg-slate-900 dark:bg-slate-200 dark:text-slate-900"
            : "bg-slate-400"
        }`}
    >
      {checked ? "on" : "off"}
    </span>
  </div>
);

const PropertyInfo = () => {
  const propertySingleInformation = useSelector(
    (store) => store.PropertyInfo.propertySingleInformation
  );
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Details");

  const handleClosePrpertyDetail = () => {
    dispatch(addtoggleInformation());
  };

  // Prepare data safely
  const data = useMemo(() => {
    const info = propertySingleInformation || {};
    return {
      projectname: info.projectname ?? "N/A",
      city: info.city ?? "N/A",
      phone: info.phone ?? "N/A",
      email: info.email ?? "N/A",
      status: info.status ?? false,
      zipcode: info.zipcode ?? "N/A",
      builtUp: info.builtUp ?? "720 sq.ft",
      superBuiltUp: info.superBuiltUp ?? "1280 sq.ft",
      config: info.config ?? "2",
      carParking: info.carParking ?? "Yes",
      facing: info.facing ?? "West",
      floor: info.floor ?? "7",
      tenantType: info.tenantType ?? "N/A",
      availableDate: info.availableDate ?? "0000-00-00",
      price: info.price ?? "₹4200000",
      type: info.type ?? "Sale",
      contactNumber: info.contactNumber ?? "6359220606",
      active: info.status ?? false,
    };
  }, [propertySingleInformation]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-gray-900 shadow-2xl transition-colors duration-300">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-2 sm:p-7 sm:pb-3">
          <h2 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2">
            Property Details
          </h2>
          <button
            onClick={handleClosePrpertyDetail}
            className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 shadow-md hover:bg-slate-700 dark:hover:bg-slate-300 active:scale-[0.98] transition"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 sm:px-7">
          <div className="flex gap-6 border-b border-slate-200 dark:border-gray-700">
            <TabButton
              active={activeTab === "Details"}
              onClick={() => setActiveTab("Details")}
            >
              Details
            </TabButton>
            <TabButton
              active={activeTab === "Information"}
              onClick={() => setActiveTab("Information")}
            >
              Information
            </TabButton>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-7 py-6 sm:py-7">
          {activeTab === "Details" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <ChipField
                  icon={<FiUser />}
                  label="Property Name"
                  value={data.projectname}
                />
                <ChipField
                  icon={<FiPhone />}
                  label="Phone no."
                  value={data.phone}
                />
                <ChipField
                  className="sm:col-span-2"
                  icon={<FiMail />}
                  label="Email"
                  value={data.email}
                />
              </div>

              <div className="h-px bg-slate-200 dark:bg-gray-700" />

              <div className="flex items-center justify-between">
                <span className="text-slate-800 dark:text-slate-100 font-semibold">
                  Active
                </span>
                <ReadonlyToggle checked={data.active} />
              </div>
            </div>
          )}

          {activeTab === "Information" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <ChipField label="Property Name" value={data.projectname} />
              <ChipField label="Address" value={data.city} />
              <ChipField label="BuiltUp area" value={data.builtUp} />
              <ChipField label="Floor" value={data.floor} />

              <ChipField label="Price" value={data.price} />
              <ChipField label="Type" value={data.type} />

              <ChipField label="Pin Code" value={data.zipcode} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 pt-0 sm:px-7 sm:pt-0 sm:pb-7">
          <button
            className="px-4 py-2 rounded-md bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-gray-600 transition"
            onClick={handleClosePrpertyDetail}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;
