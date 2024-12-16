/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Url` table. All the data in the column will be lost.
  - You are about to drop the column `original_url` on the `Url` table. All the data in the column will be lost.
  - You are about to drop the column `shortened_url` on the `Url` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shortenedUrl]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `originalUrl` to the `Url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortenedUrl` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Url_shortened_url_key";

-- AlterTable
ALTER TABLE "Url" DROP COLUMN "createdAt",
DROP COLUMN "original_url",
DROP COLUMN "shortened_url",
ADD COLUMN     "originalUrl" TEXT NOT NULL,
ADD COLUMN     "shortenedUrl" TEXT NOT NULL,
ADD COLUMN     "title" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortenedUrl_key" ON "Url"("shortenedUrl");
