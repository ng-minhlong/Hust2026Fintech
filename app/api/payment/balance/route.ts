import { NextRequest, NextResponse } from "next/server";
import { ChatbotError } from "@/lib/errors";
import { getUserBalance, createUserBalance } from "@/lib/db/queries";

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      throw new ChatbotError("unauthorized", "User not authenticated");
    }

    let balance = await getUserBalance({ userId });
    
    if (!balance) {
      await createUserBalance({ userId });
      balance = await getUserBalance({ userId });
    }

    if (!balance) {
      throw new ChatbotError("internal_error", "Failed to retrieve balance");
    }

    return NextResponse.json({
      success: true,
      balance: balance.accountBalance.toString(),
      currency: balance.currency,
      updatedAt: balance.updatedAt,
    });

  } catch (error) {
    console.error("Balance retrieval error:", error);
    
    if (error instanceof ChatbotError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.status }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
