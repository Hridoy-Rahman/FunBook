import { combineReducers } from "@reduxjs/toolkit";
import postSlice from './postSlice';
import userSlice from './userSlice';
import themeSlice from './theme';

const rootReducer = combineReducers({
    user : userSlice,
    post : postSlice,
    theme : themeSlice,
});

export {rootReducer}