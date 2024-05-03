import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toastStatus: null,
  toastMessage: null,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (state, action) => {
      const { status, displayMessage } = action.payload;
      state.toastStatus = status;
      state.toastMessage = displayMessage;
    },
  },
});

export const { setToast } = toastSlice.actions;
export default toastSlice.reducer;
