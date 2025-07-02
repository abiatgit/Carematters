-- DropForeignKey
ALTER TABLE "Appoinment" DROP CONSTRAINT "Appoinment_residentId_fkey";

-- DropForeignKey
ALTER TABLE "Appoinment" DROP CONSTRAINT "Appoinment_unitId_fkey";

-- DropForeignKey
ALTER TABLE "Resident" DROP CONSTRAINT "Resident_unitId_fkey";

-- AddForeignKey
ALTER TABLE "Resident" ADD CONSTRAINT "Resident_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appoinment" ADD CONSTRAINT "Appoinment_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appoinment" ADD CONSTRAINT "Appoinment_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
