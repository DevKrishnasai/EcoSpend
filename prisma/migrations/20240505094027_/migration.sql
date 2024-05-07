/*
  Warnings:

  - You are about to drop the column `contry` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "contry",
ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'India';
