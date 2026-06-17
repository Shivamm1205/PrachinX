import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const symbol = (url.pathname.split("/").pop() || "BTCUSDT").toUpperCase();

  return NextResponse.json({
    success: true,
    message: "Market stats loaded",
    data: {
      symbol,
      priceChange: "12.50",
      priceChangePercent: "0.92",
      highPrice: "27550.00",
      lowPrice: "26800.00",
      volume: "41200.38",
      lastPrice: "27480.00",
    },
    timestamp: new Date().toISOString(),
  });
}
