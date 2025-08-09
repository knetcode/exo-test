import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as dotenv from "dotenv";
import { usersTable } from "./users/schema";

dotenv.config({ path: ".env.local" });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

export const db = drizzle(client, {
  schema: { users: usersTable },
});

export const schema = {
  users: usersTable,
};
