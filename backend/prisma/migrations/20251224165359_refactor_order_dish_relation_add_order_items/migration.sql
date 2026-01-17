/*
  Warnings:

  - You are about to drop the column `order_id` on the `Dish` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[restaurant_id,name,isDeleted]` on the table `Dish` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_order_id_fkey";

-- DropIndex
DROP INDEX "Dish_restaurant_id_name_key";

-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "order_id",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "dish_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrderItem_order_id_idx" ON "OrderItem"("order_id");

-- CreateIndex
CREATE INDEX "OrderItem_dish_id_idx" ON "OrderItem"("dish_id");

-- CreateIndex
CREATE UNIQUE INDEX "Dish_restaurant_id_name_isDeleted_key" ON "Dish"("restaurant_id", "name", "isDeleted");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
