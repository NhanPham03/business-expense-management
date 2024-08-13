import { Staff } from "@/lib/schemas/staff.schema";
import { API_URI } from "@/lib/utils/axios.config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setError } from "./toast.reducer";

// GET ALL STAFFS
export const getAllStaffs = createAsyncThunk<Staff[], void, { rejectValue: string }>("staffs/getAllStaffs", 
  async (_, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API_URI.get("/staffs");

      return fulfillWithValue(res.data);
    } catch (error: any) {
      dispatch(setError(error.response.data));
      return rejectWithValue(error.response.data);
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
