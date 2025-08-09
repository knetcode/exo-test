import { uuid, text, timestamp, date, bigint } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { z } from "zod";

export const userDbSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters" })
    .max(255, { message: "First name must be less than 255 characters" }),
  lastName: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters" })
    .max(255, { message: "Last name must be less than 255 characters" }),
  idNumber: z
    .string()
    .length(13)
    .regex(/^\d{13}$/, "ID number must be exactly 13 digits"),
  dateOfBirth: z.string({ message: "Date of birth is required" }).transform((val) => new Date(val)),
  occupation: z
    .string()
    .min(3, { message: "Occupation must be at least 3 characters" })
    .max(255, { message: "Occupation must be less than 255 characters" }),
});
export type UserSchema = z.infer<typeof userDbSchema>;

export const userFormSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters" })
    .max(255, { message: "First name must be less than 255 characters" }),
  lastName: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters" })
    .max(255, { message: "Last name must be less than 255 characters" }),
  idNumber: z
    .string()
    .length(13)
    .regex(/^\d{13}$/, "ID number must be exactly 13 digits"),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  occupation: z
    .string()
    .min(3, { message: "Occupation must be at least 3 characters" })
    .max(255, { message: "Occupation must be less than 255 characters" }),
});
export type UserFormSchema = z.infer<typeof userFormSchema>;

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  idNumber: bigint("id_number", { mode: "bigint" }).notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  occupation: text("occupation").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
