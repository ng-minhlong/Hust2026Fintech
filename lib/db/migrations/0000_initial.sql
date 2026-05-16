CREATE TABLE IF NOT EXISTS `User` (
  `id` varchar(36) PRIMARY KEY NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64),
  `name` text,
  `emailVerified` boolean NOT NULL DEFAULT false,
  `image` text,
  `isAnonymous` boolean NOT NULL DEFAULT false,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `Chat` (
  `id` varchar(36) PRIMARY KEY NOT NULL,
  `createdAt` timestamp NOT NULL,
  `title` text NOT NULL,
  `userId` varchar(36) NOT NULL,
  `visibility` varchar(255) NOT NULL DEFAULT 'private',
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`)
);

CREATE TABLE IF NOT EXISTS `Message_v2` (
  `id` varchar(36) PRIMARY KEY NOT NULL,
  `chatId` varchar(36) NOT NULL,
  `role` varchar(255) NOT NULL,
  `parts` json NOT NULL,
  `attachments` json NOT NULL,
  `createdAt` timestamp NOT NULL,
  `category` varchar(255) NOT NULL DEFAULT 'general',
  FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`)
);

CREATE TABLE IF NOT EXISTS `Vote_v2` (
  `chatId` varchar(36) NOT NULL,
  `messageId` varchar(36) NOT NULL,
  `isUpvoted` boolean NOT NULL,
  PRIMARY KEY (`chatId`, `messageId`),
  FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`),
  FOREIGN KEY (`messageId`) REFERENCES `Message_v2`(`id`)
);

CREATE TABLE IF NOT EXISTS `Document` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL,
  `title` text NOT NULL,
  `content` text,
  `kind` varchar(255) NOT NULL DEFAULT 'text',
  `userId` varchar(36) NOT NULL,
  PRIMARY KEY (`id`, `createdAt`),
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`)
);

CREATE TABLE IF NOT EXISTS `Suggestion` (
  `id` varchar(36) NOT NULL,
  `documentId` varchar(36) NOT NULL,
  `documentCreatedAt` timestamp NOT NULL,
  `originalText` text NOT NULL,
  `suggestedText` text NOT NULL,
  `description` text,
  `isResolved` boolean NOT NULL DEFAULT false,
  `userId` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`),
  FOREIGN KEY (`documentId`, `documentCreatedAt`) REFERENCES `Document`(`id`, `createdAt`)
);

CREATE TABLE IF NOT EXISTS `Stream` (
  `id` varchar(36) NOT NULL,
  `chatId` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`)
);
