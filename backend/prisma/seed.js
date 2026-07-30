import { seedDishes } from "./seeds/dish.seed.js";
import { seedRestaurants } from "./seeds/restaurant.seed.js";

async function main() {
  await seedRestaurants();
  await seedDishes();

  console.log("All seeds completed");
}

main();
