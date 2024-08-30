import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setError } from "./toast.reducer";
import { API_URI } from "./root.reducer";
import { getCookie } from "@/lib/utils/cookie.utils";

export const getDashboardData = createAsyncThunk<{}, void, { rejectValue: string }>("dashboard/getDashboardData", 
  async (_, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URI}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getCookie("accessToken")}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return fulfillWithValue(data);
    } catch (error: any) {
      dispatch(setError(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getDashboardData.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getDashboardData.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getDashboardData.fulfilled, (state, action: PayloadAction<{}>) => {
      state.isLoading = false;
    });
  },
});

export const dashboardReducer = dashboardSlice.reducer;
