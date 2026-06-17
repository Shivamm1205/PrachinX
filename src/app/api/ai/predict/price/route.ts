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

    const cgRes = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
    );
    const cgJson = await cgRes.json();
    const current = cgJson[id]?.usd ?? null;

    if (current == null) {
      return NextResponse.json({ success: false, error: "price not available" }, { status: 502 });
    }

    // Simple mock prediction: +/- up to 3%
    const delta = (Math.random() * 0.06) - 0.03;
    const predicted = +(current * (1 + delta)).toFixed(2);

    return NextResponse.json({
      success: true,
      data: {
        symbol,
        currentPrice: current,
        predictedPrice: predicted,
        confidence: +(0.5 + Math.abs(delta)).toFixed(2),
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: "AI Engine not connected" }, { status: 502 });
  }
}
