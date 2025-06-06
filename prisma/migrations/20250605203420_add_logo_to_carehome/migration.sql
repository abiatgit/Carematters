/*
  Warnings:

  - You are about to drop the column `totalRooms` on the `CareHome` table. All the data in the column will be lost.
  - Added the required column `postcode` to the `CareHome` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CareHome" DROP COLUMN "totalRooms",
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "postcode" TEXT NOT NULL;
