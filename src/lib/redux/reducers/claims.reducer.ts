import { Claim } from "@/lib/schemas/claim.schema";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setError } from "./toast.reducer";
import { API_URI } from "./root.reducer";

// GET ALL CLAIMS
export const getAllClaims = createAsyncThunk<Claim[], void, { rejectValue: string }>("claims/getAllClaims", 
  async (_, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URI}/claims`, {
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
