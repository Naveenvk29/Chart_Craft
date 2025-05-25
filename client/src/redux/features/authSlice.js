import { createSlice } from "@reduxjs/toolkit";
import {
  saveUserToStorage,
  getUserFromStorage,
  clearUserFromStorage,
} from "../../utils/storageUtils";

const initialState = {
  userInfo: getUserFromStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      const { rememberMe = true } = action.payload;
      saveUserToStorage(action.payload, rememberMe);
    },

    logout: (state) => {
      state.userInfo = null;
      clearUserFromStorage();
    },
    updateUserInfo: (state, action) => {
      if (state.userInfo) {
        state.userInfo.user = {
          ...state.userInfo.user,
          ...action.payload,
        };
        saveUserToStorage(state.userInfo);
      }
    },
  },
});

export const { setCredentials, logout, updateUserInfo } = authSlice.actions;
export default authSlice.reducer;
