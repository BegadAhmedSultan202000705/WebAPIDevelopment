import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../storing/auth";
import toastSlice from "../storing/noti_bar";
import recipesSlice from "../storing/recipes";

const store = configureStore({
  reducer: {
    auth: authSlice,
    toast: toastSlice,
    recipes: recipesSlice,
  },
});

export default store;
