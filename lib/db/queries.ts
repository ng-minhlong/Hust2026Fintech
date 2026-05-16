import "server-only";

import {
  and,
  asc,
  count,
  desc,
  eq,
  gt,
  gte,
  inArray,
  lt,
  or,
  type SQL,
} from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import type { ArtifactKind } from "@/components/chat/artifact";
import type { VisibilityType } from "@/components/chat/visibility-selector";
import { ChatbotError } from "../errors";
import { generateUUID } from "../utils";
import {
  type Chat,
  chat,
  type DBMessage,
  document,
  message,
  type Suggestion,
  stream,
  suggestion,
  type User,
  user,
  vote,
  userBalance,
  transactionHistory,
  mySavedAccount,
} from "./schema";
import { generateHashedPassword } from "./utils";

const client = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "slidemind",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
const db = drizzle(client);

export async function getUser(email: string): Promise<User[]> {
  try {
    return await db.select().from(user).where(eq(user.email, email));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get user by email"
    );
  }
}

export async function createUser(email: string, password: string) {
  const id = generateUUID();
  const hashedPassword = generateHashedPassword(password);

  try {
    await db.insert(user).values({ id, email, password: hashedPassword });
    await createUserBalance({
      userId: id,
      accountBalance: "100000",
      currency: "USD",
    });
    return;
  } catch (_error) {
    throw new ChatbotError("bad_request:database", "Failed to create user");
  }
}


export async function createGuestUser() {
  const email = `guest-${Date.now()}`;
  const password = generateHashedPassword(generateUUID());
  const id = generateUUID(); // ✅ thêm dòng này

  try {
    return await db.insert(user).values({
      id, // ✅ FIX
      email,
      password,
    });
  } catch (error) {
    console.error(error); // 👈 thêm log để debug thật
    throw new ChatbotError(
      "bad_request:database",
      "Failed to create guest user"
    );
  }
}

export async function saveChat({
  id,
  userId,
  title,
  visibility,
}: {
  id: string;
  userId: string;
  title: string;
  visibility: VisibilityType;
}) {
  try {
    return await db.insert(chat).values({
      id,
      createdAt: new Date(),
      userId,
      title,
      visibility,
    });
  } catch (_error) {
    throw new ChatbotError("bad_request:database", "Failed to save chat");
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    // 1. lấy tất cả message thuộc chat
    const messages = await db
      .select({ id: message.id })
      .from(message)
      .where(eq(message.chatId, id));

    const messageIds = messages.map((m) => m.id);

    // 2. xoá vote theo messageId (quan trọng)
    if (messageIds.length > 0) {
      await db.delete(vote).where(inArray(vote.messageId, messageIds));
    }

    // 3. xoá vote theo chatId (optional)
    await db.delete(vote).where(eq(vote.chatId, id));

    // 4. xoá message
    await db.delete(message).where(eq(message.chatId, id));

    // 5. xoá stream
    await db.delete(stream).where(eq(stream.chatId, id));

    // 6. xoá chat
    const result = await db.delete(chat).where(eq(chat.id, id));

    return result;
  } catch (error) {
    console.error(error); // 👈 rất quan trọng
    throw new ChatbotError(
      "bad_request:database",
      "Failed to delete chat by id"
    ); 
  }
}

