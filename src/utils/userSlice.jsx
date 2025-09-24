import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "user",
  initialState: {
    showUserInfo: false,
    isOpen: false,
  },
  reducers: {
    toogleUserInfo: (state) => {
      state.showUserInfo = !state.showUserInfo;
    },
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    openSidebar: (state) => {
      state.isOpen = true;
    },
    
  },
});

export const { toogleUserInfo, toggleSidebar, closeSidebar, openSidebar } = gptSlice.actions;
export default gptSlice.reducer;