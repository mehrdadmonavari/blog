-- AlterTable
ALTER TABLE `post_categories` ADD COLUMN `status` ENUM('ENABEL', 'DISABLE') NOT NULL DEFAULT 'ENABEL';
