import { seedOccupations } from "./occupations/seed";
import { seedUsers } from "./users/seed";

async function seedAll() {
  try {
    await seedOccupations();
    await seedUsers();
  } catch (error) {
    console.error("Seeding failed", error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedAll();
}

export { seedAll, seedOccupations, seedUsers };
