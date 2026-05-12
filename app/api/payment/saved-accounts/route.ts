import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ChatbotError } from "@/lib/errors";
import { getSavedAccounts, saveAccount, deleteSavedAccount } from "@/lib/db/queries";

const saveAccountSchema = z.object({
  savedAccountId: z.string().min(1, "Saved account ID is required"),
  shortName: z.string().min(1, "Short name is required").max(100, "Short name must be 100 characters or less"),
});

const deleteAccountSchema = z.object({
  savedAccountId: z.string().min(1, "Saved account ID is required"),
});

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      throw new ChatbotError("unauthorized", "User not authenticated");
    }

    const savedAccounts = await getSavedAccounts({ userId });

    return NextResponse.json({
      success: true,
      savedAccounts,
    });

  } catch (error) {
    console.error("Get saved accounts error:", error);
    
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

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      throw new ChatbotError("unauthorized", "User not authenticated");
    }

    const body = await request.json();
    const { savedAccountId, shortName } = saveAccountSchema.parse(body);

    await saveAccount({
      userId,
      savedAccountId,
      shortName,
    });

    return NextResponse.json({
      success: true,
      message: "Account saved successfully",
    });

  } catch (error) {
    console.error("Save account error:", error);
    
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

export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      throw new ChatbotError("unauthorized", "User not authenticated");
    }

    const { searchParams } = new URL(request.url);
    const { savedAccountId } = deleteAccountSchema.parse({
      savedAccountId: searchParams.get("savedAccountId"),
    });

    await deleteSavedAccount({
      userId,
      savedAccountId,
    });

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });

  } catch (error) {
    console.error("Delete saved account error:", error);
    
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
