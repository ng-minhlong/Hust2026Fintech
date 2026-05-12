ALTER TABLE `Chat` MODIFY COLUMN `visibility` varchar(255) NOT NULL DEFAULT 'private';--> statement-breakpoint
ALTER TABLE `Document` MODIFY COLUMN `kind` varchar(255) NOT NULL DEFAULT 'text';