import prisma from "../../src/db/index.js";
import { dishesData } from "../../data/dish.data.js";

export async function seedDishes() {
  console.log("Seeding started");

  for (const restaurantData of dishesData) {
    const restaurant = await prisma.restaurant.findFirst({
      where: { name: restaurantData.restaurant },
    });

    if (!restaurant) {
      continue;
    }

    const formattedDishes = restaurantData.dishes.map((dish) => ({
      ...dish,
      restaurant_id: restaurant.id,
    }));

    await prisma.dish.createMany({
      data: formattedDishes,
    });

    console.log("Seeding completed");
  }
}
