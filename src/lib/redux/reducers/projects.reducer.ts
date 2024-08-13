import { Project } from "@/lib/schemas/project.schema";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setError } from "./toast.reducer";
import { API_URI } from "./root.reducer";

// GET ALL PROJECTS
export const getAllProjects = createAsyncThunk<Project[], void, { rejectValue: string }>("",
  async (_, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URI}/projects`, {
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

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    isLoading: false,
    projects: [] as Project[],
    currentProject: null as Project | null,
    totalProjects: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    // GET ALL PROJECTS STATES
    .addCase(getAllProjects.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllProjects.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getAllProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
      state.isLoading = false;
      state.projects = action.payload;
      state.totalProjects = action.payload.length;
    });
  },
});

export const projectsReducer = projectsSlice.reducer;
