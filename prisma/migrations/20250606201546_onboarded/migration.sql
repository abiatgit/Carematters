/*
  Warnings:

  - You are about to drop the column `Onboarding` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Onboarding",
ADD COLUMN     "onboarded" BOOLEAN NOT NULL DEFAULT false;
