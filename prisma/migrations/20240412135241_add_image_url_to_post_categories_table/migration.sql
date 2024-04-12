/*
  Warnings:

  - Added the required column `imageUrl` to the `post_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post_categories` ADD COLUMN `imageUrl` TEXT NOT NULL;