export async function deleteAllChatsByUserId({ userId }: { userId: string }) {
  try {
    // 1. lấy chat
    const userChats = await db
      .select({ id: chat.id })
      .from(chat)
      .where(eq(chat.userId, userId));

    if (userChats.length === 0) {
      return { deletedCount: 0 };
    }

    const chatIds = userChats.map((c) => c.id);

    // 2. lấy message thuộc các chat
    const messages = await db
      .select({ id: message.id })
      .from(message)
      .where(inArray(message.chatId, chatIds));

    const messageIds = messages.map((m) => m.id);

    // 3. xoá vote theo messageId (QUAN TRỌNG)
    if (messageIds.length > 0) {
      await db.delete(vote).where(inArray(vote.messageId, messageIds));
    }

    // 4. xoá vote theo chatId (backup)
    await db.delete(vote).where(inArray(vote.chatId, chatIds));

    // 5. xoá message
    await db.delete(message).where(inArray(message.chatId, chatIds));

    // 6. xoá stream
    await db.delete(stream).where(inArray(stream.chatId, chatIds));

    // 7. xoá chat (KHÔNG dùng returning)
    const result = await db.delete(chat).where(eq(chat.userId, userId));

    return { deletedCount: userChats.length };
  } catch (error) {
    console.error(error);
    throw new ChatbotError(
      "bad_request:database",
      "Failed to delete all chats by user id"
    );
  }
}
export async function getChatsByUserId({
  id,
  limit,
  startingAfter,
  endingBefore,
}: {
  id: string;
  limit: number;
  startingAfter: string | null;
  endingBefore: string | null;
}) {
  try {
    const extendedLimit = limit + 1;

    const query = (whereCondition?: SQL<unknown>) =>
      db
        .select()
        .from(chat)
        .where(
          whereCondition
            ? and(whereCondition, eq(chat.userId, id))
            : eq(chat.userId, id)
        )
        .orderBy(desc(chat.createdAt))
        .limit(extendedLimit);

    let filteredChats: Chat[] = [];

    if (startingAfter) {
      const [selectedChat] = await db
        .select()
        .from(chat)
        .where(eq(chat.id, startingAfter))
        .limit(1);

      if (!selectedChat) {
        throw new ChatbotError(
          "not_found:database",
          `Chat with id ${startingAfter} not found`
        );
      }

      filteredChats = await query(gt(chat.createdAt, selectedChat.createdAt));
    } else if (endingBefore) {
      const [selectedChat] = await db
        .select()
        .from(chat)
        .where(eq(chat.id, endingBefore))
        .limit(1);

      if (!selectedChat) {
        throw new ChatbotError(
          "not_found:database",
          `Chat with id ${endingBefore} not found`
        );
      }

      filteredChats = await query(lt(chat.createdAt, selectedChat.createdAt));
    } else {
      filteredChats = await query();
    }

    const hasMore = filteredChats.length > limit;

    return {
      chats: hasMore ? filteredChats.slice(0, limit) : filteredChats,
      hasMore,
    };
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get chats by user id"
    );
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
    if (!selectedChat) {
      return null;
    }

    return selectedChat;
  } catch (_error) {
    throw new ChatbotError("bad_request:database", "Failed to get chat by id");
  }
}

export async function saveMessages({ messages }: { messages: DBMessage[] }) {
  try {
    return await db.insert(message).values(messages);
  } catch (_error) {
    throw new ChatbotError("bad_request:database", "Failed to save messages");
  }
}

export async function updateMessage({
  id,
  parts,
}: {
  id: string;
  parts: DBMessage["parts"];
}) {
  try {
    return await db.update(message).set({ parts }).where(eq(message.id, id));
  } catch (_error) {
    throw new ChatbotError("bad_request:database", "Failed to update message");
  }
}

export async function getMessagesByChatId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(message)
      .where(eq(message.chatId, id))
      .orderBy(asc(message.createdAt));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get messages by chat id"
    );
  }
}

export async function voteMessage({
  chatId,
  messageId,
  type,
}: {
  chatId: string;
  messageId: string;
  type: "up" | "down";
}) {
  try {
    const [existingVote] = await db
      .select()
      .from(vote)
      .where(and(eq(vote.messageId, messageId)));

    if (existingVote) {
      return await db
        .update(vote)
        .set({ isUpvoted: type === "up" })
        .where(and(eq(vote.messageId, messageId), eq(vote.chatId, chatId)));
    }
    return await db.insert(vote).values({
      chatId,
      messageId,
      isUpvoted: type === "up",
    });
  } catch (_error) {
    throw new ChatbotError("bad_request:database", "Failed to vote message");
  }
}

export async function getVotesByChatId({ id }: { id: string }) {
  try {
    return await db.select().from(vote).where(eq(vote.chatId, id));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get votes by chat id"
    );
  }
}

export async function saveDocument({
  id,
  title,
  kind,
  content,
  userId,
}: {
  id: string;
  title: string;
  kind: ArtifactKind;
  content: string;
  userId: string;
}) {
  try {
    await db
      .insert(document)
      .values({
        id,
        title,
        kind,
        content,
        userId,
        createdAt: new Date(),
      });
    
    return;
  } catch (_error) {
    throw new ChatbotError("bad_request:database", "Failed to save document");
  }
}

