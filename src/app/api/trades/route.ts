import { NextResponse } from "next/server";
import { tradeHistory } from "./data";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Trades loaded",
    data: tradeHistory,
    timestamp: new Date().toISOString(),
  });
}
