import { createSlice } from "@reduxjs/toolkit";

const themeFromStorage = window?.localStorage.getItem("theme");

const initialState = {
  theme: themeFromStorage ? themeFromStorage : "dark", // Default to "dark" if not set
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload); // Store the selected theme in localStorage
    },
  },
});

export default themeSlice.reducer;

export function SetTheme(value) {
  return (dispatch) => {
    dispatch(themeSlice.actions.setTheme(value)); // Update Redux and localStorage
  };
}
