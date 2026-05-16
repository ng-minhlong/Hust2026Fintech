import { tool } from "ai";
import { z } from "zod";
import type { Session } from "next-auth";
import {
  getTransactionHistory,
  getUserBalance,
} from "@/lib/db/queries";

type ManageToolProps = {
  session: Session;
};

export const manage = ({ session }: ManageToolProps) =>
  tool({
    description:
      "Lookup the authenticated user's account balance and transaction history. Use this tool only for account management, transfer, balance, and transaction inquiries.",
    inputSchema: z.object({
      query: z
        .string()
        .describe(
          "A plain-language description of the user's request for account or transaction information."
        ),
    }),
    execute: async ({ query }) => {
      if (!session.user?.id) {
        return { error: "Forbidden" };
      }

      const userId = session.user.id;
      const balance = await getUserBalance({ userId });
      const transactions = await getTransactionHistory({ userId, limit: 10 });

      if (!balance) {
        return {
          error:
            "No account balance record is available. Please ensure your account is initialized.",
        };
      }

      const normalizedQuery = query.trim().toLowerCase();
      const includesBalance = /balance|account balance|current balance|how much|available funds/.test(
        normalizedQuery
      );
      const includesHistory = /history|transaction|transactions|recent|last|statement/.test(
        normalizedQuery
      );

      const formattedTransactions = transactions.map((transaction) => ({
        id: transaction.id,
        description: transaction.description,
        amount: transaction.amount.toString(),
        type: transaction.type,
        status: transaction.status,
        createdAt: transaction.createdAt.toISOString(),
        role:
          transaction.senderId === userId
            ? "sent"
            : transaction.receiverId === userId
            ? "received"
            : "other",
        counterpartyId:
          transaction.senderId === userId
            ? transaction.receiverId
            : transaction.receiverId === userId
            ? transaction.senderId
            : null,
      }));

      const response: Record<string, unknown> = {
        balance: balance.accountBalance.toString(),
        currency: balance.currency,
        updatedAt: balance.updatedAt.toISOString(),
      };

      if (includesBalance || !includesHistory) {
        response.summary = `Your current account balance is ${balance.accountBalance} ${balance.currency}.`;
      }

      if (includesHistory) {
        response.transactions = formattedTransactions;
      }

      if (!includesBalance && !includesHistory) {
        response.summary =
          "Here is your current balance and recent transaction history. Please ask for more specific details if needed.";
        response.transactions = formattedTransactions;
      }

      return response;
    },
  });
