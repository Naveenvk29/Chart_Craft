import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkMode(state, action) {
      state.darkMode = action.payload;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem("theme", state.darkMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", state.darkMode);
    },
    initializeTheme(state) {
      const storedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const isDark = storedTheme === "dark" || (!storedTheme && prefersDark);
      state.darkMode = isDark;
      document.documentElement.classList.toggle("dark", isDark);
    },
  },
});

export const { setDarkMode, toggleDarkMode, initializeTheme } =
  themeSlice.actions;
export default themeSlice.reducer;
