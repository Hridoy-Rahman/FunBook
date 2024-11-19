import { createSlice } from "@reduxjs/toolkit";
import { user } from "../assets/data";

// Get the user from localStorage
const userFromStorage = window?.localStorage.getItem("user");

const initialState = {
    user: userFromStorage ? JSON.parse(userFromStorage) : user, 
    edit: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout(state) {
            state.user = null;
            localStorage.removeItem("user");
        },
        updateProfile(state, action) {
            state.edit = action.payload;
        },
    },
});

export default userSlice.reducer;

export function userLogin(user) {
    return (dispatch) => {
        dispatch(userSlice.actions.login(user));
    };
}

export function Logout() {
    return (dispatch, getState) => {
      dispatch(userSlice.actions.logout());
    };
  }

export function updateProfile(value) {
    return (dispatch) => {
        dispatch(userSlice.actions.updateProfile(value));
    };
}
