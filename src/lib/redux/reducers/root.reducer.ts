import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./auth.reducer";
import { claimsReducer } from "./claims.reducer";
import { dashboardReducer } from "./dashboard.reducer";
import { projectsReducer } from "./projects.reducer";
import { staffsReducer } from "./staffs.reducer";
import { toastReducer } from "./toast.reducer";

export const API_URI = import.meta.env.VITE_API_URI;

const rootReducer = combineReducers({
  auth: authReducer,
  claims: claimsReducer,
  dashboard: dashboardReducer,
  projects: projectsReducer,
  staffs: staffsReducer,
  toast: toastReducer,
});

export default rootReducer;
