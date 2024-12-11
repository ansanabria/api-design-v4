/*
  Warnings:

  - Added the required column `updatedAt` to the `Update` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Update" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
