/*
  Warnings:

  - You are about to drop the column `where` on the `Appoinment` table. All the data in the column will be lost.
  - Added the required column `venue` to the `Appoinment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appoinment" DROP COLUMN "where",
ADD COLUMN     "venue" TEXT NOT NULL;
