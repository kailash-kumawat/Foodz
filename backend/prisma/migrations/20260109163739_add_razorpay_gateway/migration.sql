-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "gateway" TEXT,
ADD COLUMN     "gateway_order_id" TEXT,
ADD COLUMN     "gateway_payment_id" TEXT,
ADD COLUMN     "gateway_signature" TEXT;
