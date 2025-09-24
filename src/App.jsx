import './App.css';
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import DashBoard from './components/dashBoard/DashBoard';
import UserManagement from './components/userManagement/UserManagement';
import PropertyManagementPage from './components/propertyManagement/PropertyManagementPage';
import InactiveRequext from './components/listing&InactiveRequest/InactiveRequext';
import SlideManager from './components/sliderManagemt/SlideManager';
import Notification from './components/Notification/Notification';
import Settings from './components/Settings/Settings';
import Login from './components/Login/Login';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import Error404 from './components/Error/Error404';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  const location = useLocation();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [splashShown, setSplashShown] = useState(() => {
    return sessionStorage.getItem('splashShown') === 'true' || localStorage.getItem('token');
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, [location]);

  useEffect(() => {
    // Only show splash if not logged in AND not already shown
    if (!splashShown && !localStorage.getItem('token')) {
      const timer = setTimeout(() => {
        sessionStorage.setItem('splashShown', 'true');
        setSplashShown(true);
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [splashShown]);

  const validRoutes = [
    '/',
    '/login',
    '/usermanagement',
    '/propertymanagement',
    '/inactive-requext',
    '/slide-manager',
    '/notification',
    '/settings',
    '/dashboard'
  ];

  const isValidRoute = validRoutes.includes(location.pathname);
  const shouldShowNavbar =
    isAuthenticated &&
    location.pathname !== '/login' &&
    isValidRoute;

  // Show splash screen once per session only before login
  if (!splashShown && !localStorage.getItem('token')) return <SplashScreen />;

  return (
    <div className="flex">
      {shouldShowNavbar && <Navbar />}
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="app flex-1">
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usermanagement" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
          <Route path="/propertymanagement" element={<PrivateRoute><PropertyManagementPage /></PrivateRoute>} />
          <Route path="/inactive-requext" element={<PrivateRoute><InactiveRequext /></PrivateRoute>} />
          <Route path="/slide-manager" element={<PrivateRoute><SlideManager /></PrivateRoute>} />
          <Route path="/notification" element={<PrivateRoute><Notification /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><DashBoard /></PrivateRoute>} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;