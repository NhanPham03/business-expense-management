import { Staff } from "@/lib/schemas/staff.schema";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setError } from "./toast.reducer";
import { API_URI } from "./root.reducer";

// GET ALL STAFFS
export const getAllStaffs = createAsyncThunk<Staff[], void, { rejectValue: string }>("staffs/getAllStaffs", 
  async (_, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URI}/staffs`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer`,
        },
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

const staffsSlice = createSlice({
  name: "staffs",
  initialState: {
    isLoading: false,
    staffs: [] as Staff[],
    currentStaff: null as Staff | null,
    totalStaffs: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    // GET ALL STAFFS STATES
    .addCase(getAllStaffs.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllStaffs.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getAllStaffs.fulfilled, (state, action: PayloadAction<Staff[]>) => {
      state.isLoading = false;
      state.staffs = action.payload;
      state.totalStaffs = action.payload.length;
    });
  },
});

export const staffsReducer = staffsSlice.reducer;
