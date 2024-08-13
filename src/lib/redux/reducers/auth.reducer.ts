import { Staff } from '@/lib/schemas/staff.schema';
import { Login, Register } from "@/lib/schemas/auth.schema";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setError } from "./toast.reducer";
import { API_URI } from './root.reducer';

// LOGIN
export const login = createAsyncThunk<Staff, Login, { rejectValue: string }>("auth/login", 
  async (formData, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URI}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return fulfillWithValue(data);
    } catch (error: any) {
      const errorMessage = error.message || "Unknown error";
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// REGISTER
export const register = createAsyncThunk<void, Register, { rejectValue: string }>("auth/register", 
  async (formData, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URI}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return fulfillWithValue(data);
    } catch (error: any) {
      const errorMessage = error.message || "Unknown error";
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
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
    .addCase(login.fulfilled, (state, action: PayloadAction<Staff>) => {
      state.isLoading = false;
      state.loggedInAs = action.payload;
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
