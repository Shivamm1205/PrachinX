import { NextResponse } from "next/server";

const SYMBOL_MAP: Record<string, string> = {
  BTCUSDT: "bitcoin",
  ETHUSDT: "ethereum",
  BNBUSDT: "binancecoin",
  SOLUSDT: "solana",
  ADAUSDT: "cardano",
};

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const symbol = (url.searchParams.get("symbol") || "BTCUSDT").toUpperCase();
    const id = SYMBOL_MAP[symbol] || "bitcoin";

    // Basic heuristic: fetch recent price and produce a mock sentiment
    const cgRes = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
    );
    const cgJson = await cgRes.json();
    const current = cgJson[id]?.usd ?? null;

    if (current == null) {
      return NextResponse.json({ success: false, error: "sentiment not available" }, { status: 502 });
    }

    // Mock sentiment score between -1 and 1
    const score = +(Math.random() * 2 - 1).toFixed(2);
    const label = score > 0.2 ? "positive" : score < -0.2 ? "negative" : "neutral";

    return NextResponse.json({
      success: true,
      data: {
        symbol,
        sentiment: { score, label },
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: "AI Engine not connected" }, { status: 502 });
  }
}
