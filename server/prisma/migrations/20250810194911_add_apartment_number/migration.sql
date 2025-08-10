/*
  Warnings:

  - You are about to drop the column `lastLocation` on the `ordertracking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `menu` MODIFY `description` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `menuitem` MODIFY `description` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `ordertracking` DROP COLUMN `lastLocation`,
    ADD COLUMN `latitude` DOUBLE NULL,
    ADD COLUMN `longitude` DOUBLE NULL;

-- AlterTable
ALTER TABLE `restaurant` MODIFY `description` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `apartmentNumber` DOUBLE NULL,
    ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `zipCode` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Notification_userId_key` ON `Notification`(`userId`);
