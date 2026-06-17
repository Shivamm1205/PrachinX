import { NextResponse } from "next/server";
import { addTrade } from "../data";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { symbol, type, quantity, price } = body;

    if (!symbol || !type || !quantity || !price) {
      return NextResponse.json(
        { success: false, message: "Missing trade details" },
        { status: 400 }
      );
    }

    const trade = {
      id: Math.floor(Math.random() * 1000000),
      symbol,
      type,
      quantity,
      price,
      totalValue: Number((quantity * price).toFixed(2)),
      status: "EXECUTED",
      notes: "Executed via mock API",
      createdAt: new Date().toISOString(),
      executedAt: new Date().toISOString(),
    };

    addTrade(trade);

    return NextResponse.json({
      success: true,
      message: "Trade executed successfully",
      data: trade,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Trade execution failed" },
      { status: 500 }
    );
  }
}
