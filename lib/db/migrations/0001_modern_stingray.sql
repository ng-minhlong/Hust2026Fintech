CREATE TABLE `Chat` (
	`id` varchar(36) NOT NULL DEFAULT '',
	`createdAt` timestamp NOT NULL,
	`title` text NOT NULL,
	`userId` varchar(36) NOT NULL,
	`visibility` varchar(20) NOT NULL DEFAULT 'private',
	CONSTRAINT `Chat_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Document` (
	`id` varchar(36) NOT NULL DEFAULT '',
	`createdAt` timestamp NOT NULL,
	`title` text NOT NULL,
	`content` text,
	`kind` varchar(20) NOT NULL DEFAULT 'text',
	`userId` varchar(36) NOT NULL,
	CONSTRAINT `Document_id_createdAt_pk` PRIMARY KEY(`id`,`createdAt`)
);
--> statement-breakpoint
CREATE TABLE `Message_v2` (
	`id` varchar(36) NOT NULL DEFAULT '',
	`chatId` varchar(36) NOT NULL,
	`role` varchar(255) NOT NULL,
	`parts` json NOT NULL,
	`attachments` json NOT NULL,
	`createdAt` timestamp NOT NULL,
	CONSTRAINT `Message_v2_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Stream` (
	`id` varchar(36) NOT NULL DEFAULT '',
	`chatId` varchar(36) NOT NULL,
	`createdAt` timestamp NOT NULL,
	CONSTRAINT `Stream_id_pk` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Suggestion` (
	`id` varchar(36) NOT NULL DEFAULT '',
	`documentId` varchar(36) NOT NULL,
	`documentCreatedAt` timestamp NOT NULL,
	`originalText` text NOT NULL,
	`suggestedText` text NOT NULL,
	`description` text,
	`isResolved` boolean NOT NULL DEFAULT false,
	`userId` varchar(36) NOT NULL,
	`createdAt` timestamp NOT NULL,
	CONSTRAINT `Suggestion_id_pk` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` varchar(36) NOT NULL DEFAULT '',
	`email` varchar(64) NOT NULL,
	`password` varchar(64),
	`name` text,
	`emailVerified` boolean NOT NULL DEFAULT false,
	`image` text,
	`isAnonymous` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `User_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Vote_v2` (
	`chatId` varchar(36) NOT NULL,
	`messageId` varchar(36) NOT NULL,
	`isUpvoted` boolean NOT NULL,
	CONSTRAINT `Vote_v2_chatId_messageId_pk` PRIMARY KEY(`chatId`,`messageId`)
);
--> statement-breakpoint
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Document` ADD CONSTRAINT `Document_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Message_v2` ADD CONSTRAINT `Message_v2_chatId_Chat_id_fk` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Stream` ADD CONSTRAINT `Stream_chatId_Chat_id_fk` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Suggestion` ADD CONSTRAINT `Suggestion_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Suggestion` ADD CONSTRAINT `Suggestion_documentId_documentCreatedAt_Document_id_createdAt_fk` FOREIGN KEY (`documentId`,`documentCreatedAt`) REFERENCES `Document`(`id`,`createdAt`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Vote_v2` ADD CONSTRAINT `Vote_v2_chatId_Chat_id_fk` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Vote_v2` ADD CONSTRAINT `Vote_v2_messageId_Message_v2_id_fk` FOREIGN KEY (`messageId`) REFERENCES `Message_v2`(`id`) ON DELETE no action ON UPDATE no action;