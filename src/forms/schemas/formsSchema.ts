import { z } from "zod";
import { isDisposable } from "../security/isDisposable";

//////////////////
// LOGIN SCHEMA
//////////////////

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "At least 3 chars." })
    .max(20, { message: "Max 20 chars." }),
  password: z
    .string()
    .min(6, { message: "At least 6 chars." })
    .max(20, { message: "Max 20 chars." }),
  // .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).*$/, {
  //   message: "Include uppercase, lowercase, number & symbol.",
  // }),
});

export const promoSchema = z.object({
  promocode: z
    .string()
    .min(3, { message: "At least 3 chars." })
    .max(20, { message: "Max 20 chars." }),
});

//////////////////
// SIGNUP SCHEMA
//////////////////

export const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "At least 3 chars." })
      .max(20, { message: "Max 20 chars." }),
    email: z
      .string()
      .email({ message: "Enter a valid email." })
      .refine((mail) => !isDisposable(mail), {
        message: "Disposable email addresses are not allowed.",
      }),
    password: z
      .string()
      .min(6, { message: "At least 6 chars." })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).*$/, {
        message: "Include uppercase, lowercase, number & symbol.",
      }),
    repeatPassword: z.string().min(6, { message: "At least 6 chars." }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match.",
    path: ["repeatPassword"],
  });

//////////////////
// ADD CONTACT SCHEMA
//////////////////

export const addContactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must have at least 2 chars." })
    .max(25, { message: "Max 25 chars." }),
  surname: z
    .string()
    .min(2, { message: "At least 3 chars." })
    .max(20, { message: "Max 20 chars." }),
  email: z
    .string()
    .email({ message: "Enter a valid email." })
    .refine((mail) => !isDisposable(mail), {
      message: "Disposable email addresses are not allowed.",
    }),
});

//////////////////
// COMMENT SCHEMA
//////////////////

export const commentSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must have at least 2 chars." })
    .max(25, { message: "Max 25 chars." }),
  email: z
    .string()
    .email({ message: "Enter a valid email." })
    .refine((mail) => !isDisposable(mail), {
      message: "Disposable email addresses are not allowed.",
    }),
  message: z
    .string()
    .min(3, { message: "Message must have at least 3 chars." }),
});

//////////////////
// CHAT SCHEMA
//////////////////

export const chatSchema = z.object({
  message: z.string().min(1, { message: "Min 1 char." }),
});

//////////////////
// PHONE NUMBER SCHEMA
//////////////////

export const phoneNumberSchema = z
  .string()
  .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/, {
    message: "Enter a valid international number.",
  });

//////////////////
// ZOD FILE SCHEMA
//////////////////

export const zodFile = z.object({
  type: z.string(),
  name: z.string(),
  size: z.number().int(),
  source: z.any().optional(),
  url: z.string(),
});
