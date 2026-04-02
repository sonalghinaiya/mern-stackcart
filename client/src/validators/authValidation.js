import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2, "first Name is required."),
  lastName: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  gender: z.string().optional(),
  jobTitle: z.string().optional(),
  profileImage: z.any().refine((file) => file && file.size > 0, {
    message: "Profile image is required",
  }),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Invalid email address."),
});

export const verifyOtpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});
