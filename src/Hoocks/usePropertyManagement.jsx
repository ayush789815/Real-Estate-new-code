import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addPropertyInformation } from '../utils/PropertyManagementSlice';

const usePropertyManagement = () => {
    const dispatch = useDispatch();

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const response = await fetch('https://realstate-2.onrender.com/api/v1/project?page=1&limit=100000', {
      method: 'GET',
    });
      const json = await response.json();
      dispatch(addPropertyInformation(json.data));
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };
 
}

export default usePropertyManagement