import React, { useState } from 'react';

const ToggleButton = ({ initialState = false, onToggle }) => {
  const [isChecked, setIsChecked] = useState(initialState);

  const handleChange = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <label className="relative inline-block w-14 h-8">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        onChange={handleChange}
      />
      <div className="w-full h-full bg-red-400 rounded-full peer-checked:bg-green-400 transition-colors duration-300"></div>
      <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-6"></div>
    </label>
  );
};

export default ToggleButton;