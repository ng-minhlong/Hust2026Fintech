import type { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  json,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  varchar,
  decimal,
} from "drizzle-orm/mysql-core";

export const user = mysqlTable("User", {
  id: varchar("id", { length: 36 }).primaryKey().notNull().default(''),  // Using varchar for UUID
  email: varchar("email", { length: 64 }).notNull(),
  password: varchar("password", { length: 64 }),
  name: text("name"),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  isAnonymous: boolean("isAnonymous").notNull().default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type User = InferSelectModel<typeof user>;

export const chat = mysqlTable("Chat", {
  id: varchar("id", { length: 36 }).primaryKey().notNull().default(''),  // Using varchar for UUID
  createdAt: timestamp("createdAt").notNull(),
  title: text("title").notNull(),
  userId: varchar("userId", { length: 36 })
    .notNull()
    .references(() => user.id),
  visibility: varchar("visibility", { length: 255 })
    .notNull()
    .default("private"),
});

export type Chat = InferSelectModel<typeof chat>;

export const message = mysqlTable("Message_v2", {
  id: varchar("id", { length: 36 }).primaryKey().notNull().default(''),  // Using varchar for UUID
  chatId: varchar("chatId", { length: 36 })
    .notNull()
    .references(() => chat.id),
  role: varchar("role", { length: 255 }).notNull(),
  parts: json("parts").notNull(),
  attachments: json("attachments").notNull(),
  createdAt: timestamp("createdAt").notNull(),
});

export type DBMessage = InferSelectModel<typeof message>;

export const vote = mysqlTable(
  "Vote_v2",
  {
    chatId: varchar("chatId", { length: 36 })
      .notNull()
      .references(() => chat.id),
    messageId: varchar("messageId", { length: 36 })
      .notNull()
      .references(() => message.id),
    isUpvoted: boolean("isUpvoted").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.chatId, table.messageId] }),
  })
);

export type Vote = InferSelectModel<typeof vote>;

export const document = mysqlTable(
  "Document",
  {
    id: varchar("id", { length: 36 }).notNull().default(''),  // Using varchar for UUID
    createdAt: timestamp("createdAt").notNull(),
    title: text("title").notNull(),
    content: text("content"),
    kind: varchar("kind", { length: 255 })
      .notNull()
      .default("text"),
    userId: varchar("userId", { length: 36 })
      .notNull()
      .references(() => user.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id, table.createdAt] }),
  })
);

export type Document = InferSelectModel<typeof document>;

export const suggestion = mysqlTable(
  "Suggestion",
  {
    id: varchar("id", { length: 36 }).notNull().default(''),  // Using varchar for UUID
    documentId: varchar("documentId", { length: 36 }).notNull(),
    documentCreatedAt: timestamp("documentCreatedAt").notNull(),
    originalText: text("originalText").notNull(),
    suggestedText: text("suggestedText").notNull(),
    description: text("description"),
    isResolved: boolean("isResolved").notNull().default(false),
    userId: varchar("userId", { length: 36 })
      .notNull()
      .references(() => user.id),
    createdAt: timestamp("createdAt").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id] }),
    documentRef: foreignKey({
      columns: [table.documentId, table.documentCreatedAt],
      foreignColumns: [document.id, document.createdAt],
    }),
  })
);

export type Suggestion = InferSelectModel<typeof suggestion>;

export const stream = mysqlTable(
  "Stream",
  {
    id: varchar("id", { length: 36 }).notNull().default(''),  // Using varchar for UUID
    chatId: varchar("chatId", { length: 36 }).notNull(),
    createdAt: timestamp("createdAt").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id] }),
    chatRef: foreignKey({
      columns: [table.chatId],
      foreignColumns: [chat.id],
    }),
  })
);

export type Stream = InferSelectModel<typeof stream>;

export const userBalance = mysqlTable("UserBalance", {
  id: varchar("id", { length: 36 }).primaryKey().notNull().default(''),
  userId: varchar("userId", { length: 36 })
    .notNull()
    .references(() => user.id),
  accountBalance: decimal("account_balance", { precision: 15, scale: 2 }).notNull().default("0.00"),
  currency: varchar("currency", { length: 3 }).notNull().default("VND"),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type UserBalance = InferSelectModel<typeof userBalance>;

export const transactionHistory = mysqlTable("TransactionHistory", {
  id: varchar("id", { length: 36 }).primaryKey().notNull().default(''),
  senderId: varchar("senderId", { length: 36 })
    .notNull()
    .references(() => user.id),
  receiverId: varchar("receiverId", { length: 36 })
    .notNull()
    .references(() => user.id),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  description: text("description"),
  type: varchar("type", { length: 20 }).notNull(), // manual/ai_assistant
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  status: varchar("status", { length: 20 }).notNull().default("pending"), // success/failed/pending
});

export type TransactionHistory = InferSelectModel<typeof transactionHistory>;

export const mySavedAccount = mysqlTable("MySavedAccount", {
  id: varchar("id", { length: 36 }).primaryKey().notNull().default(''),
  userId: varchar("userId", { length: 36 })
    .notNull()
    .references(() => user.id),
  savedAccountId: varchar("savedAccountId", { length: 36 })
    .notNull()
    .references(() => user.id),
  shortName: varchar("shortName", { length: 100 }).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type MySavedAccount = InferSelectModel<typeof mySavedAccount>;
