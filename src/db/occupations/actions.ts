import { db } from "@/db";
import { occupationsTable } from "./schema";
import { eq } from "drizzle-orm";

export async function occupationFindAll() {
  const occupations = await db.select().from(occupationsTable);

  return occupations;
}

export async function occupationById(id: string) {
  const occupation = await db.select().from(occupationsTable).where(eq(occupationsTable.id, id)).limit(1);

  return occupation ? occupation[0] : undefined;
}
