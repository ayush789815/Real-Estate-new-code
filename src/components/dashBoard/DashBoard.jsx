import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const DashBoard = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Old bar + line chart data
  const Bardata = [
    { name: "Jan", uv: 44, pv: 400 },
    { name: "Feb", uv: 30, pv: 300 },
    { name: "Mar", uv: 50, pv: 500 },
    { name: "Apr", uv: 45, pv: 450 },
  ];

  const propertyData = [
    { name: "Jun", value: 40 },
    { name: "Jul", value: 55 },
    { name: "Aug", value: 28 },
    { name: "Sep", value: 70 },
    { name: "Oct", value: 35 },
    { name: "Nov", value: 52 },
    { name: "Dec", value: 60 },
  ];

  // Tooltip for line chart
  const LineTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="px-3 py-2 rounded-full text-white shadow-lg"
          style={{
            backgroundColor: "rgba(30, 41, 59, 0.95)",
            border: "1px solid rgba(148, 163, 184, 0.3)",
          }}
        >
          <div className="text-xs leading-4 text-slate-200 text-center">
            {label?.toLowerCase()}
          </div>
          <div className="text-sm font-semibold text-center">{`UV : ${payload[0].value}`}</div>
        </div>
      );
    }
    return null;
  };

  // Tooltip for bar chart
  const PropertyTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="bg-slate-700 text-white px-3 py-2 rounded-lg shadow-lg border border-slate-600"
          style={{
            backgroundColor: "rgba(51, 65, 85, 0.95)",
            backdropFilter: "blur(4px)",
          }}
        >
          <p className="text-xs font-medium text-slate-300 mb-1">{`${label}`}</p>
          <p className="text-sm font-semibold text-white">{`UV: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Ring dot
  const RingDot = ({ cx, cy }) => {
    if (cx == null || cy == null) return null;
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="#ffffff"
          stroke="#0f172a"
          strokeWidth={2}
        />
      </g>
    );
  };

  // Active ring dot
  const ActiveRingDot = ({ cx, cy }) => {
    if (cx == null || cy == null) return null;
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={10}
          fill="none"
          stroke="#0f172a"
          strokeWidth={3}
        />
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="#ffffff"
          stroke="#0f172a"
          strokeWidth={2}
        />
      </g>
    );
  };

  return (
    <div className="w-full p-8 pt-10 h-full bg-[#F1FBFF] dark:bg-[#001118] min-h-screen">
      <h1 className="font-bold text-3xl mb-6 text-[#283655] dark:text-[#597695]">
        Dashboard
      </h1>
      <hr className="my-4 border-t border-gray-300 dark:border-gray-700" />

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Users */}
        <div
          className="relative bg-[#ffffff] dark:bg-[#182832] rounded-2xl p-5 py-2 flex items-center justify-between"
          style={{
            boxShadow: "-4px 0 0 0 #656CA9, 0 1px 2px 0 rgba(0,0,0,0.05)",
          }}
        >
          <div className="flex items-center justify-between w-full space-x-3">
            <div className="p-2 rounded-full ">
              <img
                src="/Total-Users.png"
                alt="Total Users"
                className="w-20 h-20"
              />
            </div>
            <div>
              <p className="text-lg dark:text-[#ffffff] font-medium text-gray-600">
                Total Users
              </p>
              <p className="text-2xl dark:text-[#BBBDD1] font-bold text-gray-900">
                93
              </p>
              <span className="text-sm font-semibold text-green-600">
                +12.5%
              </span>
            </div>
          </div>
        </div>

        {/* Active Properties */}
        <div
          className="relative bg-[#ffffff] dark:bg-[#182832] rounded-2xl p-5 flex items-center justify-between"
          style={{
            boxShadow: "-4px 0 0 0 #56CAF1, 0 1px 2px 0 rgba(0,0,0,0.05)",
          }}
        >
          <div className="flex items-center justify-between w-full space-x-3">
            <div className="p-3 rounded-full ">
              <img
                src="/Active-Properties.png"
                alt="Active Properties"
                className="w-20 h-20"
              />
            </div>
            <div>
              <p className="text-lg dark:text-[#ffffff] font-medium text-gray-600">
                Active Properties
              </p>
              <p className="text-2xl dark:text-[#DCFCFF] font-bold text-gray-900">
                154
              </p>
              <span className="text-sm font-semibold text-red-600">-3.2%</span>
            </div>
          </div>
        </div>

        {/* Active Locations */}
        <div
          className="relative bg-[#ffffff] dark:bg-[#182832] rounded-2xl p-5 flex items-center justify-between"
          style={{
            boxShadow: "-4px 0 0 0 #A97365, 0 1px 2px 0 rgba(0,0,0,0.05)",
          }}
        >
          <div className="flex items-center justify-between w-full space-x-3">
            <div className="p-3 rounded-full">
              <img
                src="/Active-Location.png"
                alt="Active Locations"
                className="w-20 h-20"
              />
            </div>
            <div>
              <p className="text-lg font-medium dark:text-[#ffffff] text-gray-600">
                Active Locations
              </p>
              <p className="text-2xl dark:text-[#FFA988] font-bold text-gray-900">
                12
              </p>
              <span className="text-sm font-semibold text-green-600">
                +8.7%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col xl:flex-row gap-6 mt-10 w-full">
        {/* Registered Property – Bar */}
        <div
          className="flex-1 rounded-2xl shadow-sm border border-gray-100 p-6 dark:border-gray-700 
          bg-gradient-to-b from-[#1f3864] to-[#0a1a28]"
        >
          <h3 className="text-xl font-semibold mb-6 text-white">
            Registered Property
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={propertyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <defs>
                  <pattern
                    id="diagonalStripes"
                    patternUnits="userSpaceOnUse"
                    width="8"
                    height="8"
                    patternTransform="rotate(45)"
                  >
                    <rect width="8" height="8" fill="rgba(255,255,255,0.08)" />
                    <rect width="4" height="8" fill="rgba(255,255,255,0.28)" />
                  </pattern>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.12)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 14, fill: "#e5e7eb" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#e5e7eb" }}
                  domain={[0, 75]}
                  ticks={[0, 15, 30, 45, 60, 75]}
                />
                <Tooltip content={<PropertyTooltip />} cursor={false} />
                <Bar dataKey="value" radius={[25, 25, 25, 25]} maxBarSize={45}>
                  {propertyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        activeIndex === index
                          ? "#ffffff"
                          : "url(#diagonalStripes)"
                      }
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Property – Line */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
            Property
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={Bardata}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid
                  horizontal={false}
                  vertical
                  stroke="#ede9fe"
                  strokeOpacity={0.8}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 14, fill: "#6b7280" }}
                  tickMargin={12}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  domain={[0, 75]}
                  ticks={[0, 15, 30, 45, 60, 75]}
                />
                <Tooltip content={<LineTooltip />} cursor={false} />
                <Line
                  type="monotone"
                  dataKey="uv"
                  stroke="#c4b5fd"
                  strokeWidth={3}
                  dot={<RingDot />}
                  activeDot={<ActiveRingDot />}
                  isAnimationActive
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
