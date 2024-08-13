import { Staff } from '@/lib/schemas/staff.schema';
import { Login, Register } from "@/lib/schemas/auth.schema";
import { API_URI } from "@/lib/utils/axios.config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setError } from "./toast.reducer";

// LOGIN
export const login = createAsyncThunk<Staff, Login, { rejectValue: string }>("auth/login", 
  async (formData, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API_URI.post("/login", formData);

      return fulfillWithValue(res.data);
    } catch (error: any) {
      dispatch(setError(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

// REGISTER
export const register = createAsyncThunk<void, Register, { rejectValue: string }>("auth/register", 
  async (formData, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API_URI.post("/register", formData);

      return fulfillWithValue(res.data);
    } catch (error: any) {
      dispatch(setError(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    loggedInAs: null as Staff | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    // LOGIN STATES
    .addCase(login.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(login.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(login.fulfilled, (state) => {
      state.isLoading = false;
    })

    // REGISTER STATES
    .addCase(register.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(register.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(register.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const authReducer = authSlice.reducer;
