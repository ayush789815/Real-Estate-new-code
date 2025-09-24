import React, { useState } from "react";
import { BsImage } from "react-icons/bs";
import slider_Dummy from "../../assets/Slide_Dummy.png";

// Placeholder component for empty image
const PlaceholderImage = () => (
  <div className="w-full h-[380px] bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-700 border-4 border-blue-200 dark:border-gray-600 rounded-xl shadow-lg flex items-center justify-center">
    <div className="text-center text-gray-600 dark:text-gray-300">
      <div className="text-6xl mb-4">🖼️</div>
      <p className="text-lg font-medium">No Image Selected</p>
      <p className="text-sm">Upload an image to preview</p>
    </div>
  </div>
);

const SliderImageManager = () => {
  const [activeSlider, setActiveSlider] = useState("home");
  const [activeImage, setActiveImage] = useState(1);

  const [uploadedImages, setUploadedImages] = useState({
    home: {},
    location: {},
  });

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setUploadedImages((prev) => ({
      ...prev,
      [activeSlider]: {
        ...prev[activeSlider],
        [activeImage]: imageUrl,
      },
    }));
  };

  const getTabs = () => (activeSlider === "home" ? [1, 2, 3, 4] : [1, 2, 3]);

  const currentImage = uploadedImages[activeSlider][activeImage];

  return (
    <div className="min-h-screen pt-6 p-8 bg-[#F1FBFF] dark:bg-[#001118] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-xl sm:text-3xl font-bold text-[#283655] dark:text-gray-200">
          Slider Image Manager
        </h1>
        <h4 className="mt-2 text-xs sm:text-[12px] tracking-normal text-gray-600 dark:text-gray-400">
          Upload and manage your slider images
        </h4>
      </div>
      <hr className="my-4 border-t border-gray-300 dark:border-gray-700" />

      {/* Slider Type Tabs */}
      <div className="flex mb-4 justify-center sm:justify-start">
        <div className="rounded-xl p-2 flex gap-4">
          <button
            onClick={() => {
              setActiveSlider("home");
              setActiveImage(1);
            }}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              activeSlider === "home"
                ? "bg-[#283655] text-[#FFFFFF] shadow-md"
                : "shadow-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            Home Slider
          </button>
          <button
            onClick={() => {
              setActiveSlider("location");
              setActiveImage(1);
            }}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              activeSlider === "location"
                ? "bg-[#283655] text-[#FFFFFF] shadow-md"
                : "shadow-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            Location Slider
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-1 gap-4 items-start bg-[#ffffff] dark:bg-gray-900 rounded-2xl p-10">
        {/* Image Tabs */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {getTabs().map((num) => (
              <button
                key={num}
                onClick={() => setActiveImage(num)}
                className={`relative w-full h-16 rounded-[15px] border-2 transition-all duration-200 overflow-hidden group ${
                  activeImage === num
                    ? "border-none bg-[#283655] text-white"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div
                  className={`absolute flex items-center justify-center gap-2 text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md font-semibold ${
                    activeImage === num
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <BsImage />
                  Image {num}
                </div>
              </button>
            ))}
          </div>

          {/* Upload Button */}
          <div className="pt-4 flex justify-center">
            <label className="cursor-pointer w-full sm:w-1/2 flex justify-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
              <div className="w-full px-6 py-3 bg-[#283655] text-white text-center rounded-full shadow-md hover:opacity-90 transition-all">
                Upload image for Image {activeImage}
              </div>
            </label>
          </div>
        </div>

        {/* Main Image Preview */}
        <div className="mt-6 sm:mt-0">
          {currentImage ? (
            <img
              src={currentImage}
              alt={`Image ${activeImage}`}
              className="w-full h-[380px] object-cover rounded-xl shadow-lg"
            />
          ) : (
            <PlaceholderImage />
          )}
        </div>
      </div>
    </div>
  );
};

export default SliderImageManager;
