import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2, "first Name is required."),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  gender: z.string().optional(),
  //gender: z.enum(["Male", "Female", "Other"]).optional(),
  jobTitle: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(2, "Password is required."),
});
