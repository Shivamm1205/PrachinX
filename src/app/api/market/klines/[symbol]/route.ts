import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const symbol = (url.pathname.split("/").pop() || "BTCUSDT").toUpperCase();
  const interval = url.searchParams.get("interval") || "1h";
  const now = Date.now();

  const klines = Array.from({ length: 10 }, (_, index) => {
    const timestamp = now - (9 - index) * 1000 * 60 * 60;
    const open = 27000 + index * 20;
    const close = open + Math.random() * 50 - 25;
    const high = Math.max(open, close) + 10;
    const low = Math.min(open, close) - 10;
    const volume = 100 + Math.random() * 200;
    return [timestamp, open, high, low, close, volume];
  });

  return NextResponse.json({
    success: true,
    message: "Klines loaded",
    data: {
      symbol,
      interval,
      klines,
    },
    timestamp: new Date().toISOString(),
  });
}
