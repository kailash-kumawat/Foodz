import { seedDishes } from "./seeds/dish.seed.js";

async function main() {
  await seedDishes();

  console.log("All seeds completed");
}

main();
