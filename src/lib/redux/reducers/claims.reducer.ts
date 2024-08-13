import { Claim } from "@/lib/schemas/claim.schema";
import { API_URI } from "@/lib/utils/axios.config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setError } from "./toast.reducer";

// GET ALL CLAIMS
export const getAllClaims = createAsyncThunk<Claim[], void, { rejectValue: string }>("claims/getAllClaims", 
  async (_, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API_URI.get("/claims");

      return fulfillWithValue(res.data);
    } catch (error: any) {
      dispatch(setError(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

const claimsSlice = createSlice({
  name: "claims",
  initialState: {
    isLoading: false,
    claims: [] as Claim[],
    currentClaim: null as Claim | null,
    totalClaims: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    // GET ALL CLAIMS STATES
    .addCase(getAllClaims.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllClaims.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getAllClaims.fulfilled, (state, action: PayloadAction<Claim[]>) => {
      state.isLoading = false;
      state.claims = action.payload;
      state.totalClaims = action.payload.length;
    });
  },
});

export const claimsReducer = claimsSlice.reducer;
