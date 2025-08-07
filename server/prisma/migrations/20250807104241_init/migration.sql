/*
  Warnings:

  - You are about to drop the column `location` on the `restaurant` table. All the data in the column will be lost.
  - Made the column `type` on table `media` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `driver` ADD COLUMN `latitude` DOUBLE NULL,
    ADD COLUMN `longitude` DOUBLE NULL;

-- AlterTable
ALTER TABLE `media` MODIFY `type` ENUM('video', 'audio', 'image', 'document', 'other') NOT NULL;

-- AlterTable
ALTER TABLE `restaurant` DROP COLUMN `location`,
    ADD COLUMN `latitude` DOUBLE NULL,
    ADD COLUMN `longitude` DOUBLE NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `latitude` DOUBLE NULL,
    ADD COLUMN `longitude` DOUBLE NULL;
