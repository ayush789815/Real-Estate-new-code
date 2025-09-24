import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUserManagement } from '../utils/ManagementSlice';

const useUserManagement = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const response = await fetch('https://realstate-2.onrender.com/api/v1/user?page=1&limit=100000');
      const json = await response.json();
      dispatch(addUserManagement(json.data)); // assuming response.data contains user array
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };
};

export default useUserManagement;