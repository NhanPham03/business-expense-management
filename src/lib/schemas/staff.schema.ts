import { z } from "zod";

export interface Staff {
  _id: string;
  name: string;
  department: string;
  job_title: string;
  rank: string;
  role: "claimer" | "approver" | "finance" | "admin";
  email: string;
  password: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export const staffSchema = z.object({
  name: z.string().regex(/^[A-Za-z\s]+$/, { 
    message: "Must only contain alphabetical characters", 
  }).min(1, {
    message: "Name is required",
  }),
  department: z.string().min(1, { 
    message: "Department is required", 
  }),
  job_title: z.string().min(1, { 
    message: "Job title is required", 
  }),
  rank: z.string().min(1, { 
    message: "Rank is required", 
  }),
  role: z.enum(["claimer", "approver", "finance", "admin"]),
  email: z.string().email().min(1, { 
    message: "Email is required", 
  }),
  password: z.string().min(1, { 
    message: "Password is required", 
  }),
});

export type StaffSchema = z.infer<typeof staffSchema>;
