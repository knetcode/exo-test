import { db } from "@/db";
import { usersTable } from "./schema";

export async function userFindAll() {
  const users = await db.select().from(usersTable);

  // Convert BigInt values to strings for JSON serialization
  return users.map((user) => ({
    ...user,
    idNumber: user.idNumber.toString(),
  }));
}
