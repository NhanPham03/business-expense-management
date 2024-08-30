import { Login, Register } from "@/lib/schemas/auth.schema";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setError, setMessage } from "./toast.reducer";
import { API_URI } from './root.reducer';
import { setCookie } from "@/lib/utils/cookie.utils";

export enum Roles {
  Claimer = "claimer",
  Approver = "approver",
  Finance = "finance",
  Admin = "admin",
}

interface LoginSuccessResponse {
  token: string,
  user: {
    id: string,
    name: string,
    department: string,
    role: Roles,
  },
}

// LOGIN
export const login = createAsyncThunk<LoginSuccessResponse, Login, { rejectValue: string }>("auth/login", 
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
      setCookie("accessToken", data.token);
      
      dispatch(setMessage({ title: "Success", description: `Welcome back, ${data.user.name}` }));
      return fulfillWithValue(data);
    } catch (error: any) {
      const errorMessage = error.message || "Unknown error";
      dispatch(setError({ title: "Login Failed", description: errorMessage }));
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

      dispatch(setMessage({ title: "Success", description: "Register successful"}));
      return fulfillWithValue(data);
    } catch (error: any) {
      const errorMessage = error.message || "Unknown error";
      dispatch(setError({ title: "Register Failed", description: errorMessage }));
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: {
      id: null as string | null,
      name: null as string | null,
      department: null as string | null,
      role: null as Roles | null,
    }
  },
  reducers: {
    clearUserData: (state) => {
      state.user.id = null;
      state.user.name = null;
      state.user.department = null;
      state.user.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
    // LOGIN STATES
    .addCase(login.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(login.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(login.fulfilled, (state, action: PayloadAction<LoginSuccessResponse>) => {
      state.isLoading = false;
      state.user = action.payload.user;
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

export const { clearUserData } = authSlice.actions;
export const authReducer = authSlice.reducer;
