import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as dotenv from "dotenv";
import { occupationsTable } from "./schema";

dotenv.config({ path: ".env.local" });

const predefinedOccupations = [
  {
    name: "Software Developer",
    id: "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
  },
  {
    name: "Data Scientist",
    id: "e9e24694-82ee-4890-a548-a73c1d4715f5",
  },
  {
    name: "Project Manager",
    id: "4b3b2462-8b64-4e44-b203-d2d7c503b1e3",
  },
  {
    name: "Graphic Designer",
    id: "1a5e12f6-953e-4d8b-9e4b-7c7d422a55c8",
  },
  {
    name: "Marketing Specialist",
    id: "9f8d7b32-6e2c-4f9e-8c7a-1a2b3c4d5e6f",
  },
  {
    name: "Registered Nurse",
    id: "c3f1a0e8-7e6d-4c5a-b9c2-d3f0e1a2b3c4",
  },
  {
    name: "Financial Analyst",
    id: "2e8f1a7b-4d9c-4e8f-9a7c-6e2d1f8a7b3c",
  },
  {
    name: "Civil Engineer",
    id: "a7f2e1d3-5c8b-4a9e-8f2c-1a3b5c7e9f8d",
  },
  {
    name: "Human Resources Manager",
    id: "8b1c7a2e-3f6b-4c5d-9e7a-2f1d3e8c9b4a",
  },
  {
    name: "Teacher",
    id: "e1a9b8c7-d6e5-4f3a-8b2c-1d4e5f6a7b8c",
  },
  {
    name: "Electrician",
    id: "f9e7d6c5-a4b3-4c2d-8e1f-6a5b4c3d2e1f",
  },
  {
    name: "Chef",
    id: "d2c1b0a9-e8f7-46d3-9c2b-8a1e6f7d5c4b",
  },
  {
    name: "Plumber",
    id: "a9b8c7d6-e5f4-4a3b-9c2d-1e4f5a6b7c8d",
  },
  {
    name: "Dentist",
    id: "4c5a3b2d-1e7f-48e9-9c1d-2f3a4b5e6c7d",
  },
  {
    name: "Architect",
    id: "b9e8d7c6-a5f4-4b3c-8d1e-2f3a4b5c6d7e",
  },
  {
    name: "Real Estate Agent",
    id: "5c4d3b2a-1e9f-4d8e-9c7b-6a5f4e3d2c1b",
  },
  {
    name: "Social Worker",
    id: "e2f1d0c9-b8a7-4b6e-8d5f-4a3e2c1d0b9a",
  },
  {
    name: "Journalist",
    id: "7e6d5c4b-3a2f-4e1d-8c9b-6f5e4d3c2b1a",
  },
  {
    name: "Accountant",
    id: "1a2b3c4d-5e6f-47a8-9b0c-d1e2f3a4b5c6",
  },
  {
    name: "Police Officer",
    id: "b9e8d7c6-a5f4-4b3c-8d1e-2f3a4b5c6d7e",
  },
];

async function seedOccupations() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  const db = drizzle(client, {
    schema: {
      occupations: occupationsTable,
    },
  });

  for (const occupation of predefinedOccupations) {
    await db
      .insert(occupationsTable)
      .values({
        id: occupation.id,
        name: occupation.name,
      })
      .onConflictDoNothing();
  }

  await client.end();
}

export { seedOccupations };

if (require.main === module) {
  seedOccupations().catch((error) => {
    console.error("Occupations seeding failed:", error);
    process.exit(1);
  });
}
