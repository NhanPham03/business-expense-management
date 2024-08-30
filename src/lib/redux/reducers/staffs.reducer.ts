import { Staff, StaffSchema } from "@/lib/schemas/staff.schema";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setError, setMessage } from "./toast.reducer";
import { API_URI } from "./root.reducer";
import { getCookie } from "@/lib/utils/cookie.utils";

// GET ALL STAFFS
export const getAllStaffs = createAsyncThunk<Staff[], void, { rejectValue: string }>("staffs/getAllStaffs", 
  async (_, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URI}/staffs`, {
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
      const errorMessage = error.message || "Unknown error";
      dispatch(setError({ title: "Error Retrieving Staff", description: errorMessage }));
      return rejectWithValue(errorMessage);
    }
  }
);

// CREATE STAFF
export const createStaff = createAsyncThunk<Staff, StaffSchema, { rejectValue: string }>("staffs/createStaff", 
  async (formData, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URI}/staffs`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getCookie("accessToken")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      dispatch(setMessage({ title: "Success", description: "Staff added" }));
      return fulfillWithValue(data);
    } catch (error: any) {
      const errorMessage = error.message || "Unknown error";
      dispatch(setError({ title: "Error Adding Staff", description: errorMessage}));
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
