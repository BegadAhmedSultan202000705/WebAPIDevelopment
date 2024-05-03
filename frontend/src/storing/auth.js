import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  const storedUserData = localStorage.getItem("userData");
  const storedAccessToken = localStorage.getItem("accessToken");

  return {
    userData: storedUserData ? JSON.parse(storedUserData) : null,
    accessToken: storedAccessToken ? JSON.parse(storedAccessToken) : null,
  };
};

const initialState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { userData, accessToken } = action.payload;
      state.userData = userData;
      state.accessToken = accessToken;
    },

    setLogout: (state) => {
      state.userData = null;
      state.accessToken = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
