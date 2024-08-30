import { z } from "zod";

export interface Project {
  id: string;
  name: string;
  code: string;
  from: string;
  to: string;
  active: boolean;
  project_manager: string;
  quality_assurance: string;
  technical_lead: string[];
  business_analyst: string[];
  developers: string[];
  testers: string[];
  technical_consultant: string[];
}

const projectSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  code: z.string().min(1, {
    message: "Code is required",
  }),
  from: z.string().date(),
  to: z.string().date(),
  project_manager: z.string(),
  quality_assurance: z.string(),
  technical_lead: z.array(z.string()),
  business_analyst: z.array(z.string()),
  developers: z.array(z.string()),
  testers: z.array(z.string()),
  technical_consultant: z.array(z.string()),
});

export type ProjectSchema = z.infer<typeof projectSchema>;
