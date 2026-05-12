import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ChatbotError } from "@/lib/errors";
import { getTransactionHistory } from "@/lib/db/queries";

const historySchema = z.object({
  limit: z.string().optional().transform((val) => val ? parseInt(val) : 50),
});

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      throw new ChatbotError("unauthorized", "User not authenticated");
    }

    const { searchParams } = new URL(request.url);
    const { limit } = historySchema.parse({
      limit: searchParams.get("limit"),
    });

    const transactions = await getTransactionHistory({ userId, limit });

    return NextResponse.json({
      success: true,
      transactions,
    });

  } catch (error) {
    console.error("Transaction history error:", error);
    
    if (error instanceof ChatbotError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.status }
      );
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request parameters", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
