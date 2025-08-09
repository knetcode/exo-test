import { uuid, text, timestamp, date, bigint } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { occupationsTable } from "../occupations/schema";
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
  occupationId: z.uuid({ message: "Occupation must be selected" }),
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
  occupationId: z.uuid({ message: "Occupation must be selected" }),
});
export type UserFormSchema = z.infer<typeof userFormSchema>;

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  idNumber: bigint("id_number", { mode: "bigint" }).notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  occupationId: uuid("occupation_id")
    .notNull()
    .references(() => occupationsTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
