import { db } from "@/db";
import { usersTable } from "./schema";
import { userDbSchema } from "./schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

export async function userFindAll() {
  const users = await db.select().from(usersTable);

  return users.map((user) => ({
    ...user,
    idNumber: user.idNumber.toString(), // Convert BigInt values to strings for JSON serialization
  }));
}

export async function userFindById(id: string) {
  const user = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);

  return user
    ? {
        ...user[0],
        idNumber: user[0].idNumber.toString(), // Convert BigInt to string for JSON serialization
      }
    : undefined;
}

export async function userCreate(user: z.infer<typeof userDbSchema>) {
  const newUser = await db.insert(usersTable).values({
    firstName: user.firstName,
    lastName: user.lastName,
    idNumber: BigInt(user.idNumber),
    dateOfBirth: user.dateOfBirth.toISOString(),
    occupation: user.occupation,
  });

  return newUser;
}

export async function userDelete(id: string) {
  const deletedUser = await db.delete(usersTable).where(eq(usersTable.id, id));

  return deletedUser;
}

export async function userUpdate(user: z.infer<typeof userDbSchema>, id: string) {
  const updatedUser = await db
    .update(usersTable)
    .set({
      firstName: user.firstName,
      lastName: user.lastName,
      idNumber: BigInt(user.idNumber),
      dateOfBirth: user.dateOfBirth.toISOString(),
      occupation: user.occupation,
    })
    .where(eq(usersTable.id, id));

  return updatedUser;
}
