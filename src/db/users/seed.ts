import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as dotenv from "dotenv";
import { usersTable } from "./schema";
import { occupationsTable } from "../occupations/schema";

dotenv.config({ path: ".env.local" });

async function seedUsers() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  const db = drizzle(client, {
    schema: {
      users: usersTable,
      occupations: occupationsTable,
    },
  });

  const users = [
    {
      firstName: "Kyle",
      lastName: "Esterhuizen",
      idNumber: 9411115027088,
      dateOfBirth: "1994-01-01",
      occupationId: "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
    },
  ];

  for (const user of users) {
    await db
      .insert(usersTable)
      .values({
        firstName: user.firstName,
        lastName: user.lastName,
        idNumber: BigInt(user.idNumber),
        dateOfBirth: user.dateOfBirth,
        occupationId: user.occupationId,
      })
      .onConflictDoNothing();
  }

  await client.end();
}

export { seedUsers };

if (require.main === module) {
  seedUsers().catch((error) => {
    console.error("Users seeding failed:", error);
    process.exit(1);
  });
}
