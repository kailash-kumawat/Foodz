/*
  Warnings:

  - A unique constraint covering the columns `[restaurant_id,name]` on the table `Dish` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dish_restaurant_id_name_key" ON "Dish"("restaurant_id", "name");
