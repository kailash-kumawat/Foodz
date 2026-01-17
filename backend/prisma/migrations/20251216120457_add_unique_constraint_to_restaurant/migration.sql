/*
  Warnings:

  - A unique constraint covering the columns `[name,city,address_line,pincode,contact]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_name_city_address_line_pincode_contact_key" ON "Restaurant"("name", "city", "address_line", "pincode", "contact");
