import { uuid, text, timestamp, date, bigint } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
  idNumber: z
    .string()
    .length(13)
    .regex(/^\d{13}$/, "ID number must be exactly 13 digits"),
  dateOfBirth: z.date(),
  occupation: z.string().min(3).max(255),
});

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