export async function updateDocumentContent({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  try {
    const docs = await db
      .select()
      .from(document)
      .where(eq(document.id, id))
      .orderBy(desc(document.createdAt))
      .limit(1);

    const latest = docs[0];
    if (!latest) {
      throw new ChatbotError("not_found:database", "Document not found");
    }

    await db
      .update(document)
      .set({ content })
      .where(and(eq(document.id, id), eq(document.createdAt, latest.createdAt)));
    
    return;
  } catch (_error) {
    if (_error instanceof ChatbotError) {
      throw _error;
    }
    throw new ChatbotError(
      "bad_request:database",
      "Failed to update document content"
    );
  }
}

export async function getDocumentsById({ id }: { id: string }) {
  try {
    const documents = await db
      .select()
      .from(document)
      .where(eq(document.id, id))
      .orderBy(asc(document.createdAt));

    return documents;
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get documents by id"
    );
  }
}

export async function getDocumentById({ id }: { id: string }) {
  try {
    const [selectedDocument] = await db
      .select()
      .from(document)
      .where(eq(document.id, id))
      .orderBy(desc(document.createdAt));

    return selectedDocument;
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get document by id"
    );
  }
}

export async function deleteDocumentsByIdAfterTimestamp({
  id,
  timestamp,
}: {
  id: string;
  timestamp: Date;
}) {
  try {
    await db
      .delete(suggestion)
      .where(
        and(
          eq(suggestion.documentId, id),
          gt(suggestion.documentCreatedAt, timestamp)
        )
      );

    await db
      .delete(document)
      .where(and(eq(document.id, id), gt(document.createdAt, timestamp)));
    
    return;
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to delete documents by id after timestamp"
    );
  }
}

export async function saveSuggestions({
  suggestions,
}: {
  suggestions: Suggestion[];
}) {
  try {
    return await db.insert(suggestion).values(suggestions);
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to save suggestions"
    );
  }
}

export async function getSuggestionsByDocumentId({
  documentId,
}: {
  documentId: string;
}) {
  try {
    return await db
      .select()
      .from(suggestion)
      .where(eq(suggestion.documentId, documentId));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get suggestions by document id"
    );
  }
}

export async function getMessageById({ id }: { id: string }) {
  try {
    return await db.select().from(message).where(eq(message.id, id));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get message by id"
    );
  }
}

export async function deleteMessagesByChatIdAfterTimestamp({
  chatId,
  timestamp,
}: {
  chatId: string;
  timestamp: Date;
}) {
  try {
    const messagesToDelete = await db
      .select({ id: message.id })
      .from(message)
      .where(
        and(eq(message.chatId, chatId), gte(message.createdAt, timestamp))
      );

    const messageIds = messagesToDelete.map(
      (currentMessage) => currentMessage.id
    );

    if (messageIds.length > 0) {
      await db
        .delete(vote)
        .where(
          and(eq(vote.chatId, chatId), inArray(vote.messageId, messageIds))
        );

      return await db
        .delete(message)
        .where(
          and(eq(message.chatId, chatId), inArray(message.id, messageIds))
        );
    }
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to delete messages by chat id after timestamp"
    );
  }
}

export async function updateChatVisibilityById({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: "private" | "public";
}) {
  try {
    return await db.update(chat).set({ visibility }).where(eq(chat.id, chatId));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to update chat visibility by id"
    );
  }
}

export async function updateChatTitleById({
  chatId,
  title,
}: {
  chatId: string;
  title: string;
}) {
  try {
    return await db.update(chat).set({ title }).where(eq(chat.id, chatId));
  } catch (_error) {
    return;
  }
}

export async function getMessageCountByUserId({
  id,
  differenceInHours,
}: {
  id: string;
  differenceInHours: number;
}) {
  try {
    const cutoffTime = new Date(
      Date.now() - differenceInHours * 60 * 60 * 1000
    );

    const [stats] = await db
      .select({ count: count(message.id) })
      .from(message)
      .innerJoin(chat, eq(message.chatId, chat.id))
      .where(
        and(
          eq(chat.userId, id),
          gte(message.createdAt, cutoffTime),
          eq(message.role, "user")
        )
      )
      .execute();

    return stats?.count ?? 0;
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get message count by user id"
    );
  }
}

