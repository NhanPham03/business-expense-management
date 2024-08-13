import { z } from "zod";

const errorDateTime = "Invalid DateTime format";

export interface Staff {
  name: string;
  department: string;
  rank: string;
  role: "claimer" | "approver" | "finance" | "admin";
  email: string;
  password: string;
  active: boolean;
  id: number;
  createdAt: string;
  updatedAt: string;
}

const staffSchema = z.object({
  name: z.string().regex(/^[A-Za-z\s]+$/, {
    message: "Must only contain alphabetical characters",
  }),
  department: z.string(),
  rank: z.string(),
  role: z.enum(["claimer", "approver", "finance", "admin"]),
  email: z.string().email(),
  password: z.string().min(6),
  createdAt: z.string().datetime({ message: errorDateTime }),
  updatedAt: z.string().datetime({ message: errorDateTime }),
});

export type StaffSchema = z.infer<typeof staffSchema>;
