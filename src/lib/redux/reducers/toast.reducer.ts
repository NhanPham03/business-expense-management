import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    error: "",
    message: "",
  },
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = "";
    },
    clearAllMessages: (state) => {
      state.error = "";
      state.message = "";
    }
  },
});

export const { setError, clearError, setMessage, clearMessage, clearAllMessages } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
