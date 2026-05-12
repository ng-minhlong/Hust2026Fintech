CREATE TABLE `UserBalance` (
	`id` varchar(36) NOT NULL DEFAULT '',
	`userId` varchar(36) NOT NULL,
	`account_balance` decimal(15,2) NOT NULL DEFAULT '0.00',
	`currency` varchar(3) NOT NULL DEFAULT 'VND',
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `UserBalance_id` PRIMARY KEY(`id`)
);

CREATE TABLE `TransactionHistory` (
	`id` varchar(36) NOT NULL DEFAULT '',
	`senderId` varchar(36) NOT NULL,
	`receiverId` varchar(36) NOT NULL,
	`amount` decimal(15,2) NOT NULL,
	`description` text,
	`type` varchar(20) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`status` varchar(20) NOT NULL DEFAULT 'pending',
	CONSTRAINT `TransactionHistory_id` PRIMARY KEY(`id`)
);

CREATE TABLE `MySavedAccount` (
	`id` varchar(36) NOT NULL DEFAULT '',
	`userId` varchar(36) NOT NULL,
	`savedAccountId` varchar(36) NOT NULL,
	`shortName` varchar(100) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `MySavedAccount_id` PRIMARY KEY(`id`)
);

ALTER TABLE `UserBalance` ADD CONSTRAINT `UserBalance_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `TransactionHistory` ADD CONSTRAINT `TransactionHistory_senderId_User_id_fk` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `TransactionHistory` ADD CONSTRAINT `TransactionHistory_receiverId_User_id_fk` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `MySavedAccount` ADD CONSTRAINT `MySavedAccount_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `MySavedAccount` ADD CONSTRAINT `MySavedAccount_savedAccountId_User_id_fk` FOREIGN KEY (`savedAccountId`) REFERENCES `User`(`id`) ON DELETE no action ON UPDATE no action;
