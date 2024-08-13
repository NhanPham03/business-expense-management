import { Project } from "@/lib/schemas/project.schema";
import { API_URI } from "@/lib/utils/axios.config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setError } from "./toast.reducer";

// GET ALL PROJECTS
export const getAllProjects = createAsyncThunk<Project[], void, { rejectValue: string }>("",
  async (_, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API_URI.get("/projects");

      return fulfillWithValue(res.data);
    } catch (error: any) {
      dispatch(setError(error.response.data));
      return rejectWithValue(error.response.data);
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
