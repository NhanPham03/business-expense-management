import { z } from "zod";

const errorDateTime = "Invalid DateTime format";

export interface Claim {
  id: string;
  status: string;
  staff: {
    id: number;
    name: string;
    department: string;
  };
  project: {
    name: string;
    from: string;
    to: string;
  };
  records: {
    date: string;
    day: string;
    from: string;
    to: string;
    remarks: string;
    money: number;
  }[];
  remarks: string;
  total_money: number;
  created_at: string;
  updated_at: string;
}

const PartialStaffSchema = z.object({
  id: z.number(),
  name: z.string().regex(/^[A-Za-z\s]+$/, {
    message: "Must only contain alphabetical characters",
  }),
  department: z.string(),
});

const PartialProjectSchema = z.object({
  name: z.string(),
  code: z.string(),
  from: z.string().date(),
  to: z.string().date(),
});

const RecordSchema = z.object({
  date: z.string().date(),
  day: z.string(),
  from: z.string().datetime({ message: errorDateTime }),
  to: z.string().datetime({ message: errorDateTime }),
  remarks: z.string(),
  money: z.number(),
});

const claimSchema = z.object({
  status: z.string(),
  staff: PartialStaffSchema,
  project: PartialProjectSchema,
  records: z.array(RecordSchema),
  remarks: z.string(),
  total_money: z.number(),
  created_at: z.string().datetime({ message: errorDateTime }),
  updated_at: z.string().datetime({ message: errorDateTime }),
});

export type ClaimSchema = z.infer<typeof claimSchema>;
