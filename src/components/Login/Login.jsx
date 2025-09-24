import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/logo-with-tag.svg";

const Slider = [
  {
    Image: "/Manage-Property.png",
    Heading: "Manage Your Property Efficiently",
    Description:
      "Easily Track Payment, maintenance request, and Tent Communication in one place. Say goodbye to all the hassle of manual management.",
  },
  {
    Image: "/Buy-Properties.png",
    Heading: "Don't wait Buy Properties Buy Properties and wait.",
    Description:
      "We offer our customers property protection, liability coverage, and insurance for a better life.",
  },
  {
    Image: "/Sell-Property.png",
    Heading: "Buy, rent, or sell your property easily",
    Description:
      "A great platform to buy, sell, or even rent your properties without any commissions.",
  },
];

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(null);
  const [slideDirection, setSlideDirection] = useState("next");

  const navigate = useNavigate();

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevSlide(currentSlide);
      setSlideDirection("next");
      setCurrentSlide((prev) => (prev + 1) % Slider.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://realstate-2.onrender.com/api/v1/user/login",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
        toast.success("Boom! You're logged in and ready to roll.");
      } else {
        setError(data?.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes topToBottom {0%,100%{transform:translateY(-50px);}50%{transform:translateY(50px);}}
            @keyframes bottomToTop {0%,100%{transform:translateY(50px);}50%{transform:translateY(-50px);}}
            @keyframes leftToRight {0%,100%{transform:translateX(-50px);}50%{transform:translateX(50px);} }
            @keyframes rightToLeft {0%,100%{transform:translateX(50px);}50%{transform:translateX(-50px);}}
            @keyframes leftToTop {0%{transform:translate(-50px,50px);}50%{transform:translate(0,-50px);}100%{transform:translate(-50px,50px);}}
            .animate-top-bottom{animation:topToBottom 4s ease-in-out infinite;}
            .animate-bottom-top{animation:bottomToTop 3s ease-in-out infinite;}
            .animate-left-right{animation:leftToRight 5s ease-in-out infinite;}
            .animate-right-left{animation:rightToLeft 3.5s ease-in-out infinite;}
            .animate-left-top{animation:leftToTop 4.5s ease-in-out infinite;}
          `,
        }}
      />

      {/* Left Section - Slider */}
      <div className="hidden lg:flex relative w-1/2 p-20 bg-[#283655] overflow-hidden items-center justify-center">
        <div className="relative w-full h-full flex flex-col items-center justify-center text-white">
          <div className="relative w-full h-full flex flex-col items-center justify-center px-10 flex-grow overflow-hidden">
            {prevSlide !== null && (
              <div
                key={`prev-${prevSlide}`}
                className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-transform duration-700 ease-in-out z-20"
                style={{
                  transform: "translateX(-100%)", // slide out to left
                }}
              >
                <img
                  src={Slider[prevSlide].Image}
                  alt={Slider[prevSlide].Heading}
                  className="w-[320px] h-[280px] object-contain"
                />
                <h2 className="mt-6 text-[28px] leading-tight font-extrabold text-center">
                  {Slider[prevSlide].Heading}
                </h2>
                <p className="mt-3 text-center text-[15px] leading-relaxed font-medium px-6 max-w-[420px]">
                  {Slider[prevSlide].Description}
                </p>
              </div>
            )}

            <div
              key={`current-${currentSlide}`}
              className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-transform duration-700 ease-in-out z-30"
              style={{
                transform: "translateX(0%)", // current slide stays
              }}
            >
              <img
                src={Slider[currentSlide].Image}
                alt={Slider[currentSlide].Heading}
                className="w-[320px] h-[280px] object-contain"
              />
              <h2 className="mt-6 text-[28px] leading-tight font-extrabold text-center">
                {Slider[currentSlide].Heading}
              </h2>
              <p className="mt-3 text-center text-[15px] leading-relaxed font-medium px-6 max-w-[420px]">
                {Slider[currentSlide].Description}
              </p>
            </div>
          </div>

          {/* Dots */}
          <div className=" flex space-x-2">
            {Slider.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (index !== currentSlide) {
                    setPrevSlide(currentSlide);
                    setSlideDirection(index > currentSlide ? "next" : "prev");
                    setCurrentSlide(index);
                  }
                }}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-white"
                    : "w-3 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex flex-1 relative justify-center overflow-hidden items-center p-8">
        {/* Animated Gradient Bubbles */}
        <div
          className="absolute top-10 right-16 w-24 h-24 rounded-full opacity-50 animate-top-bottom bg-gradient-to-b from-[#daecff] to-[#eaeaea]"
          style={{ boxShadow: "-1px -11px 37.6px 0px #00000040 inset" }}
        ></div>

        <div
          className="absolute bottom-20 left-10 w-32 h-32 rounded-full opacity-30 animate-bottom-top bg-gradient-to-b from-[#daecff] to-[#eaeaea]"
          style={{ boxShadow: "-1px -11px 37.6px 0px #00000040 inset" }}
        ></div>

        <div
          className="absolute top-1/3 left-8 w-16 h-16 rounded-full opacity-40 animate-left-right bg-gradient-to-b from-[#daecff] to-[#eaeaea]"
          style={{ boxShadow: "-1px -11px 37.6px 0px #00000040 inset" }}
        ></div>

        <div
          className="absolute bottom-32 right-1/4 w-20 h-20 rounded-full opacity-60 animate-right-left bg-gradient-to-b from-[#daecff] to-[#eaeaea]"
          style={{ boxShadow: "-1px -11px 37.6px 0px #00000040 inset" }}
        ></div>

        <div
          className="absolute top-1/4 right-1/3 w-18 h-18 rounded-full opacity-45 animate-left-top bg-gradient-to-b from-[#daecff] to-[#eaeaea]"
          style={{ boxShadow: "-1px -11px 37.6px 0px #00000040 inset" }}
        ></div>

        <div className="w-full bg-transparent max-w-md dark:bg-gray-800 rounded-2xl relative z-10">
          {/* Company Logo */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-sm flex items-center justify-center">
              <img
                src={logo}
                alt="Company Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Login!
          </h1>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email / Mobile number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-gray-700 dark:text-white"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-gray-700 dark:text-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#283655] hover:bg-slate-800 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {error && (
              <div className="text-red-600 text-center font-semibold bg-red-50 py-2 px-4 rounded-lg">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
