import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastProps {
  title: string;
  description: string;
};

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    title: "",
    error: "",
    message: "",
  },
  reducers: {
    setError: (state, action: PayloadAction<ToastProps>) => {
      state.title = action.payload.title || "Error";
      state.error = action.payload.description;
    },
    clearError: (state) => {
      state.title = "";
      state.error = "";
    },
    setMessage: (state, action: PayloadAction<ToastProps>) => {
      state.title = action.payload.title || "Success";
      state.message = action.payload.description;
    },
    clearMessage: (state) => {
      state.title = "";
      state.message = "";
    },
    clearAllMessages: (state) => {
      state.title = "";
      state.error = "";
      state.message = "";
    }
  },
});

export const { setError, clearError, setMessage, clearMessage, clearAllMessages } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
