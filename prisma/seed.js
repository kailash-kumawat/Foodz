import fs from "fs";
import csv from "csv-parser";
import prisma from "../src/db/index.js";
import path from "path";

async function main() {
  const filePath = path.resolve("data", "restaurants.csv");
  const restaurants = [];

  // 1. Read CSV file
  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        // 2. Clean & map CSV → Prisma fields
        if (!row["Restaurant Name"] || !row["City"]) return;

        restaurants.push({
          name: row["Restaurant Name"].trim(),
          city: row["City"].trim(),
          address_line: row["Address"].trim(),
          pincode: String(row["Pincode"]).trim(),
          contact: row["Contact"].trim(),
        });
      })
      .on("end", resolve)
      .on("error", reject);
  });

  console.log(`Read ${restaurants.length} restaurants from CSV`);

  // 3. Insert into DB (safe for duplicates)
  await prisma.restaurant.createMany({
    data: restaurants,
    skipDuplicates: true,
  });

  console.log("Restaurants seeded successfully");
}

main()
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
