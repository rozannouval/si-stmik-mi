-- CreateEnum
CREATE TYPE "DegreeType" AS ENUM ('D3', 'D4', 'S1', 'S2');

-- CreateTable
CREATE TABLE "program_studi" (
    "id" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jenjang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "program_studi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "program_studi_kode_key" ON "program_studi"("kode");
