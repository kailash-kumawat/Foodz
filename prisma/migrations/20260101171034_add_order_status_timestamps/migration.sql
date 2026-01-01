-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "accepted_at" TIMESTAMP(3),
ADD COLUMN     "cancelled_at" TIMESTAMP(3),
ADD COLUMN     "delivered_at" TIMESTAMP(3),
ADD COLUMN     "on_the_way_at" TIMESTAMP(3),
ADD COLUMN     "prepared_at" TIMESTAMP(3);
