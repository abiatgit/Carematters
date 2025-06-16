/*
  Warnings:

  - You are about to drop the column `with` on the `Appoinment` table. All the data in the column will be lost.
  - Added the required column `scheduledWith` to the `Appoinment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appoinment" DROP COLUMN "with",
ADD COLUMN     "scheduledWith" TEXT NOT NULL;