export async function createStreamId({
  streamId,
  chatId,
}: {
  streamId: string;
  chatId: string;
}) {
  try {
    await db
      .insert(stream)
      .values({ id: streamId, chatId, createdAt: new Date() });
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to create stream id"
    );
  }
}

export async function getStreamIdsByChatId({ chatId }: { chatId: string }) {
  try {
    const streamIds = await db
      .select({ id: stream.id })
      .from(stream)
      .where(eq(stream.chatId, chatId))
      .orderBy(asc(stream.createdAt))
      .execute();

    return streamIds.map(({ id }) => id);
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get stream ids by chat id"
    );
  }
}

// Payment-related queries
export async function getUserBalance({ userId }: { userId: string }) {
  try {
    const [balance] = await db
      .select()
      .from(userBalance)
      .where(eq(userBalance.userId, userId))
      .limit(1);

    return balance;
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get user balance"
    );
  }
}

export async function createUserBalance({
  userId,
  accountBalance = "0.00",
  currency = "VND",
}: {
  userId: string;
  accountBalance?: string;
  currency?: string;
}) {
  try {
    const id = generateUUID();
    return await db.insert(userBalance).values({
      id,
      userId,
      accountBalance,
      currency,
      updatedAt: new Date(),
    });
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to create user balance"
    );
  }
}

export async function updateUserBalance({
  userId,
  newBalance,
}: {
  userId: string;
  newBalance: string;
}) {
  try {
    return await db
      .update(userBalance)
      .set({ 
        accountBalance: newBalance,
        updatedAt: new Date()
      })
      .where(eq(userBalance.userId, userId));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to update user balance"
    );
  }
}

export async function createTransaction({
  senderId,
  receiverId,
  amount,
  description,
  type,
  status = "pending",
}: {
  senderId: string;
  receiverId: string;
  amount: string;
  description?: string;
  type: "manual" | "ai_assistant";
  status?: "success" | "failed" | "pending";
}) {
  try {
    const id = generateUUID();
    return await db.insert(transactionHistory).values({
      id,
      senderId,
      receiverId,
      amount,
      description,
      type,
      status,
      createdAt: new Date(),
    });
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to create transaction"
    );
  }
}

export async function updateTransactionStatus({
  transactionId,
  status,
}: {
  transactionId: string;
  status: "success" | "failed" | "pending";
}) {
  try {
    return await db
      .update(transactionHistory)
      .set({ status })
      .where(eq(transactionHistory.id, transactionId));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to update transaction status"
    );
  }
}

export async function getTransactionHistory({
  userId,
  limit = 50,
}: {
  userId: string;
  limit?: number;
}) {
  try {
    return await db
      .select()
      .from(transactionHistory)
      .where(
        or(
          eq(transactionHistory.senderId, userId),
          eq(transactionHistory.receiverId, userId)
        )
      )
      .orderBy(desc(transactionHistory.createdAt))
      .limit(limit);
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get transaction history"
    );
  }
}

export async function saveAccount({
  userId,
  savedAccountId,
  shortName,
}: {
  userId: string;
  savedAccountId: string;
  shortName: string;
}) {
  try {
    const id = generateUUID();
    return await db.insert(mySavedAccount).values({
      id,
      userId,
      savedAccountId,
      shortName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to save account"
    );
  }
}

export async function getSavedAccounts({ userId }: { userId: string }) {
  try {
    return await db
      .select({
        id: mySavedAccount.id,
        savedAccountId: mySavedAccount.savedAccountId,
        shortName: mySavedAccount.shortName,
        createdAt: mySavedAccount.createdAt,
        updatedAt: mySavedAccount.updatedAt,
        savedUserEmail: user.email,
        savedUserName: user.name,
      })
      .from(mySavedAccount)
      .innerJoin(user, eq(mySavedAccount.savedAccountId, user.id))
      .where(eq(mySavedAccount.userId, userId))
      .orderBy(asc(mySavedAccount.shortName));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get saved accounts"
    );
  }
}

export async function deleteSavedAccount({
  userId,
  savedAccountId,
}: {
  userId: string;
  savedAccountId: string;
}) {
  try {
    return await db
      .delete(mySavedAccount)
      .where(
        and(
          eq(mySavedAccount.userId, userId),
          eq(mySavedAccount.savedAccountId, savedAccountId)
        )
      );
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to delete saved account"
    );
  }
}
