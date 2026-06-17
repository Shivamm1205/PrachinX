import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Portfolio loaded",
    data: {
      id: 1,
      totalBalance: 12450.12,
      availableBalance: 4850.3,
      investedAmount: 7600.82,
      totalProfitLoss: 1120.45,
      profitLossPercentage: 9.9,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    timestamp: new Date().toISOString(),
  });
}
