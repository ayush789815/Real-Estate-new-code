import React from 'react';
import { useNavigate } from 'react-router-dom';
import error_img from '../../assets/ErrorImg.svg'

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <img
          src={error_img}
          alt="404 Not Found"
          className="w-64 mx-auto mb-6"
        />
        <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find the page you were looking for.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Error404;