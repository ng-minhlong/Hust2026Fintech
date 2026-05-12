import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ChatbotError } from "@/lib/errors";
import {
  getUserBalance,
  createUserBalance,
  updateUserBalance,
  createTransaction,
  updateTransactionStatus,
} from "@/lib/db/queries";
import { generateUUID } from "@/lib/utils";

const transferSchema = z.object({
  receiverId: z.string().min(1, "Receiver ID is required"),
  amount: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, "Amount must be a positive number"),
  description: z.string().optional(),
  type: z.enum(["manual", "ai_assistant"]).default("manual"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { receiverId, amount, description, type } = transferSchema.parse(body);

    // Get sender ID from session or auth token (for now, we'll assume it's in the headers)
    const senderId = request.headers.get("x-user-id");
    if (!senderId) {
      throw new ChatbotError("unauthorized", "User not authenticated");
    }

    if (senderId === receiverId) {
      throw new ChatbotError("bad_request", "Cannot transfer to yourself");
    }

    const transferAmount = parseFloat(amount);
    
    // Get sender's balance
    let senderBalance = await getUserBalance({ userId: senderId });
    if (!senderBalance) {
      await createUserBalance({ userId: senderId });
      senderBalance = await getUserBalance({ userId: senderId });
    }

    if (!senderBalance) {
      throw new ChatbotError("internal_error", "Failed to create sender balance");
    }

    const currentBalance = parseFloat(senderBalance.accountBalance.toString());
    
    if (currentBalance < transferAmount) {
      throw new ChatbotError("bad_request", "Insufficient balance");
    }

    // Get receiver's balance
    let receiverBalance = await getUserBalance({ userId: receiverId });
    if (!receiverBalance) {
      await createUserBalance({ userId: receiverId });
      receiverBalance = await getUserBalance({ userId: receiverId });
    }

    if (!receiverBalance) {
      throw new ChatbotError("internal_error", "Failed to create receiver balance");
    }

    // Create transaction record
    const transactionId = generateUUID();
    await createTransaction({
      senderId,
      receiverId,
      amount,
      description,
      type,
      status: "pending",
    });

    // Update balances
    const newSenderBalance = (currentBalance - transferAmount).toFixed(2);
    const newReceiverBalance = (parseFloat(receiverBalance.accountBalance.toString()) + transferAmount).toFixed(2);

    await updateUserBalance({ userId: senderId, newBalance: newSenderBalance });
    await updateUserBalance({ userId: receiverId, newBalance: newReceiverBalance });

    // Update transaction status to success
    await updateTransactionStatus({
      transactionId,
      status: "success",
    });

    return NextResponse.json({
      success: true,
      transactionId,
      amount,
      newSenderBalance,
      message: "Transfer completed successfully",
    });

  } catch (error) {
    console.error("Transfer error:", error);
    
    if (error instanceof ChatbotError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.status }
      );
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
