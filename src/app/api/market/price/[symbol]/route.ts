import { NextResponse } from "next/server";

const PRICE_MAP: Record<string, string> = {
  BTCUSDT: "27750.00",
  ETHUSDT: "1698.00",
  BNBUSDT: "389.00",
  SOLUSDT: "137.20",
  ADAUSDT: "0.45",
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const symbol = (url.pathname.split("/").pop() || "BTCUSDT").toUpperCase();
  const price = PRICE_MAP[symbol] ?? "1.00";

  return NextResponse.json({
    success: true,
    message: "Market price loaded",
    data: { symbol, price },
    timestamp: new Date().toISOString(),
  });
}
