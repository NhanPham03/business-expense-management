import { API_URI } from "@/lib/utils/axios.config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setError } from "./toast.reducer";

export const getDashboardData = createAsyncThunk<{}, void, { rejectValue: string }>("dashboard/getDashboardData", 
  async (_, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API_URI.get("");

      return fulfillWithValue(res.data);
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
