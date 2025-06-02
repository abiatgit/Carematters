/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CareStaff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Nurse` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `Manager` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Resident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamLeadId` to the `Resident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('serious', 'medium', 'low');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('teamLead', 'supportWorker');

-- DropForeignKey
ALTER TABLE "CareStaff" DROP CONSTRAINT "CareStaff_unitId_fkey";

-- DropForeignKey
ALTER TABLE "Nurse" DROP CONSTRAINT "Nurse_unitId_fkey";

-- AlterTable
ALTER TABLE "Manager" ADD COLUMN     "photo" TEXT,
ADD COLUMN     "role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Resident" ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "teamLeadId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "CareStaff";

-- DropTable
DROP TABLE "Nurse";

-- CreateTable
CREATE TABLE "TeamLead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photo" TEXT,
    "role" "Role" NOT NULL,
    "gende" "Gender" NOT NULL,
    "unitId" TEXT NOT NULL,

    CONSTRAINT "TeamLead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportWorker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photo" TEXT,
    "mobile" INTEGER NOT NULL,
    "role" "Role" NOT NULL,
    "gende" "Gender" NOT NULL,
    "unitId" TEXT NOT NULL,

    CONSTRAINT "SupportWorker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appoinment" (
    "id" TEXT NOT NULL,
    "where" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "with" TEXT NOT NULL,
    "residentId" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,

    CONSTRAINT "Appoinment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "residentId" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medication" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "residentId" TEXT NOT NULL,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeamLead" ADD CONSTRAINT "TeamLead_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportWorker" ADD CONSTRAINT "SupportWorker_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resident" ADD CONSTRAINT "Resident_teamLeadId_fkey" FOREIGN KEY ("teamLeadId") REFERENCES "TeamLead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appoinment" ADD CONSTRAINT "Appoinment_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appoinment" ADD CONSTRAINT "Appoinment_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
