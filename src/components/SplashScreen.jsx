import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/src/assets/logo-with-tag.svg';
const messages = [
  {
    title: 'Getting Ready',
    subtitle: 'Gathering your workspace',
    color: 'bg-blue-600',
  },
  {
    title: 'Final Touches',
    subtitle: 'Just a few more seconds...',
    color: 'bg-pink-600',
  },
  {
    title: 'Almost There',
    subtitle: 'Final touches in progress',
    color: 'bg-purple-600',
  },
];

const SplashScreen = () => {
  const [step, setStep] = useState(0);
  const [animate, setAnimate] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setStep((prev) => {
          if (prev < messages.length - 1) {
            setAnimate(true);
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => navigate('/login'), 1000);
            return prev;
          }
        });
      }, 200); // short delay for exit animation (optional)
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const { title, subtitle, color } = messages[step];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 transition-all duration-500">
      <div
        className={`bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full relative ${
          animate ? 'fade-scale' : ''
        }`}
      >
        <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl ${color}`}></div>
        <img src={logo} alt="Rental Surat" className="mx-auto w-20 mb-4" />
        <h2 className="text-xl font-semibold mb-1">Welcome to Real Estate</h2>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-500">{subtitle}</p>
        <div className="flex justify-center mt-4 space-x-2">
          {messages.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                i === step ? color : 'bg-gray-300'
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;