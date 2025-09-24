import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '/src/assets/logo-with-tag.svg';
import { toast } from 'react-toastify';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const response = await fetch('https://realstate-2.onrender.com/api/v1/user/login', {
      method: 'POST',
       credentials: 'include', // Only if your server sets cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
  
    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      navigate('/');
      toast.success("Boom! You’re logged in and ready to roll.")
    } else {
      setError(data?.message || 'Invalid email or password');
    }
  } catch (err) {
    console.error('Login error:', err);
    setError('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex h-screen ">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex justify-center flex-col px-8 lg:px-20 bg-gray-200">
        <img src={logo} alt="Rental Surat" className="w-32 " />
        <h2 className="text-lg text-gray-500">Welcome Back !!!</h2>
        <h1 className="text-3xl font-bold mb-8">Login</h1>

        <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <div className="flex items-center border border-green-700 rounded-md overflow-hidden bg-[#cde6f6]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
                className="w-full p-3 outline-none bg-transparent"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <div className="flex items-center border border-green-700 rounded-md overflow-hidden bg-[#cde6f6]">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 outline-none bg-transparent"
                placeholder="********"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-green-800 hover:bg-green-900 text-white py-2.5 rounded-full w-full font-semibold flex items-center justify-center gap-2"
          >
            {loading ? 'Logging in...' : 'Login'} <span className="ml-2">➜</span>
          </button>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-center font-semibold mt-2">
              {error}
            </div>
          )}
        </form>
      </div>

      {/* Right Section - Image */}
      <div className="hidden lg:flex items-center justify-center w-1/2 bg-green-900">
        <img
          src="https://rentalsurat-6789f.web.app/static/media/rental.30c613bc1aad8cc89051.png"
          alt="Login Illustration"
          className="h-[80%] w-[80%] object-contain relative right-[20px]"
        />
      </div>
    </div>
  );
};

export default Login;