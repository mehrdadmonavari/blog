/*
  Warnings:

  - You are about to alter the column `status` on the `post_categories` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `post_categories` MODIFY `status` ENUM('ENABLE', 'DISABLE') NOT NULL DEFAULT 'ENABLE';
