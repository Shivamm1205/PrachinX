import { NextResponse } from "next/server";
import { getTrade, cancelTrade } from "../../data";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = Number(url.pathname.split("/").pop());
  const trade = getTrade(id);

  if (!trade) {
    return NextResponse.json(
      { success: false, message: "Trade not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Trade retrieved",
    data: trade,
    timestamp: new Date().toISOString(),
  });
}

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = Number(url.pathname.split("/").pop());
  const trade = cancelTrade(id);

  if (!trade) {
    return NextResponse.json(
      { success: false, message: "Trade not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Trade cancelled",
    data: trade,
    timestamp: new Date().toISOString(),
  });
}
